import prisma from "@/services/prisma";
import ContractDataTableInvestor from "./ContractDataTable";
import ProfitRecordDataTableInvestor from "./ProfitRecordDataTable";
import style from "./style.module.css"
export default async function InvestPerson({params}:{params:Promise<{ nationalId: string }>})
{   
    const {nationalId} = await params;
    const person = await prisma.person.findUnique({where:{nationalId}})
    const contracts = await prisma.contract.findMany({where:{ investorId:person?.id}})

    return (
        <div className={style.container}>
            <ContractDataTableInvestor contracts={contracts}/>
            <ProfitRecordDataTableInvestor />
        </div>
    );
}