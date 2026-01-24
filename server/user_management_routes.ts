// ================================
// USER MANAGEMENT ROUTES
// ================================
import { Express, Request, Response } from "express";
import { db } from "./db";
import { users, roles, permissions, rolePermissions, userRoles } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export function addUserManagementRoutes(app: Express, storage: any) {
    // Get all users
    app.get("/api/v1/users", async (req: Request, res: Response) => {
        try {
            const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
            const userList = await db
                .select({
                    userId: users.userId,
                    fullName: users.fullName,
                    email: users.email,
                    phone: users.phone,
                    nationalId: users.nationalId,
                    status: users.status,
                    mfaEnabled: users.mfaEnabled,
                    lastLogin: users.lastLoginAt,
                    createdAt: users.createdAt,
                    role: roles.name,
                    roleScope: roles.scope
                })
                .from(users)
                .leftJoin(userRoles, eq(users.userId, userRoles.userId))
                .leftJoin(roles, eq(userRoles.roleId, roles.roleId))
                .where(eq(users.councilId, councilId));

            res.json(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Failed to fetch users" });
        }
    });

    // Get all roles
    app.get("/api/v1/roles", async (req: Request, res: Response) => {
        try {
            const councilId = req.headers["x-council-id"] as string || req.query.councilId as string;
            const rolesList = await db
                .select({
                    roleId: roles.roleId,
                    name: roles.name,
                    scope: roles.scope
                })
                .from(roles)
                .where(eq(roles.councilId, councilId));

            // Get permission count for each role
            const rolesWithPermissions = await Promise.all(rolesList.map(async (role) => {
                const permCount = await db
                    .select()
                    .from(rolePermissions)
                    .where(eq(rolePermissions.roleId, role.roleId));

                return {
                    ...role,
                    permissionCount: permCount.length
                };
            }));

            res.json(rolesWithPermissions);
        } catch (error) {
            console.error("Error fetching roles:", error);
            res.status(500).json({ error: "Failed to fetch roles" });
        }
    });

    // Create new role
    app.post("/api/v1/roles", async (req: Request, res: Response) => {
        try {
            const { name, scope } = req.body;
            const councilId = req.headers["x-council-id"] as string;

            const [newRole] = await db.insert(roles).values({
                councilId,
                name,
                scope: scope || "council"
            }).returning();

            res.json(newRole);
        } catch (error) {
            console.error("Error creating role:", error);
            res.status(500).json({ error: "Failed to create role" });
        }
    });

    // Update role
    app.patch("/api/v1/roles/:id", async (req: Request, res: Response) => {
        try {
            const roleId = req.params.id;
            const { name, scope } = req.body;

            const [updatedRole] = await db
                .update(roles)
                .set({ name, scope })
                .where(eq(roles.roleId, roleId))
                .returning();

            res.json(updatedRole);
        } catch (error) {
            console.error("Error updating role:", error);
            res.status(500).json({ error: "Failed to update role" });
        }
    });

    // Delete role
    app.delete("/api/v1/roles/:id", async (req: Request, res: Response) => {
        try {
            const roleId = req.params.id;

            // Delete role permissions first
            await db.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));

            // Delete user role assignments
            await db.delete(userRoles).where(eq(userRoles.roleId, roleId));

            // Delete role
            await db.delete(roles).where(eq(roles.roleId, roleId));

            res.json({ success: true });
        } catch (error) {
            console.error("Error deleting role:", error);
            res.status(500).json({ error: "Failed to delete role" });
        }
    });

    // Get all permissions
    app.get("/api/v1/permissions", async (req: Request, res: Response) => {
        try {
            const permissionsList = await db
                .select()
                .from(permissions);

            res.json(permissionsList);
        } catch (error) {
            console.error("Error fetching permissions:", error);
            res.status(500).json({ error: "Failed to fetch permissions" });
        }
    });

    // Get permissions for a specific role
    app.get("/api/v1/roles/:id/permissions", async (req: Request, res: Response) => {
        try {
            const roleId = req.params.id;
            const rolePerms = await db
                .select({
                    permissionCode: permissions.permissionCode,
                    description: permissions.description
                })
                .from(rolePermissions)
                .innerJoin(permissions, eq(rolePermissions.permissionCode, permissions.permissionCode))
                .where(eq(rolePermissions.roleId, roleId));

            res.json(rolePerms);
        } catch (error) {
            console.error("Error fetching role permissions:", error);
            res.status(500).json({ error: "Failed to fetch role permissions" });
        }
    });

    // Create new user
    app.post("/api/v1/users", async (req: Request, res: Response) => {
        try {
            const { fullName, email, phone, roleId, nationalId, password } = req.body;
            const councilId = req.headers["x-council-id"] as string;

            // Use provided password or generate a random one
            const finalPassword = password || Math.random().toString(36).slice(-8);
            const passwordHash = await bcrypt.hash(finalPassword, 10);

            const [newUser] = await db.insert(users).values({
                councilId,
                fullName,
                email,
                phone,
                nationalId,
                passwordHash,
                status: "active",
                mfaEnabled: false
            }).returning();

            // Assign role if provided
            if (roleId) {
                await db.insert(userRoles).values({
                    userId: newUser.userId,
                    roleId
                });
            }

            // TODO: Send email with temporary password

            // TODO: Send email with password
            res.json({ ...newUser, password: password ? "******" : finalPassword });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Failed to create user" });
        }
    });

    // Update user status
    app.patch("/api/v1/users/:id/status", async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const { status } = req.body;

            await db
                .update(users)
                .set({ status })
                .where(eq(users.userId, userId));

            res.json({ success: true });
        } catch (error) {
            console.error("Error updating user status:", error);
            res.status(500).json({ error: "Failed to update user status" });
        }
    });

    // Update user details (General Update)
    app.patch("/api/v1/users/:id", async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const { fullName, email, phone, roleId, nationalId } = req.body;

            // Update user core details
            await db
                .update(users)
                .set({ fullName, email, phone, nationalId })
                .where(eq(users.userId, userId));

            // Update role if provided
            if (roleId) {
                // Remove existing role mappings
                await db.delete(userRoles).where(eq(userRoles.userId, userId));

                // Insert new mapping
                await db.insert(userRoles).values({
                    userId,
                    roleId
                });
            }

            res.json({ success: true });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Failed to update user" });
        }
    });

    // Reset user password
    app.post("/api/v1/users/:id/password", async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({ error: "Password is required" });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            await db.update(users).set({ passwordHash }).where(eq(users.userId, userId));

            res.json({ success: true });
        } catch (error) {
            console.error("Error resetting password:", error);
            res.status(500).json({ error: "Failed to reset password" });
        }
    });

    // Delete user
    app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;

            // Delete user roles first
            await db
                .delete(userRoles)
                .where(eq(userRoles.userId, userId));

            // Delete user
            await db
                .delete(users)
                .where(eq(users.userId, userId));

            res.json({ success: true });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Failed to delete user" });
        }
    });

    // Update permissions for a role
    app.post("/api/v1/roles/:id/permissions", async (req: Request, res: Response) => {
        try {
            const roleId = req.params.id;
            const { permissions: newPermissions } = req.body;

            // Delete existing
            await db.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));

            // Insert new
            if (newPermissions && newPermissions.length > 0) {
                const values = newPermissions.map((code: string) => ({
                    roleId,
                    permissionCode: code
                }));
                await db.insert(rolePermissions).values(values);
            }

            res.json({ success: true });
        } catch (error) {
            console.error("Error updating role permissions:", error);
            res.status(500).json({ error: "Failed to update role permissions" });
        }
    });
}
