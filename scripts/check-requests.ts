import { db } from '../server/db.js';
import { serviceRequests } from '../shared/schema.js';

async function checkRequests() {
    try {
        console.log('Checking service requests in database...\n');

        const requests = await db.select().from(serviceRequests);

        console.log(`Found ${requests.length} service request(s):\n`);

        if (requests.length === 0) {
            console.log('❌ No service requests found in database!');
            console.log('\nThis means you need to submit an application first.');
            console.log('Go to: http://localhost:5173/licensing');
            console.log('And complete the application form to create test data.');
        } else {
            requests.forEach((req, idx) => {
                console.log(`${idx + 1}. ID: ${req.requestId.substring(0, 8)}...`);
                console.log(`   Ref: ${req.requestRef || 'N/A'}`);
                console.log(`   Status: ${req.status}`);
                console.log(`   Council: ${req.councilId}`);
                console.log(`   Submitted: ${req.submittedAt || 'Not submitted'}`);
                console.log('');
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkRequests();
