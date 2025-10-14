"use client"

import { BankAccount } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GetBankAccount } from "./server";



export default function EditBankAccountDialogFormContent({ bankAccountNumber }: { bankAccountNumber: string }) {

    const [bankAccount, setBankAccount] = useState<BankAccount | null>();
    useEffect(() => {
        GetBankAccount(bankAccountNumber).then(setBankAccount);
    }, [])
    if (!bankAccount) {
        return <div>

        </div>
    }
    return (
        <>
            <div>
                <label>نام بانک</label>
                <input type="text" required name="name" defaultValue={bankAccount.bank_name} />
            </div>
            <div>
                <label>شماره حساب</label>
                <input type="text" required name="number" defaultValue={bankAccount.number} />
            </div>
            <div className="hidden">
                <input type="text" defaultValue={bankAccountNumber} name="old-number" readOnly />
            </div>

        </>
    );
}