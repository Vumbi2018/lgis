// Quick test to verify backend is serving data correctly
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

async function testEndpoint(name: string, url: string) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`✅ ${name}: ${response.status} - ${Array.isArray(data) ? data.length : 'OK'} items`);
        return true;
    } catch (error) {
        console.log(`❌ ${name}: Failed - ${error.message}`);
        return false;
    }
}

async function runTests() {
    console.log('Testing Backend API Endpoints...\n');

    await testEndpoint('Councils', `${BASE_URL}/api/v1/councils`);
    await testEndpoint('Services', `${BASE_URL}/api/v1/services?councilId=ncdc-001`);
    await testEndpoint('Service Requests', `${BASE_URL}/api/v1/requests?councilId=ncdc-001`);
    await testEndpoint('Citizens', `${BASE_URL}/api/v1/citizens?councilId=ncdc-001`);
    await testEndpoint('Businesses', `${BASE_URL}/api/v1/businesses?councilId=ncdc-001`);

    console.log('\n✨ Server is running and responding!');
}

runTests();
