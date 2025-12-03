import mongoose from 'mongoose';
import { dburi } from '../config/index.js';

export default async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dburi, {}).then(() => {
        console.log('Mongodb Connection');
    }).catch(err =>{
        console.log(err);

    });
};