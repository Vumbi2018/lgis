
import * as fs from 'fs';
import * as path from 'path';

const FILES_TO_DELETE = [
    // Logs
    'check.log', 'check3.log', 'error.log', 'db_push_out.log',
    'server_5001.log', 'server_debug.log', 'server_debug_2.log',
    'server_final.log', 'server_fixed.log', 'server_local.log',
    'start_error.log', 'tsc_error.log',

    // Text Dumps
    'business_analysis.txt', 'business_owner_analysis.txt',
    'check_output.txt', 'columns.txt', 'compile_errors.txt',
    'council_usage_analysis.txt', 'councils.txt',
    'db_check_output.txt', 'db_check_output_utf8.txt',
    'db_report.txt', 'db_status.txt', 'db_status_v2.txt', 'db_status_v3.txt',
    'debug_log.txt', 'debug_output.txt', 'debug_output_full.txt',
    'debug_requests_log.txt', 'debug_requests_out.txt',
    'findings.txt', 'response.txt', 'status_check.txt', 'status_check_final.txt',
    'tables.txt', 'tsc_output.txt', 'tsc_output_utf8.txt', 'tsc_verify.txt',

    // JSON Dumps
    'businesses_cols.json', 'citizens_cols.json', 'components.json',
    'license_types_list.json', 'request_formdata.json',
    'requests.log', 'requests_dump.json', 'requests_list.json',
    'services_dump.json', 'temp_request.json', 'users_dump.json',

    // Config/Misc
    'add_role.sql',

    // Temporary Scripts (Root)
    'add_role_column.ts', 'check_accounts.ts', 'check_admin.ts',
    'check_business_debug.ts', 'check_council_usage_debug.ts',
    'check_db_payments.ts', 'check_db_payments_clean.ts',
    'check_licence_cols.ts', 'check_license.ts',
    'check_request_counts_debug.ts', 'check_request_data.ts',
    'check_requests.ts', 'check_services_debug.ts', 'check_users_debug.ts',
    'cleanup_bad_licences.ts', 'create_payments.ts', 'create_test_payment.ts',
    'debug_all_hashes.ts', 'debug_dashboard.ts', 'debug_data_mismatch.ts',
    'debug_finance_data.ts', 'debug_gis_data.ts', 'debug_gis_verify.ts',
    'debug_hash.ts', 'debug_requests_data.ts', 'drop_payments.ts',
    'fix_council.ts', 'fix_councils_services.ts',
    'list_councils_debug.ts', 'list_licences.ts', 'list_requests_debug.ts',
    'list_requests_details_debug.ts', 'list_types.ts',
    'manual_create_procurement.ts', 'manual_migrate_licences.ts',
    'migrate_legacy_councils.ts', 'migrate_legacy_councils_v2.ts',
    'reproduce_payment.ts', 'reproduce_payment_bad.ts',
    'reset_admin.ts', 'restore_councils.ts', 'test_db_conn.ts',
    'test_insert.ts', 'test_post.ts', 'test_signature_service.ts',
    'verify_payments.ts'
];

const SCRIPTS_TO_DELETE = [
    'add_timestamps.ts', 'backfill_timestamps.ts',
    'check-columns.ts', 'check-db.ts', 'check-prop-columns.ts',
    'check-requests.ts', 'check-users.ts', 'check_cols.ts',
    'check_db_status.ts', 'check_db_status_targeted.ts', 'check_db_v4.ts',
    'check_table.ts', 'db_init_remote.ts', 'db_report.ts',
    'debug-fetch.ts', 'debug_businesses.ts', 'debug_requirements.ts',
    'debug_service.ts', 'dump_ref_formdata.ts', 'dump_request_formdata.ts',
    'dump_requests.ts', 'dump_services.ts',
    'fix-admin-user.ts', 'fix-schema.ts', 'fix_admin_hash.ts',
    'fix_correct_request.ts', 'fix_everything.ts',
    'fix_request_license_type.ts', 'force_seed_general_business.ts',
    'list_license_types.ts', 'lookup_service_name.ts',
    'repair_request_service.ts', 'reseed_requirements.ts',
    'reset_fees_db.ts', 'sync_fees_db.ts',
    'test-endpoints.ts', 'test_api.ts', 'test_insert.ts',
    'test_inspection_creation.ts', 'test_users_api.ts',
    'trace_request_requirements.ts', 'verify-build.ts',
    'verify_seeding.ts', 'verify_timestamps.ts'
];

function cleanup() {
    console.log("Starting cleanup...");
    let deletedCount = 0;

    // Delete Root Files
    FILES_TO_DELETE.forEach(file => {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${file}`);
            deletedCount++;
        }
    });

    // Delete Scripts
    SCRIPTS_TO_DELETE.forEach(file => {
        const filePath = path.join(process.cwd(), 'scripts', file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: scripts/${file}`);
            deletedCount++;
        }
    });

    console.log(`Cleanup complete. Deleted ${deletedCount} files.`);
}

cleanup();
