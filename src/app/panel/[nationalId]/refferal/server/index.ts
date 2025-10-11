"use server"

import prisma from "@/services/prisma"

export async function GetProfitRecords(contractId:string) {
    return await prisma.profitRecord.findMany({
        where:{
            contractId,isForInvestor:false
        },orderBy:{
            paymentDate:"asc"
        }
    })
}