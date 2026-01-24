import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LGIS API Documentation',
            version: '1.0.0',
            description: 'API documentation for Local Government Information System',
            contact: {
                name: 'LGIS Support',
                email: 'support@lgis.gov.pg',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./server/routes.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log('📄 Swagger UI available at http://localhost:5000/api-docs');
}
