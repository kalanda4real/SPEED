import {Date } from 'mongoose'

export class CreateuserDto{
    username:string;
    email:string;
    password: Date;
}