
// This is a simulation of a payment gateway integration
// In a real application, this would interface with BSP, Kina Bank, or Mobile Carriers

interface PaymentResult {
    success: boolean;
    transactionId?: string;
    message?: string;
    details?: any;
}

export const PaymentGateway = {
    async verifyCreditCard(amount: number, cardDetails: { number: string; expiry: string; cvc: string; name: string }): Promise<PaymentResult> {
        // SIMULATION: 
        // - Fail if amount > 10000 (arbitrary limit)
        // - Fail if card number ends in 0000

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        if (amount > 100000) {
            return { success: false, message: "Amount exceeds transaction limit." };
        }

        if (cardDetails.number.endsWith("0000")) {
            return { success: false, message: "Card declined by issuer." };
        }

        // Success
        return {
            success: true,
            transactionId: `TXN-CC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            message: "Payment authorized successfully.",
            details: {
                last4: cardDetails.number.slice(-4),
                authCode: Math.floor(100000 + Math.random() * 900000).toString()
            }
        };
    },

    async verifyMobileMoney(amount: number, mobileDetails: { provider: string; phoneNumber: string; otp?: string }): Promise<PaymentResult> {
        // SIMULATION:
        // - Fail if phone number is not 8 digits (PNG standard approx)

        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate USSD delay

        // Basic format check
        const cleanPhone = mobileDetails.phoneNumber.replace(/\D/g, '');
        if (cleanPhone.length < 7) {
            return { success: false, message: "Invalid mobile number." };
        }

        if (mobileDetails.provider === 'DIGICEL' || mobileDetails.provider === 'VODAFONE') {
            return {
                success: true,
                transactionId: `TXN-MM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                message: "Mobile money transaction successful.",
                details: {
                    provider: mobileDetails.provider,
                    phone: mobileDetails.phoneNumber
                }
            };
        }

        return { success: false, message: "Unsupported provider." };
    }
};
