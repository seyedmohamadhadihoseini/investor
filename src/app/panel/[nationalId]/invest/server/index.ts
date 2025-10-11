"use server"

import prisma from "@/services/prisma"

export async function RemoveContract(id:string) {
    
    await prisma.contract.delete({where:{id}})
}
export async function GetProfitRecords(contractId:string) {
    return await prisma.profitRecord.findMany({
        where:{
            contractId,isForInvestor:true
        },orderBy:{
            paymentDate:"asc"
        }
    })
}