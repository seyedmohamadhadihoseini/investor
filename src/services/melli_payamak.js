"use server"
import MelliPayamakApi from "melipayamak"

export default async function SendSms(to, text) {
    const username = process.env.MELLI_PAYAMAK_USERNAME || '09904671688';
    const password = process.env.MELLI_PAYAMAK_PASSWORD || 'Hamid@1467225363';

    const api = new MelliPayamakApi(username, password);

    const sms = api.sms();
    // const from = "1000996"
    const from = process.env.MELLI_PAYAMAK_FROM || "50002710071688"

    const res = await sms.send(to, from, text)


    console.log(res)

}