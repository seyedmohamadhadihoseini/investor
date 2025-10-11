"use client"
import DatePicker from "react-multi-date-picker"

import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import style from "./style.module.css";
export default function MyDatePicker({ name, state, setState, onChangeHandler }: {
    name: string, state: Date | undefined, setState: (x: Date) => void, onChangeHandler?: (date: Date) => void
}) {
    return <>
        <input type="text" name={name} className="hidden" readOnly value={state?.toISOString()} />
        <DatePicker value={state} onChange={e => {
            if (e) {
                setState(e.toDate())
                if (onChangeHandler) {
                    onChangeHandler(e.toDate())
                }
            }
        }} calendar={persian} locale={persian_fa} calendarPosition="bottom-right"
            inputClass={style["rmdp-input"]} containerClassName={style["rmdp-input-container"]}
        >
            <button
                className={style["picker-today-button"]}
                onClick={() => setState(new Date())}
            >
                امروز
            </button>
        </DatePicker>

    </>
}