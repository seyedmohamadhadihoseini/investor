"use client"
import { usePathname } from "next/navigation";

import Elements from "./elements";
import { useEffect, useState } from "react";
import { Person } from "@prisma/client";
import { GetPersonByNationalId } from "@/server";
export default function AddContractComponent() {
    const personNationalId = usePathname().replace("/panel", "").replace("/invest", "").replace("/", "")
    const [person, setPerson] = useState<Person | null>();
    useEffect(() => {
        GetPersonByNationalId(personNationalId).then(setPerson);
    }, [personNationalId])


    return (
        <>
            <Elements.StartDateAddContractComponent />
            <Elements.EndDateAddContractComponent />
            <div>
                <label>نوع قرارداد</label>
                <input type="text" required name="type" />
            </div>
            <div>
                <label>دوره بازپرداخت سود(روز)</label>
                <input type="text" name="period" required />
            </div>
            <div>
                <label>میزان سرمایه</label>
                <input type="text" name="amount" required />
            </div>
            <div>
                <label>درصد سود</label>
                <input type="text" name="percent" required />
            </div>
            <div className={person?.parentReferrerId ? "" : "hidden"}>
                <label>
                    درصد سود معرف
                </label>
                <input type="text" name="referrer-percent" />
            </div>
            <input type="text" name="nationalId" readOnly className="hidden" value={personNationalId} />
        </>
    );
}