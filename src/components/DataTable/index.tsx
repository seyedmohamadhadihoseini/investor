"use client"


import AddButtonDataTable from "./Add"
import { columns, HeaderType } from "./columns"
import { DataTable } from "./data-table"
import ReduxDatatabeProvider from "./redux/store"

import style from "./style.module.css"

export default function DataListComponent(
    { data, headers, filters, isShowAddButton, isShowEditButton, isShowRemoveButton, isShowProfile,
        dateFilter,ignoreColumnsToShow,
        goProfileFunction, addFunction, removeFunction, editFunction, onRowClick }:
        {
            data: HeaderType[], headers: { title: string, value: string }[],
            filters: { title: string, columnId: string }[],
            isShowAddButton: boolean, isShowEditButton: boolean, isShowRemoveButton: boolean, isShowProfile: boolean,
            dateFilter?: {
                start_date: Date,
                end_date: Date,
            },
            ignoreColumnsToShow?:string[],
            addFunction: () => void, removeFunction: (id: string) => void, editFunction: (id: string) => void, goProfileFunction?: (id: string) => void
            onRowClick: (id: string) => void,

        }) {


    return (
        <ReduxDatatabeProvider>
            <div className={`${style.container} container mx-auto py-10 w-[95%]`}>
                {isShowAddButton && <AddButtonDataTable addFunction={addFunction} />}
                <DataTable columns={columns(headers, isShowEditButton, isShowRemoveButton, isShowProfile
                , removeFunction, editFunction, goProfileFunction,dateFilter?true:false)}
                    filters={filters}
                    data={data}
                    dateFilter={dateFilter}
                    onRowClick={onRowClick}
                    ignoreColumnsToShow={ignoreColumnsToShow}
                />
            </div>
        </ReduxDatatabeProvider>
    )
}