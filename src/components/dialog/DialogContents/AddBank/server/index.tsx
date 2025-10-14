"use server"
import prisma from "@/services/prisma";

export default async function AddNewBankServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const bank_name = formData.get("name") as string;
    const nationalId = formData.get("national-id") as string;
    const number = formData.get("number") as string;
    
    
    let success = true;
    try {
        const person = await prisma.person.findUnique({where:{nationalId}})
        await prisma.bankAccount.create({
            data: {
                PersonId:`${person?.id}`,bank_name,number
            }
        })
    }
    catch (error){
        console.log(error)
        success = false
    }
    return {
        id: prevState.id + 1,
        success
    };
}