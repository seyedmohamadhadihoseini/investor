"use client"
import { useEffect, useState } from "react";
import BanksAccountDataTable from "./BanksDataTable";
import style from "./style.module.css"
import { BankAccount } from "@prisma/client";
import { GetBankAccounts } from "./server";
import { usePersonData } from "@/hooks/use-person";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default  function PanelInformation()
{
    const [banks,setBanks] = useState<BankAccount[]>([]);
    const {person} = usePersonData()
    const ForceUpdate = useSelector((state:RootState)=>state.panel.ForceUpdate);
    
    useEffect(()=>{
        GetBankAccounts(person.id).then(setBanks);
    },[ForceUpdate])
    return (
        <div className={style.container}>
            <div className={style.banks}>
                <h1 >حساب های بانکی</h1>
                <BanksAccountDataTable banks={banks}/>
            </div>
        </div>
    );
}