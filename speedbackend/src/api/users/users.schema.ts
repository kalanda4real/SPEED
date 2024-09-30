import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { Document } from 'mongodb';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true})
  username: string;

  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) 
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
