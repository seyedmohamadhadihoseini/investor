import style from "./style.module.css"


export default function AddUserDialogFormContent() {

    return (
        <>
            <div>
                <label>نام و نام خانوادگی</label>
                <input type="text" required name="full-name" />
            </div>
            <div>
                <label>کد ملی</label>
                <input type="text" required name="national-id" />
            </div>
            <div>
                <label>شماره تماس</label>
                <input type="text" name="phone" />
            </div>
            <div>
                <label>شماره حساب</label>
                <input type="text" name="bank-account" />
            </div>
            <div>
                <label>کد ملی معرف</label>
                <input type="text" name="referrer-national-id" />
            </div>

        </>
    );
}