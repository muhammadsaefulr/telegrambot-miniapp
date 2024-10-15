import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const SESSION_DURATION = 60 * 60 * 1000;

export async function encryptJWT(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decryptJWT(input: any): Promise<any>{
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    })

    return payload
}

export async function getSession() {
    const session = cookies().get("session")?.value
    console.log("User Session Value in getsession : ", session);
    if(!session) return null

    return await decryptJWT(session);
}

export async function updateSession(request:NextRequest) {
    const session = request.cookies.get("session")?.value;
    if(!session) return 
    
    const parsed = await decryptJWT(session)

    parsed.expires = new Date(Date.now() + SESSION_DURATION);
    const res = NextResponse.next()

    res.cookies.set({
        name: "session",
        value: await encryptJWT(parsed),
        httpOnly: true,
        expires: parsed.expires,
    })
    
    return res
}