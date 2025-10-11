"use client"

import SendSms from "@/services/melli_payamak";
// import style from "./style.module.css"
export default  function Page()
{

    return (
        <div >
            <button onClick={async()=>{
                await SendSms()

            }}>
                ok
            </button>
        </div>
    );
}