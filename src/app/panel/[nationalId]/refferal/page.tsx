import prisma from "@/services/prisma";
import ContractDataTableInvestor from "./ContractDataTable";
import ProfitRecordDataTableInvestor from "./ProfitRecordDataTable";
import style from "./style.module.css"
export default async function ReferralContracts({ params }: { params: Promise<{ nationalId: string }> }) {
    const { nationalId } = await params;
    const person = await prisma.person.findUnique({ where: { nationalId } })
    if (!person) {
        return <div></div>
    }
    const subPersons = await prisma.person.findMany({
        where: {
            parentReferrerId: person.nationalId
        }, include: { investments: true }
    })
    // console.log(subPersons)

    return (
        <div className={style.container}>
            <ContractDataTableInvestor subPersons={subPersons} />
            <ProfitRecordDataTableInvestor />
        </div>
    );
}