
import { execSync } from "child_process";
import fs from "fs";

console.log("🔍 Verifying build process for deployment...");

try {
    // 1. Check TypeScript
    console.log("Checking Type Safety...");
    execSync("npm run check", { stdio: "inherit" });

    // 2. Build Client
    console.log("Building Frontend (Vite)...");
    execSync("npm run build", { stdio: "inherit" });

    // 3. Verify Output
    if (fs.existsSync("dist/public/index.html")) {
        console.log("✅ Build successful! 'dist/' directory is ready.");
    } else {
        console.error("❌ Build failed: dist/public/index.html not found.");
        process.exit(1);
    }

} catch (error) {
    console.error("❌ Build verification failed:", error);
    process.exit(1);
}
