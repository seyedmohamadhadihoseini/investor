"use server"

import prisma from "@/services/prisma"
import SaveFileToPublicDir from "@/services/savefile";

export default async function EditProfitRecordServerAction(prevState: { id: number, success: boolean }, formData: FormData) {
    const profitRecordId = formData.get("profit-record-id") as string;
    const depositReceipt = formData.get("deposit-receipt") as File;
    const isPaid = (formData.get("is-paid") as string) === "true";

    const fileName = await SaveFileToPublicDir(depositReceipt, "DepositReceipt")


    let success = true;
    try {
        const count = await prisma.depositFile.count({ where: { profitRecordId } })
        if (count > 0) {
           await prisma.depositFile.delete({
                where: {
                    profitRecordId
                }
            })
        }
        await prisma.depositFile.create({
            data: {
                profitRecordId,
                fileUrl: `/api/images?name=${fileName}`,
                month: ""
            }
        });
        await prisma.profitRecord.update({
            where: { id: profitRecordId },
            data: {
                isPaid
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


export async function GetProfitRecord(id: string) {
    return await prisma.profitRecord.findUnique({ where: { id }, include: { depositFile: true } })
}