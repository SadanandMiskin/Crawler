"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongo = process.env.MONGO;
function connectDb() {
    mongoose_1.default.connect(mongo || '')
        .then(() => console.log('db connected'))
        .catch(err => console.error(err));
}
exports.connectDb = connectDb;
