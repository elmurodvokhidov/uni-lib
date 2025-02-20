"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

const authenticator = async () => {
    try {
        const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if (!res.ok) {
            const errTxt = await res.text();
            throw new Error(`Request failed with status: ${res.status} - ${errTxt}`);
        }

        const data = await res.json();
        const { signature, expire, token } = data;

        return { signature, expire, token };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
}

export default function ImageUpload() {
    return (
        <div>ImageUpload</div>
    )
}