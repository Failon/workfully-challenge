import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express'
import swaggerDocument from "./swagger.json";

export const register = (router: Router) => {
    router.use('/api-docs', serve)
    router.get('/api-docs', setup(swaggerDocument))
}