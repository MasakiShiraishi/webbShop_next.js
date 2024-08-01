import mongoose, { Schema, Document } from "mongoose";
import { User } from "../lib/definitions";

export interface IUser extends Document{
          username: string;
          password: string;          
}

const userSchema: Schema = new Schema<User>({
          username: { type: String, required: true, unique: true },
          password: { type: String, required: true },      
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

        export default UserModel;