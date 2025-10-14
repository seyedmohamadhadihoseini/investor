"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import {  MoreHorizontal } from "lucide-react"





export type HeaderType = {
    [x: string]: string | number | undefined,
    _id: string,
    date?: string
}
export function columns(headers: { title: string, value: string }[],
    isShowEditButton: boolean, isShowRemoveButton: boolean, isShowProfile: boolean,
    removeFunction: (id: string) => void, editFunction: (id: string) => void, goProfileFunction?: (id: string) => void,
    isContainsDate?: boolean, 
): ColumnDef<HeaderType>[] {

    let ingoresList = ["_id", "url", "date"]
    

    const TableHeaders: ColumnDef<HeaderType>[] = headers.filter(item => !ingoresList.includes(item.value)).map(item => ({
        accessorKey: item.value,
        header: () => {
            return <div style={{ textAlign: "center" }}>{item.title}</div>
        },
        cell({ row }) {
            const data = row.original;
            return <div style={{ textAlign: "center" }}>
                {data[item.value]?.toString()}
            </div>
        }
    }))
    if (isContainsDate) {
        TableHeaders.push({
            id: "date",
            accessorKey: "date",
            filterFn: (row, columnId, filterValue: [Date, Date]) => {
                const start_date = new Date(filterValue[0]).getTime()
                const end_date = new Date(filterValue[1]).getTime()
                const value = new Date(row.getValue(columnId) as Date).getTime();
                return value >= start_date && value <= end_date
            },
            header: () => {
                return <div className="text-center">تاریخ</div>
            },
            cell: ({ row }) => {
                const data = row.original.date;
                return <div style={{ textAlign: "center" }}>
                    {new Date(data || "").toLocaleDateString("fa-ir")}
                </div>
            }
        })
    }
    if (isShowEditButton || isShowRemoveButton) {
        TableHeaders.push({
            id: "actions",
            cell: ({ row }) => {

                const id = row.original._id.toString();
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuLabel>
                                <p className="text-center">
                                    عملیات ها
                                </p>
                            </DropdownMenuLabel>
                            {isShowRemoveButton && <DropdownMenuItem >
                                <p className="w-[100%] text-center cursor-pointer" onClick={() => {
                                    removeFunction(id)
                                }}>
                                    حذف
                                </p>
                            </DropdownMenuItem>}
                            {isShowEditButton && <DropdownMenuItem >
                                <p className="w-[100%] text-center cursor-pointer" onClick={() => {
                                    editFunction(id)
                                }}>
                                    ویرایش
                                </p>
                            </DropdownMenuItem>}
                            {isShowProfile && <DropdownMenuItem >
                                <p className="w-[100%] text-center cursor-pointer" onClick={() => {
                                    if (goProfileFunction) {
                                        goProfileFunction(id)
                                    }
                                }}>
                                    مشاهده پروفایل
                                </p>
                            </DropdownMenuItem>}



                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        })
    }
    return TableHeaders;
}