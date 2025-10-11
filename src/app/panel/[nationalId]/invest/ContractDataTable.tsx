"use client"

import DataListComponent from "@/components/DataTable";
import { setDialogObjectId, SetDialogOpen, SetDialogType } from "@/redux/features/dialog/dialogSlice";
import { Contract } from "@prisma/client";
import { useDispatch } from "react-redux";
import { RemoveContract } from "./server";
import { useRouter } from "next/navigation";
import { changeContractId } from "@/redux/features/panel/panelSlice";


export default function ContractDataTableInvestor({ contracts }: { contracts: (Contract)[] }) {
    
    const dispatch = useDispatch()
    const router = useRouter()
    const data = contracts.map(contract => ({
        _id:contract.id,
        startDate: contract.contractStartDate.toLocaleDateString("fa-ir"),
        endDate: contract.contractEndDate.toLocaleDateString("fa-ir"),
        profitPeriod: contract.contractProfitPeriod,
        percent: contract.profitPercentage,
        amount: (`${contract.investmentAmount}`),
        type: contract.contractType,
        url:""
    }))
    return (
        <DataListComponent
            headers={[
                { value: "type", title: "نوع" },
                { value: "amount", title: "مقدار سرمایه گذاری" },
                { value: "percent", title: "درصد سود" },
                { value: "startDate", title: "تاریخ شروع" },
                { value: "endDate", title: "تاریخ پایان" },
                { value: "profitPeriod", title: "دوره بازپرداخت سود(روز)" },
                { value: "url", title: "url" },
            ]}
            data={data}
            isShowAddButton
            isShowEditButton
            isShowRemoveButton
            isShowProfile={false}
            goProfileFunction={()=>{}}
            editFunction={(contractId: string) => {
                dispatch(SetDialogOpen(true));
                dispatch(SetDialogType("EDIT_CONTRACT"));
                dispatch(setDialogObjectId(contractId));
            }}
            addFunction={() => {
                dispatch(SetDialogOpen(true));
                dispatch(SetDialogType("ADD_CONTRACT"));
            }}
            removeFunction={async (contractId: string) => {
                await RemoveContract(contractId);
                dispatch(changeContractId(""));
                router.refresh();
            }}
            onRowClick={(id:string)=>{
                dispatch(changeContractId(id))
            }}
            filters={[
                {title:"مقدار سرمایه",columnId:"amount"}
            ]}
        />
    );
}