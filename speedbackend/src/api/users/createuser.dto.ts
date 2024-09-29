import {Date } from 'mongoose'

export class CreateuserDto{
    name:string;
    email: string;
    birthday: Date;
}