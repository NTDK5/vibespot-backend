import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import prismaLoader from './prisma.js';
export default async (app) =>{
    // await mongooseLoader();
    await prismaLoader();
    expressLoader(app);
}