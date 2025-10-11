"use client"
import { useEffect, useState } from "react";

import { DepositFile, ProfitRecord } from "@prisma/client";
import { GetProfitRecord } from "./server";
import DepositReceiptChooseAndPreviewImage from "./elements/DepositReceiptImage";
import style from "./style.module.css"

export default function EditReferrerProfitRecordDialogFormContent({ id }: { id: string }) {
    const [profit, setProfit] = useState<ProfitRecord&{depositFile:DepositFile|null} | null>();
    
    useEffect(() => {
        GetProfitRecord(id).then(data=>{
            setProfit(data)  
        });
    }, [])
    if(!profit){
        return <div></div>
    }
    return (
        <>
            <div className={style.ispaidselect}>
                <label>آیا پرداخت انجام شده است ؟</label>
                <div style={{border:"1px solid black"}}>
                <select name="is-paid" defaultValue={profit.isPaid?"true":"false"}>
                    <option value={"false"}>خیر</option>
                    <option value={"true"}>بله</option>
                </select>
                </div>
            </div>
            <DepositReceiptChooseAndPreviewImage preImagePath={profit.depositFile?.fileUrl}/>
            <div className="hidden">
                <input type="text" name="profit-record-id" defaultValue={profit?.id} />
            </div>
        </>
    );
}