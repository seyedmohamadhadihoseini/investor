"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HeaderType = {
    [x: string]: string
}

export function columns(headers: { title: string, value: string }[]): ColumnDef<HeaderType>[] {
    const TableHeaders: ColumnDef<HeaderType>[] = headers.map(item => ({
        accessorKey: item.value,
        header: () => {
            return <div style={{ textAlign: "center" }}>{item.title}</div>
        },
        cell({ row }) {
            const data = row.original;
            return <div style={{ textAlign: "center" }}>
                {data[item.value]}
            </div>
        }
    }))
    TableHeaders.push({
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

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
                        <DropdownMenuItem >
                            <p className="w-[100%] text-center cursor-pointer" onClick={() => {
                                
                                
                            }}>
                                حذف
                            </p>
                        </DropdownMenuItem>
                        <DropdownMenuItem >
                            <p className="w-[100%] text-center cursor-pointer" onClick={() => {
                                
                                // router.push(`/users/edit/${id}`);
                            }}>
                                ویرایش
                            </p>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <p className="w-[100%] text-center cursor-pointer" onClick={() => {
                                // router.push(`/users/${id}/dashboard`);
                            }}>
                                مشاهده پروفایل
                            </p>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    })
    return TableHeaders;
}