import { createHash, createSign, createVerify } from 'crypto';
import stringify from 'json-stable-stringify';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

export interface LicencePayload {
    licenceNo: string;
    councilId: string;
    requestId: string;
    issueDate: string;
    expiryDate: string;
    tradingName: string;
    applicantName: string;
    premisesAddress: string;
    serviceName: string;
}

export class DigitalSignatureService {
    /**
     * Generates a deterministic JSON string and its SHA-256 hash.
     */
    static canonicalizeLicence(payload: LicencePayload): { json: string; hash: string } {
        const json = stringify(payload) || "";
        const hash = createHash('sha256').update(json).digest('hex');
        return { json, hash };
    }

    /**
     * Signs a buffer using a private key.
     * For prototype, we'll assume the private key is in PEM format.
     */
    static signData(data: Buffer | string, privateKeyPem: string): string {
        const sign = createSign('SHA256');
        sign.update(data);
        sign.end();
        return sign.sign(privateKeyPem, 'hex');
    }

    /**
     * Verifies a signature against a public key.
     */
    static verifyData(data: Buffer | string, signature: string, publicKeyPem: string): boolean {
        const verify = createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(publicKeyPem, signature, 'hex');
    }

    /**
     * Calculate SHA-256 hash of a file buffer.
     */
    static calculateFileHash(buffer: Buffer): string {
        return createHash('sha256').update(buffer).digest('hex');
    }

    /**
     * Gets the council's private key, generating it if it doesn't exist.
     * In a production environment, this would come from an HSM or Key Vault.
     */
    static async getCouncilKey(councilId: string): Promise<{ privateKey: string, publicKey: string }> {
        const keyDir = path.join(process.cwd(), 'keys', councilId);
        const privateKeyPath = path.join(keyDir, 'private.pem');
        const publicKeyPath = path.join(keyDir, 'public.pem');

        if (fs.existsSync(privateKeyPath)) {
            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
            return { privateKey, publicKey };
        }

        // Generate new key pair for the council
        if (!fs.existsSync(keyDir)) {
            fs.mkdirSync(keyDir, { recursive: true });
        }

        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });

        fs.writeFileSync(privateKeyPath, privateKey);
        fs.writeFileSync(publicKeyPath, publicKey);

        return { privateKey, publicKey };
    }
}
