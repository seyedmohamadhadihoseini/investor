import { IsSameDate } from "@/lib/date/dateUtils";
import SendSms from "@/services/melli_payamak";
import prisma from "@/services/prisma";




export async function GET() {
    const allProfitRecords = await prisma.profitRecord.findMany({
        where: {
            isPaid: false
        }
    })
    const tomorrowDate = new Date()
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    const selectedProfits = allProfitRecords.filter(record => IsSameDate(record.paymentDate, tomorrowDate));

    for (let index = 0; index < selectedProfits.length; index++) {
        const proift = selectedProfits[index];
        const person = await prisma.person.findFirst({
            where: {
                investments: { some: { id: proift.contractId } }
            }
        })

        if (person) {
            SendSms(process.env.ADMIN_PHONE,' موعد پرداخت سود مشتری با کد ملی'+`${person.nationalId}` + `آقای ${person.FullName}`+' فردا هست');
        }

    }
}