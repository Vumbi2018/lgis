
import { seedDefaultTenantConfig } from "./seed_tenant_config";

console.log("Starting seed runner...");
seedDefaultTenantConfig()
    .then(() => {
        console.log("Done");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Failed", err);
        process.exit(1);
    });
