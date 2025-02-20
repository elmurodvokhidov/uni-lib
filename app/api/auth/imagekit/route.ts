import config from '@/lib/config';
import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

const { env: { imagekit: { publicKey, privateKey, urlEndpoint } } } = config;

const imagekit = new ImageKit({
    publicKey: publicKey,
    privateKey: privateKey,
    urlEndpoint: urlEndpoint,
});

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}