import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as jwt from './utils/jwt.utils'
import {RegisterInput, LoginInput} from './schemas/auth.schema'
import crypto from 'crypto';
import { error } from 'console';

const prisma = new PrismaClient();

export class AuthService{
    static async register(data:RegisterInput){
        const {email,password,name} = data;

        const existingUser = await prisma.user.findUnique({
            where:{email}
        });

        if(existingUser){
            throw new Error('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                email,
                password:hashedPassword,
                name
            }
        });
        const accessToken = jwt.signAcessToken({userId:user.id});
        const refreshToken = jwt.signRefreshToken({userId:user.id});

        const hashedRefreshToken = crypto
        .createHash('sha256')  
        .update(refreshToken)
        .digest('hex');
        await prisma.refreshToken.create({
            data:{
                hashedToken:hashedRefreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now()+7*24*60*60*1000)
            }
        });
        const {password: _,...userWithoutPassword} = user;
        return {
            user:userWithoutPassword,
            accessToken,
            refreshToken
        };
    }
    static async login(data:LoginInput){
        const {email,password} = data;
        const user = await prisma.user.findUnique({
            where:{email}
            });
            if(!user){
                throw new Error('Invalid email or password'); 
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                throw new Error('Incorrect password');
            }

            const accessToken = jwt.signAcessToken({userId:user.id});
            const refreshToken = jwt.signRefreshToken({userId:user.id});

            const handleRefreshToken = crypto
            .createHash('sha256')   
            .update(refreshToken)
            .digest('hex');

            await prisma.refreshToken.create({
                data:{
                    hashedToken:handleRefreshToken,
                    userId: user.id,
                    expiresAt: new Date(Date.now()+7*24*60*60*1000)
                }
            });
            const {password: _,...userWithoutPassword} = user;

            return {
                user:userWithoutPassword,
                accessToken,
                refreshToken
            };
    }
}