"use client"

import Image from "next/image";
import { ChangeEvent, useState } from "react"
import style from "./style.module.css";
export default function DepositReceiptChooseAndPreviewImage({ preImagePath }: { preImagePath: string | undefined }) {
    const [imageUrl, setImageUrl] = useState(preImagePath);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            setImageUrl("")
            return
        }
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl)
        } else {
            setImageUrl("")
        }
    };
    return <div className={style.container}>
        <input type="file" name="deposit-receipt" onChange={handleFileChange} />
        {imageUrl && <div className="mt-4">
            <p className="text-sm text-gray-500">preview:</p>
            <Image
                src={imageUrl}
                alt="profile preview"
                width={100}
                height={100}
                className={`${style.preview} rounded-full object-cover`}
                onClick={() => {
                    window.open(imageUrl,"_blank")
                }}
            />
        </div>}
    </div>
}