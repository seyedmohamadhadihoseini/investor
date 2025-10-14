"use server"

import prisma from "@/services/prisma"

export  async function RemoveBankAccount(number: string) {
    await prisma.bankAccount.delete({ where: { number } })
}
export async function GetBankAccounts(PersonId:string) {
    return await prisma.bankAccount.findMany({
        where:{
            PersonId
        }
    })
}