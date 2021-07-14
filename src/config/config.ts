import dotenv from 'dotenv';

dotenv.config();

export const sistema = {
    PORT: process.env.PORT || 3000,
    jwtSECRET: process.env.JWT_SECRET || '',
}


export const mongoDB = {
    HOST: process.env.MONGODB_HOST || 'localhost',
    PORT: process.env.MONGODB_PORT || '27017',
    DATABASE: process.env.MONGODB_DATABASE || 'db-api-multimedia',
    USER: process.env.MONGODB_USER || '',
    PASS: process.env.MONGODB_PASS || '',
    
}