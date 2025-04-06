import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        requred: true
    },
    password: {
        type: String,
        requred: true
    },
    photo: {
        type: String,
        requred: true
    },
    rule: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    },
}, {
    virtuals: {
        photuUrl: {
            get() {
                return `${getAssetUrl('photos')}${this.photo}`
            }
        }
    },
    toJSON: {
        virtuals: true
    }
})

export default mongoose.model('User', userSchema, 'users');