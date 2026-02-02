import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized", message: "You must be logged in to access this resource." });
}

export function requireRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: "Unauthorized", message: "You must be logged in." });
        }

        const user = req.user as any;
        if (!allowedRoles.includes(user.role)) {
            console.warn(`[RBAC] Access Denied: User ${user.email} (Role: ${user.role}) tried to access protected route requiring [${allowedRoles.join(", ")}]`);
            return res.status(403).json({ error: "Forbidden", message: "You do not have permission to perform this action." });
        }

        next();
    };
}
