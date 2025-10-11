"use client"

import DataListComponent from "@/components/DataTable";
import { Contract, Person } from "@prisma/client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {  changeReferrerContractId } from "@/redux/features/panel/panelSlice";
import { HeaderType } from "@/components/DataTable/columns";
export default function ContractDataTableReferral({ subPersons }:
    {
        subPersons: ({ investments: Contract[] } & Person)[]
    }) {

    const dispatch = useDispatch()
    
    let data: HeaderType[] = []
    subPersons.forEach(subPerson => {

        const subPersonContract = subPerson.investments.map(investment => ({
            _id: investment.id,
            inverstorNationalId: subPerson.nationalId,
            inverstorFullName: subPerson.FullName,
            startDate: investment.contractStartDate.toLocaleDateString("fa-ir"),
            endDate: investment.contractEndDate.toLocaleDateString("fa-ir"),
            profitPeriod: investment.contractProfitPeriod,
            percent: investment.referrerPercentage || "",
            amount: investment.investmentAmount.toString(),
            url: ""
        }))
        data = [...data, ...subPersonContract]
    })
    return (
        <DataListComponent
            headers={[
                { value: "inverstorNationalId", title: "کد ملی سرمایه گذار" },
                { value: "inverstorFullName", title: "نام و نام خانوادگی سرمایه گذار" },
                { value: "amount", title: "سرمایه" },
                { value: "percent", title: "درصد سود" },
                { value: "startDate", title: "تاریخ شروع قرارداد" },
                { value: "endDate", title: "تاریخ پایان قرارداد" },
                { value: "profitPeriod", title: "دوره بازپرداخت سود(روز)" },
                { value: "url", title: "url" },
            ]}
            data={data}
            isShowAddButton={false}
            isShowEditButton={false}
            isShowRemoveButton={false}
            isShowProfile={false}
            editFunction={() => {

            }}
            addFunction={() => {

            }}
            removeFunction={async () => {

            }}
            goProfileFunction={()=>{}}
            onRowClick={(id: string) => {
                dispatch(changeReferrerContractId(id))
            }}
            filters={[
                { title: "مقدار سرمایه", columnId: "amount" }
            ]}
        />
    );
}