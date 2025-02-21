"use client";

import config from "@/lib/config";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const { env: { imagekit: { publicKey, urlEndpoint } } } = config;

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

export default function ImageUpload({ onFileChange }: { onFileChange: (filePath: string) => void }) {
    const IKUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string } | null>(null);

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);
        toast(`${res.filePath} uploaded successfully`);
    }

    const onError = (err: any) => {
        console.log(err);
        toast("Your image could not be uploaded. Please try again.");
    }

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                ref={IKUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                fileName="test.png"
                className="hidden"
            />

            <button className="upload-btn" onClick={(e) => {
                e.preventDefault();
                if (IKUploadRef.current) {
                    // @ts-ignore
                    IKUploadRef.current?.click();
                }
            }}>
                <Image
                    src="/icons/upload.svg"
                    alt="upload-icon"
                    width={20}
                    height={20}
                    className="object-contain"
                />

                <p className="text-base text-light-100">
                    Upload a File
                </p>

                {file && <p className="upload-filename">{file.filePath}</p>}
            </button>

            {file && (
                <IKImage
                    path={file.filePath}
                    alt={file.filePath}
                    width={500}
                    height={500}
                />
            )}
        </ImageKitProvider>
    )
}