import jwt from 'jsonwebtoken'

const accessTokenSecret = process.env.ACCESS_TOKEN || 'access-token';
const refreshTokenSecret = process.env.REFRESH_TOKEN || 'refresh-token';

export function signAcessToken(payload:object){
    return jwt.sign(payload, accessTokenSecret, {expiresIn:'15m'});
}

export function signRefreshToken(payload:object){
    return jwt.sign(payload, accessTokenSecret, {expiresIn:'7d'});
}

export function verifyAccessToken(token:string){
    return jwt.verify(token, accessTokenSecret);
}
export function verifyRefreshToken(token:string){
    return jwt.verify(token, refreshTokenSecret);
}
