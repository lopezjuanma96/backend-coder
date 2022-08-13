import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)
})

const config = {
    NODE_ENV: process.env.NODE_ENV || 'DEV',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    PERSIST: process.env.PERSIST || 'MONGO'
}

export default config