"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
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

interface Props {
    type: "image" | "video";
    accept: string;
    placeholder: string;
    folder: string;
    variant: "dark" | "light";
    value?: string;
    onFileChange: (filePath: string) => void;
};

export default function FileUpload({
    type,
    accept,
    placeholder,
    folder,
    variant,
    value,
    onFileChange,
}: Props) {
    const IKUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string | null }>({ filePath: value ?? null });
    const [progress, setProgress] = useState(0);

    const styles = {
        button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border border-gray-100",
        placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
        text: variant === "dark" ? "text-light-100" : "text-dark-500",
    }

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);
        toast(`${res.filePath} uploaded successfully`);
    }

    const onError = (err: any) => {
        console.log(err);
        toast(`Your ${type} could not be uploaded. Please try again.`);
    }

    const onValidate = (file: File) => {
        if (type === "image") {
            if (file.size > 20 * 1024 * 1024) {
                toast("Please upload a file that is less than 10MB in size.");
                return false;
            }
        } else if (type === "video") {
            if (file.size > 50 * 1024 * 1024) {
                toast("Please upload a file that is less than 50MB in size.");
                return false;
            }
        }

        return true;
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
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={() => setProgress(0)}
                onUploadProgress={({ loaded, total }) => {
                    const percent = Math.round((loaded / total) * 100);
                    setProgress(percent);
                }}
                folder={folder}
                accept={accept}
                className="hidden"
            />

            <button className={cn("upload-btn", styles.button)} onClick={(e) => {
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

                <p className={cn("text-base", styles.placeholder)}>
                    {placeholder}
                </p>

                {file && (
                    <p className={cn("upload-filename", styles.text)}>
                        {file.filePath}
                    </p>
                )}
            </button>

            {progress > 0 && progress !== 100 && (
                <div className="w-full rounded-full bg-green-200">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>
            )}

            {file && (
                (type === "image" ? (
                    <IKImage
                        path={file?.filePath!}
                        alt={file?.filePath!}
                        width={500}
                        height={500}
                    />
                ) : type === "video" ? (
                    <IKVideo
                        path={file?.filePath!}
                        controls={true}
                        className="w-full h-96 rounded-xl"
                    />
                ) : null)
            )}
        </ImageKitProvider>
    )
}