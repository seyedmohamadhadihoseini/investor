"use server"
import prisma from "@/services/prisma";

export async function EditPersonServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const id = formData.get("id") as string;
    const FullName = formData.get("full-name") as string;
    const nationalId = formData.get("national-id") as string;
    const phoneNumber = formData.get("phone") as string;
    const bankAccount = formData.get("bank-account") as string;
    const parentReferrerId = formData.get("referrer-national-id") as string;

    let success = true;
    try {

        await prisma.person.update({
            where: {
                id
            },
            data: {
                nationalId, FullName, phoneNumber,parentReferrerId
            }
        })
    }
    catch {
        success = false
    }
    return {
        id: prevState.id + 1,
        success
    };
}
export async function GetPerson(id: string) {
    return await prisma.person.findUnique({ where: { id } })
}