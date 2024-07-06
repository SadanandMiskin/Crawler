import mongoose from "mongoose";
const mongo = process.env.MONGO;
export function connectDb() {
    mongoose.connect(mongo || '')
        .then(() => console.log('db connected'))
        .catch(err => console.error(err));
}
