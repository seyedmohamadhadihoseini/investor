"use client"
import { columns, HeaderType } from "./columns"
import { DataTable } from "./data-table"

import style from "./style.module.css"

export default  function DataListComponent({data,headers}:{data:HeaderType[],headers:{title:string,value:string}[]}) {
    

    return (
        <div className={`${style.container} container mx-auto py-10 w-[95%]`}>
            <DataTable columns={columns(headers)} data={data} />
        </div>
    )
}