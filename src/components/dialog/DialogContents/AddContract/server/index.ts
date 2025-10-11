"use server"

import prisma from "@/services/prisma";
import { Contract } from "@prisma/client";

export default async function AddNewContractServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const nationalId = formData.get("nationalId") as string;
    const contractStartDate = new Date(formData.get("start-date") as string);
    const contractEndDate = new Date(formData.get("end-date") as string);
    const contractProfitPeriod = Number(formData.get("period") as string);
    const contractType = formData.get("type") as string;
    const investmentAmount = Number(formData.get("amount") as string);
    const profitPercentage = Number(formData.get("percent") as string);
    const referrerPercentage = Number(formData.get("referrer-percent") as string);

    let success = true;
    try {
        const person = await prisma.person.findUnique({ where: { nationalId } })
        if (!person) {
            throw new Error("the person not exist ");
        }
        const investorId = person.id;
        const contract = await prisma.contract.create({
            data: {
                investorId, contractStartDate, contractEndDate, contractProfitPeriod,
                contractType, investmentAmount, profitPercentage, referrerPercentage
            }
        })
        await GenerateProfitRecords(contract);
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

async function GenerateProfitRecords(contract: Contract) {
    const person = await prisma.person.findUnique({
        where: { id: contract.investorId }
    });
    if (!person) {
        return;
    }
    let indexDate = contract.contractStartDate;
    indexDate.setDate(indexDate.getDate() + contract.contractProfitPeriod);
    while (indexDate <= contract.contractEndDate) {
        await prisma.profitRecord.create({
            data: {
                contractId: contract.id,
                paymentDate: indexDate,
                profitAmount: contract.investmentAmount * contract.profitPercentage * 0.01,
                isPaid: false,
            }
        })
        if (person.parentReferrerId && contract.referrerPercentage) {

            await prisma.profitRecord.create({
                data: {
                    isForInvestor: false,
                    contractId: contract.id,
                    paymentDate: indexDate,
                    profitAmount: contract.investmentAmount * contract.referrerPercentage * 0.01,
                    isPaid: false,
                }
            })
        }
        indexDate.setDate(indexDate.getDate() + contract.contractProfitPeriod);
    }
}

