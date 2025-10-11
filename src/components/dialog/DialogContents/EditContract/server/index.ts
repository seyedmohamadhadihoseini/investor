"use server"

import prisma from "@/services/prisma";
import { Contract } from "@prisma/client";

export default async function EditContractServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const id = formData.get("contractId") as string;
    const contractStartDate = new Date(formData.get("start-date") as string);
    const contractEndDate = new Date(formData.get("end-date") as string);
    const contractProfitPeriod = Number(formData.get("period") as string);
    const contractType = formData.get("type") as string;
    const investmentAmount = Number(formData.get("amount") as string);
    const profitPercentage = Number(formData.get("percent") as string);

    let success = true;
    try {

        const contract = await prisma.contract.update({
            where: {
                id
            },
            data: {
                contractStartDate, contractEndDate, contractProfitPeriod,
                contractType, investmentAmount, profitPercentage
            }
        })
        await UpdateProfitRecords(contract)
    }
    catch (error) {
        success = false
        console.log(error)
    }
    return {
        id: prevState.id + 1,
        success
    };

}

export async function GetContract(id: string) {
    return await prisma.contract.findUnique({ where: { id } })
}

async function UpdateProfitRecords(contract: Contract) {
    const person = await prisma.person.findUnique({
        where: { id: contract.investorId }
    });
    if (!person) {
        return;
    }
    let indexDate = new Date();
    indexDate.setDate(indexDate.getDate() + contract.contractProfitPeriod);
    while (indexDate <= contract.contractEndDate) {
        await prisma.profitRecord.updateMany({
            where: {
                paymentDate: { gt: indexDate }, contractId: contract.id,
                isForInvestor: true
            },
            data: {
                profitAmount: contract.investmentAmount * contract.profitPercentage * 0.01,
            }
        })
        if (person.parentReferrerId && contract.referrerPercentage) {
            await prisma.profitRecord.updateMany({
                where: {
                    paymentDate: { gt: indexDate }, contractId: contract.id,
                    isForInvestor: false
                },
                data: {
                    profitAmount: contract.investmentAmount * contract.referrerPercentage * 0.01,
                }
            })
        }
        indexDate.setDate(indexDate.getDate() + contract.contractProfitPeriod);
    }
}
