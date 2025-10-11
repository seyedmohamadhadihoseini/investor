"use client"
import DataListComponent from "@/components/DataTable";
import { RemoveUserServerAction } from "../server";
import { useRouter } from "next/navigation";
import { Contract, Person } from "@prisma/client";
import { useDispatch } from "react-redux";
import { setDialogObjectId, SetDialogOpen, SetDialogType } from "@/redux/features/dialog/dialogSlice";
export default function PersonDataTable({ people }: { people: (Person & { referrers: Person[] } & { investments: Contract[] })[] }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const minDate = people.map(item => item.createdAt).reduce((acc, item) => {
        if (item.getTime() <= acc) {
            return item.getTime();
        }
        return acc;
    }, Infinity)
    const maxDate = people.map(item => item.createdAt).reduce((acc, item) => {
        if (item.getTime() >= acc) {
            return item.getTime();
        }
        return acc;
    }, 0)
    const data = people.map(person => ({
        _id: person.id,
        nationalId: person.nationalId,
        FullName: person.FullName,
        investorTotalMoney: person.investments.reduce((acc, item) => acc + item.investmentAmount, 0).toString(),
        refferalCount: person.referrers.length,
        phoneNumber: person.phoneNumber || "",
        bankAccount: person.bankAccount || "",
        referrerNationalId: person.parentReferrerId || "",
        date: person.createdAt.toISOString(),
        url: `/panel/${person.nationalId}/invest`
    }))
    return (
        <DataListComponent
            headers={[
                { value: "nationalId", title: "کد ملی" },
                { value: "FullName", title: "نام و نام خانوادگی" },
                { value: "investorTotalMoney", title: "مجموع سرمایه" },
                { value: "refferalCount", title: "تعداد افراد معرفی شده" },
                { value: "phoneNumber", title: "شماره تماس" },
                { value: "bankAccount", title: "شماره حساب" },
                { value: "referrerNationalId", title: "کد ملی معرف" },
                { value: "date", title: "تاریخ عضویت" },
                { value: "url", title: "url" },
                { value: "_id", title: "id" },
            ]}
            data={data}

            isShowAddButton
            isShowEditButton
            isShowRemoveButton
            isShowProfile
            editFunction={(id: string) => {
                dispatch(SetDialogOpen(true));
                dispatch(SetDialogType("EDIT_PERSON"));
                dispatch(setDialogObjectId(id));
            }}
            addFunction={() => {
                dispatch(SetDialogOpen(true));
                dispatch(SetDialogType("ADD_PERSON"));
            }}
            removeFunction={async (id: string) => {
                await RemoveUserServerAction(id);
                router.refresh();
            }}
            onRowClick={() => {

            }}
            goProfileFunction={(id: string) => {
                window.location.href = `/panel/${(people.filter(person => person.id == id)[0].nationalId)}/invest`
            }}
            filters={[
                { title: "کد ملی", columnId: "nationalId" },
                { title: "نام و نام خانوادگی", columnId: "FullName" },
                { title: "شماره حساب", columnId: "bankAccount" },
                { title: "میزان سرمایه", columnId: "investorTotalMoney" },
            ]}
            dateFilter={
                {
                    start_date: new Date(minDate),
                    end_date: new Date(maxDate)
                }
            }
        />
    );
}