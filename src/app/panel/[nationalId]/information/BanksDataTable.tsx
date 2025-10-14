"use client"

import DataListComponent from "@/components/DataTable";
import { setDialogObjectId, SetDialogOpen, SetDialogType } from "@/redux/features/dialog/dialogSlice";
import { BankAccount } from "@prisma/client";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";

import {RemoveBankAccount} from "./server";
import { makeForceUpdate } from "@/redux/features/panel/panelSlice";


export default function BanksAccountDataTable({ banks }: { banks: BankAccount[] }) {

    const dispatch = useDispatch()
    const router = useRouter()
    const data = banks.map(bank => ({
        _id: bank.number,
        accountNumber: bank.number,
        bankName: bank.bank_name,
        url: ""
    }))
    return (
        <DataListComponent
            headers={[
                { value: "bankName", title: "نام بانک" },
                { value: "accountNumber", title: "شماره حساب" },
                { value: "url", title: "url" },
            ]}
            data={data}
            isShowAddButton
            isShowEditButton
            isShowRemoveButton
            isShowProfile={false}
            goProfileFunction={() => { }}
            editFunction={(contractId: string) => {
                dispatch(SetDialogOpen(true));
                dispatch(SetDialogType("EDIT_BANK"));
                dispatch(setDialogObjectId(contractId));
            }}
            addFunction={() => {
                dispatch(SetDialogOpen(true));
                dispatch(SetDialogType("ADD_BANK"));
            }}
            removeFunction={async (accountNumber: string) => {
                await RemoveBankAccount(accountNumber);
                dispatch(makeForceUpdate());
            }}
            onRowClick={(id: string) => {
                
            }}
            filters={[
                { title: "شماره حساب", columnId: "accountNumber" },
                { title: "نام بانک", columnId: "bankName" }
            ]}
        />
    );
}