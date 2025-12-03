import { getPrisma } from "../loaders/prisma.js";
import {
    comparePassword,
    hashRefreshToken,
    signAccessToken,
    signRefreshToken
}  from '../utils/auth.js';


const ACCESS_PAYLOAD = (user) => ({
    sub:user.id,
    email:user.email,
    role: user.role || "user",
});

export const loginUser = async({email, password}) =>{
    const prisma = getPrisma(); 
    const user = await prisma.user.findUnique({where: {email}});

    if(!user){
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error
    }

    const ok = await comparePassword(password, user.password);
    if(!ok) {
        const error = new Error("Invalid credentials");
        error.status = 401;
        throw error
    }

    const accessToken = signAccessToken(ACCESS_PAYLOAD(user));
    const refreshTokenRaw = signRefreshToken();
    const refreshTokenHash = hashRefreshToken(refreshTokenRaw);

    await prisma.user.update({
        where: {id: user.id},
        data:{refreshTokenHash},
    })

    return {
        user:{
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        },
        accessToken,
        refreshToken: refreshTokenRaw,
    };
};


export const refreshToken = async (refreshTokenRaw) =>{
    const prisma = getPrisma(); 
    if(!refreshTokenRaw){
        const error = new Error("Refresh token missing");
        error.status = 400 ;
        throw error;
    }

    const hashed = hashRefreshToken(refreshTokenRaw);

    const user = await prisma.user.findFirst( {where: {refreshTokenHash: hashed}});
    if(!user){
        const error = new Error("Invalid refresh token");
        error.status = 401;
        throw error
    };

    const accessToken = signAccessToken(ACCESS_PAYLOAD(user));
    const newRefreshRaw = signRefreshToken();
    const newRefreshHash = hashRefreshToken(newRefreshRaw);

    await prisma.user.update({
        wher: {id: user.id},
        data: { refreshTokenHash: newRefreshHash},
    });

    return {
        user: {
            id: user.id,
            email : user.email,
            name: user.name,
            role : user.role
        },
        accessToken,
        refreshToken: newRefreshRaw,
    };
  
};

export const logout = async(userId) => {
    const prisma = getPrisma(); 
    await prisma.user.update({
        where:{id:userId},
        data: {refreshTokenHash: null},
    });
    return true
};