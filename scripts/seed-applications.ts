import { db } from '../server/db.js';
import { serviceRequests, services } from '../shared/schema.js';

async function seedApplications() {
    try {
        console.log('Seeding sample applications...\n');

        // Check if we already have applications
        const existing = await db.select().from(serviceRequests);
        if (existing.length > 0) {
            console.log(`✅ Found ${existing.length} existing application(s). Database already has data.`);
            process.exit(0);
        }

        // Get a service to link to
        const allServices = await db.select().from(services).limit(1);
        if (allServices.length === 0) {
            console.log('❌ No services found. Please run seed-database script first.');
            process.exit(1);
        }

        const service = allServices[0];

        // Create sample applications
        const sampleApps = [
            {
                councilId: 'ncdc-001',
                serviceId: service.serviceId,
                requesterType: 'business',
                requesterId: 'BUS-001',
                status: 'submitted',
                channel: 'web',
                formData: {
                    businessName: 'Papindo Trading Ltd',
                    licenseType: 'Trading License',
                    premisesAddress: {
                        section: '12',
                        lot: '45',
                        suburb: 'Waigani',
                        district: 'NCD',
                        province: 'National Capital'
                    },
                    contactPhone: '+675 123 4567',
                    contactEmail: 'info@papindo.pg'
                },
                requestRef: `LIC-2024-${String(Math.floor(1000 + Math.random() * 9000))}`,
                submittedAt: new Date()
            },
            {
                councilId: 'ncdc-001',
                serviceId: service.serviceId,
                requesterType: 'business',
                requesterId: 'BUS-002',
                status: 'processing',
                channel: 'web',
                formData: {
                    businessName: 'City Pharmacy Waigani',
                    licenseType: 'Health License',
                    premisesAddress: {
                        section: '8',
                        lot: '123',
                        suburb: 'Waigani',
                        district: 'NCD',
                        province: 'National Capital'
                    },
                    contactPhone: '+675 234 5678',
                    contactEmail: 'waigani@citypharmacy.pg'
                },
                requestRef: `LIC-2024-${String(Math.floor(1000 + Math.random() * 9000))}`,
                submittedAt: new Date(Date.now() - 86400000) // 1 day ago
            },
            {
                councilId: 'ncdc-001',
                serviceId: service.serviceId,
                requesterType: 'business',
                requesterId: 'BUS-003',
                status: 'approved',
                channel: 'web',
                formData: {
                    businessName: 'Big Rooster Boroko',
                    licenseType: 'Food Service License',
                    premisesAddress: {
                        section: '15',
                        lot: '78',
                        suburb: 'Boroko',
                        district: 'NCD',
                        province: 'National Capital'
                    },
                    contactPhone: '+675 345 6789',
                    contactEmail: 'boroko@bigrooster.pg'
                },
                requestRef: `LIC-2024-${String(Math.floor(1000 + Math.random() * 9000))}`,
                submittedAt: new Date(Date.now() - 172800000) // 2 days ago
            }
        ];

        for (const app of sampleApps) {
            await db.insert(serviceRequests).values(app);
            console.log(`✅ Created: ${app.formData.businessName} - ${app.requestRef} (${app.status})`);
        }

        console.log(`\n✨ Successfully seeded ${sampleApps.length} applications!`);
        console.log('Go to http://localhost:5173/licensing/manage to view them.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding applications:', error);
        process.exit(1);
    }
}

seedApplications();
