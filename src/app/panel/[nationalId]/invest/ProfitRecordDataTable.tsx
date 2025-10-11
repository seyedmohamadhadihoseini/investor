"use client"

import DataListComponent from "@/components/DataTable";
import { setDialogObjectId, SetDialogOpen, SetDialogType } from "@/redux/features/dialog/dialogSlice";
import { ProfitRecord } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import { GetProfitRecords } from "./server";

import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { GetDayDiff } from "@/lib/date/timediff";

import style from "./style.module.css"
import { makeForceUpdate } from "@/redux/features/panel/panelSlice";
export default function ProfitRecordDataTableInvestor() {
    const [profitRecords, setProfitRecords] = useState<ProfitRecord[]>([]);
    const contractId = useSelector((state: RootState) => state.panel.ContractId);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const forceUpdate = useSelector((state:RootState)=>state.panel.ForceUpdate)
    useEffect(() => {
        GetProfitRecords(contractId).then(data => {
            setProfitRecords(data)
            setTimeout(() => {
                containerRef.current?.scrollIntoView();

            }, 500);
        });
    }, [contractId,forceUpdate])
    const dispatch = useDispatch()
    
    if (profitRecords.length == 0) {
        return <div></div>
    }
    const data = profitRecords.map(profit => ({
        _id: profit.id,
        paymentDate: profit.paymentDate.toLocaleDateString("fa-ir"),
        profitAmount: profit.profitAmount,
        dayReminds: GetDayDiff(new Date(), profit.paymentDate),
        isPaid: profit.isPaid ? "بله" : "خیر",
        url: ""
    }))
    return (
        <div ref={containerRef} className={style["profit-record"]}>
            <DataListComponent

                headers={[

                    { value: "paymentDate", title: "تاریخ سررسید" },
                    { value: "profitAmount", title: "سود" },
                    { value: "dayReminds", title: "مانده(روز)" },
                    { value: "isPaid", title: "آیا پرداخت شده" },
                    { value: "url", title: "url" },
                ]}
                data={data}
                isShowAddButton={false}
                isShowEditButton
                isShowRemoveButton={false}
                isShowProfile={false}
                goProfileFunction={()=>{}}
                editFunction={(profitId: string) => {
                    dispatch(SetDialogOpen(true));
                    dispatch(SetDialogType("EDIT_PROFITRECORD"));
                    dispatch(setDialogObjectId(profitId));
                }}
                addFunction={() => {
                    dispatch(SetDialogOpen(true));
                    dispatch(SetDialogType("ADD_CONTRACT"));
                }}
                removeFunction={async () => {
                    
                }}
                onRowClick={() => {

                }}
                filters={[]}
            />
            <div ></div>
        </div>
    );
}