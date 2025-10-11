"use client"

import { DialogComponent } from "@/components/dialog";


import { useActionState, useEffect, useState } from "react";
import style from "./style.module.css"

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { DialogType, SetDialogOpen } from "@/redux/features/dialog/dialogSlice";
import AddNewPersonServerAction from "./AddPerson/server";
import { EditPersonServerAction } from "./EditPerson/server";
import AddPersonDialogFormContent from "./AddPerson";
import EditPersonDialogFormContent from "./EditPerson";
import AddNewContractServerAction from "./AddContract/server";
import AddContractComponent from "./AddContract";
import EditContractComponent from "./EditContract";
import EditContractServerAction from "./EditContract/server";
import EditProfitRecordDialogFormContent from "./EditProfitRecord";
import EditProfitRecordServerAction from "./EditProfitRecord/server";
import { makeForceUpdate } from "@/redux/features/panel/panelSlice";
import EditReferrerProfitRecordDialogFormContent from "./EditReferrerProfitRecord";
import EditReferrerProfitRecordServerAction from "./EditReferrerProfitRecord/server";
export default function DialogContent() {
    const openDialog = useSelector((state: RootState) => state.dialog.open);
    const dispatch = useDispatch()
    const setOpenDialog = (isOpen: boolean) => {
        dispatch(SetDialogOpen(isOpen))
    }
    const dialogForm = useSelector((state: RootState) => state.dialog.type);
    const serverAction = FindServerAction(dialogForm)
    const FormContent = FindFormContent(dialogForm);
    const [state, formAction] = useActionState(serverAction, { id: 0, success: false })

    const router = useRouter()
    useEffect(() => {
        if (state.id > 0) {
            if (state.success) {
                toast.success("با موفقیت انجام شد")
                setOpenDialog(false);
                router.refresh()
                dispatch(makeForceUpdate());
            } else {
                toast.error("خطایی وجود دارد")
            }
        }
    }, [state, router])
    return (
        <div className={style.container}>
            {openDialog && <DialogComponent title="" description=""
                open={openDialog} setOpen={setOpenDialog}
            >
                <form className={style["dialog-form"]} action={formAction}>
                    {FormContent}
                    <div className={style.operation}>
                        <button type="submit" className="bg-green-500">تایید</button>
                        <button className="bg-red-500" onClick={() => {
                            setOpenDialog(false)
                        }}>انصراف</button>
                    </div>
                </form>
            </DialogComponent>}
        </div>
    );
}


function FindServerAction(content: DialogType) {
    if (content == "ADD_PERSON") {
        return AddNewPersonServerAction
    } else if (content == "EDIT_PERSON") {
        return EditPersonServerAction
    } else if (content == "ADD_CONTRACT") {
        return AddNewContractServerAction;
    } else if (content == "EDIT_CONTRACT") {
        return EditContractServerAction;
    } else if (content == "EDIT_PROFITRECORD") {
        return EditProfitRecordServerAction
    } else if (content == "EDIT_REFERRER_PROFIT_RECORD") {
        return EditReferrerProfitRecordServerAction
    }
    return AddNewPersonServerAction;
}
function FindFormContent(content: DialogType) {
    const objectId = useSelector((state: RootState) => state.dialog.id);
    if (content == "ADD_PERSON") {
        return <AddPersonDialogFormContent />;
    } else if (content == "EDIT_PERSON") {
        return <EditPersonDialogFormContent id={objectId} />;
    } else if (content == "ADD_CONTRACT") {
        return <AddContractComponent />
    } else if (content == "EDIT_CONTRACT") {
        return <EditContractComponent contractId={objectId} />
    } else if (content == "EDIT_PROFITRECORD") {
        return <EditProfitRecordDialogFormContent id={objectId} />
    } else if (content == "EDIT_REFERRER_PROFIT_RECORD") {
        return <EditReferrerProfitRecordDialogFormContent id={objectId} />
    }

    return null;
}