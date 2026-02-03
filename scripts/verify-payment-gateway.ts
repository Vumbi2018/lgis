
const BASE_URL = "http://localhost:5000/api/v1/payments/online";

async function verifyPaymentGateway() {
    console.log("Starting Payment Gateway Verification...");

    const post = async (data: any) => {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            return { status: res.status, data: json };
        } catch (e) {
            console.error("Fetch error:", e);
            throw e;
        }
    };

    // Test 1: Successful Credit Card
    try {
        console.log("\nTest 1: Credit Card (Success Case)");
        const res = await post({
            amount: "150.00",
            method: "credit_card",
            paymentDetails: {
                number: "4111222233334444", // Valid Visa
                expiry: "12/28",
                cvc: "123",
                name: "John Doe"
            },
            accountId: "TEST-ACCOUNT-001"
        });
        if (res.status === 201 && res.data.paymentRef) {
            console.log("✅ Success! Ref:", res.data.paymentRef);
        } else {
            console.error("❌ Failed:", res.data);
        }
    } catch (err) {
        // Ignored
    }

    // Test 2: Successful Mobile Money
    try {
        console.log("\nTest 2: Mobile Money (Success Case)");
        const res = await post({
            amount: "50.00",
            method: "mobile_money",
            paymentDetails: {
                provider: "DIGICEL",
                phoneNumber: "70123456"
            },
            accountId: "TEST-ACCOUNT-001"
        });
        if (res.status === 201 && res.data.paymentRef) {
            console.log("✅ Success! Ref:", res.data.paymentRef);
        } else {
            console.error("❌ Failed:", res.data);
        }
    } catch (err) {
        // Ignored
    }

    // Test 3: Failed Payment (Invalid Card ending in 0000)
    try {
        console.log("\nTest 3: Credit Card (Failure Case)");
        const res = await post({
            amount: "100.00",
            method: "credit_card",
            paymentDetails: {
                number: "4111222233330000", // Failed card
                expiry: "12/28",
                cvc: "123",
                name: "John Doe"
            },
            accountId: "TEST-ACCOUNT-001"
        });
        if (res.status === 400) {
            console.log("✅ Correctly rejected:", res.data.error);
        } else {
            console.error("❌ Unexpected success:", res.data);
        }
    } catch (err) {
        // Ignored
    }
}

verifyPaymentGateway();
