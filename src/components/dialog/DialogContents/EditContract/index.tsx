"use client"

import { Contract } from "@prisma/client";
import { useEffect, useState } from "react";
import { GetContract } from "./server";

import Elements from "./elements"
export default function EditContractComponent({ contractId }: { contractId: string }) {

    const [contract, setContract] = useState<Contract | null>(null)

    useEffect(() => {
        GetContract(contractId).then(setContract);

    }, [contractId])
    if (!contract) {
        return <div></div>
    }
    return (
        <>
            <Elements.StartDateEditContractComponent defaultDate={contract?.contractStartDate} />
            <Elements.EndDateEditContractComponent defaultDate={contract?.contractEndDate} />
            <div>
                <label>نوع قرارداد</label>
                <input type="text" required name="type" defaultValue={contract?.contractType} />
            </div>
            <div>
                <label>دوره بازپرداخت سود(روز)</label>
                <input type="text" name="period" required defaultValue={contract?.contractProfitPeriod} />
            </div>
            <div>
                <label>میزان سرمایه</label>
                <input type="text" name="amount" required defaultValue={contract?.investmentAmount} />
            </div>
            <div>
                <label>درصد سود</label>
                <input type="text" name="percent" required defaultValue={contract?.profitPercentage} />
            </div>
            <input type="text" name="contractId" readOnly className="hidden" value={contractId} />
        </>
    );
}