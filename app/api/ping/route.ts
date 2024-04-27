import { NextRequest } from "next/server";

export async function GET(req : NextRequest) {

    const userAgent = req.headers.get('user-agent');
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    return new Response(JSON.stringify({ message: 'pong', userAgent, ip }), {
        headers: {
            'Content-Type': 'application/json'
        }, status: 200
    });
}