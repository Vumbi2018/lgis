import { Express, Request, Response } from "express";
import { db } from "./db";
import { fieldPolicies, insertFieldPolicySchema } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export function registerFieldPolicyRoutes(app: Express) {

    // Get all field policies for a council
    app.get("/api/v1/field-policies", async (req: Request, res: Response) => {
        try {
            const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
            if (!councilId) {
                return res.status(400).json({ error: "Council ID is required" });
            }

            const policies = await db
                .select()
                .from(fieldPolicies)
                .where(eq(fieldPolicies.councilId, councilId));

            res.json(policies);
        } catch (error) {
            console.error("Error fetching field policies:", error);
            res.status(500).json({ error: "Failed to fetch field policies" });
        }
    });

    // Create or Update a field policy (Upsert)
    app.post("/api/v1/field-policies", async (req: Request, res: Response) => {
        try {
            const councilId = req.headers["x-council-id"] as string;
            if (!councilId) {
                return res.status(400).json({ error: "Council ID is required" });
            }

            // We expect a single policy object or an array. Let's handle single for simplicity first, or bulk.
            // The frontend sends one policy update at a time in the "Save" action usually, or we can support bulk.
            // Let's support a single update for now as per the component design which might save one by one or bulk.
            // Actually, the plan implied bulk or single. Let's handle single upsert based on entity+field.

            const body = req.body;
            // Validate with schema (partial validation since we might be updating)
            // But for upsert we need entity and field which are required.

            const { entity, field, ...accessLevels } = body;

            if (!entity || !field) {
                return res.status(400).json({ error: "Entity and Field are required" });
            }

            // Check if exists
            const existing = await db
                .select()
                .from(fieldPolicies)
                .where(
                    and(
                        eq(fieldPolicies.councilId, councilId),
                        eq(fieldPolicies.entity, entity),
                        eq(fieldPolicies.field, field)
                    )
                )
                .limit(1);

            if (existing.length > 0) {
                // Update
                const [updated] = await db
                    .update(fieldPolicies)
                    .set({
                        ...accessLevels,
                        updatedAt: new Date()
                    })
                    .where(eq(fieldPolicies.policyId, existing[0].policyId))
                    .returning();

                return res.json(updated);
            } else {
                // Insert
                const [created] = await db
                    .insert(fieldPolicies)
                    .values({
                        councilId,
                        entity,
                        field,
                        ...accessLevels
                    })
                    .returning();

                return res.json(created);
            }

        } catch (error) {
            console.error("Error updating field policy:", error);
            res.status(500).json({ error: "Failed to update field policy" });
        }
    });
}
