import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

console.log('--- Debugging Swagger Setup ---');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LGIS API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./server/routes.ts'],
};

try {
    console.log('Running swaggerJsdoc...');
    const specs = swaggerJsdoc(options);
    console.log('Swagger specs generated successfully:', !!specs);
} catch (error) {
    console.error('CRASH: swaggerJsdoc failed:', error);
    process.exit(1);
}

console.log('Verifying UI setup...');
try {
    const app = express();
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup({}));
    console.log('UI setup successful');
} catch (error) {
    console.error('CRASH: swaggerUi setup failed:', error);
    process.exit(1);
}

console.log('--- Success ---');
