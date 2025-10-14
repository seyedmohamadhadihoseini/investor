"use server"
import prisma from "@/services/prisma";

export default async function EditBankAccountServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const bank_name = formData.get("name") as string;
    const oldNumber = formData.get("old-number") as string;
    const number = formData.get("number") as string;


    let success = true;
    try {

        await prisma.bankAccount.update({
            where: {
                number: oldNumber
            },
            data: {
                bank_name, number
            }
        })
    }
    catch (error) {
        console.log(error)
        success = false
    }
    return {
        id: prevState.id + 1,
        success
    };
}
export async function GetBankAccount(number: string) {
    return await prisma.bankAccount.findUnique({ where: { number } })
}