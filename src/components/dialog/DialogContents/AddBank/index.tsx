"use client"

import { usePathname } from "next/navigation";



export default function AddBankDialogFormContent() {
    const personNationalId = usePathname().replace("/panel", "").replace("/information", "").replace("/", "")
    return (
        <>
            <div>
                <label>نام بانک</label>
                <input type="text" required name="name" />
            </div>
            <div>
                <label>شماره حساب</label>
                <input type="text" required name="number" />
            </div>
            <div className="hidden">
                <input type="text" defaultValue={personNationalId}  name="national-id" readOnly />
            </div>

        </>
    );
}