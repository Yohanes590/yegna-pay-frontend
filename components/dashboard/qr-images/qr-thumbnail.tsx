"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";

interface QrReceiptThumbnailProps {
    src: string;
    alt: string;
    className?: string;
}

export default function QrReceiptThumbnail({ src, alt, className = "" }: QrReceiptThumbnailProps) {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [src]);

    if (!src || failed) {
        return (
            <div
                className={`flex flex-col items-center justify-center gap-1.5 text-[#94a3b8] dark:text-[#64748b] bg-[#f8fafc] dark:bg-[#08101a] ${className}`}
            >
                <ImageOff size={22} />
                <span className="text-[11px] font-medium">Preview unavailable</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={className}
        />
    );
}

