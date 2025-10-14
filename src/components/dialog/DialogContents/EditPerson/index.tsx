import { Person } from "@prisma/client";

import { useEffect, useState } from "react";
import { GetPerson } from "./server";


export default function EditPersonDialogFormContent({ id }: { id: string }) {
    const [person, setPerson] = useState<Person | null>();
    useEffect(() => {
        GetPerson(id).then(setPerson);
    }, [])
    return (
        <>
            <div>
                <label>نام و نام خانوادگی</label>
                <input type="text" name="full-name" defaultValue={person?.FullName} />
            </div>
            <div>
                <label>کد ملی</label>
                <input type="text" name="national-id" defaultValue={person?.nationalId} />
            </div>
            <div>
                <label>شماره تماس</label>
                <input type="text" name="phone" defaultValue={person?.phoneNumber || ""} />
            </div>
            
            <div>
                <label>کد ملی معرف</label>
                <input type="text" name="referrer-national-id" defaultValue={person?.parentReferrerId||""} />
            </div>
            <div className="hidden">
                <input type="text" name="id" defaultValue={person?.id} />
            </div>
        </>
    );
}