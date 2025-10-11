"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import style from "./style.module.css"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataTableState } from "./redux/store"
import { changeSelectedId } from "./redux/features/row/rowSlice"
import GetValueFromObject from "@/services/getvalue"
import MyDatePicker from "../DatePicker"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filters: { title: string, columnId: string }[],
  dateFilter?: {
    start_date: Date,
    end_date: Date,
  },
  onRowClick: (id: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  dateFilter,
  onRowClick
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const selectedRowId = useSelector((state: DataTableState) => state.row.selectedId);
  const dispatch = useDispatch()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })
  const [start_date, setStartDate] = useState(dateFilter?.start_date);
  const [end_date, setEndDate] = useState(dateFilter?.end_date);
  return (
    <div>
      {dateFilter && <div className={style["date-filter"]}>

        <div className={style["date-container"]}>
          <div>
            <label>تاریخ شروع</label>
            <MyDatePicker name="date-picker" state={start_date} setState={setStartDate} onChangeHandler={(date) => {
              setStartDate(date)
              table.getColumn("date")?.setFilterValue([date, end_date]);
            }} />
          </div>
          <div>
            <label >تاریخ پایان</label>
            <MyDatePicker name="date-picker2" state={end_date} setState={setEndDate} onChangeHandler={(date) => {
              setEndDate(date)
              table.getColumn("date")?.setFilterValue([start_date, date]);

            }} />
          </div>
        </div>
      </div>}
      <hr />
      <div className="flex items-center py-4 flex-wrap gap-5">
        {filters.map(filter => (
          <Input
            key={filter.columnId}
            placeholder={`جستجو با ${filter.title} ...`}
            value={(table.getColumn(filter.columnId)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter.columnId)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        ))}

      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => {
                const data = row.original;
                const id = GetValueFromObject(data, "_id")
                return <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`cursor-pointer ${selectedRowId == id ? style["active-row"] : ""}`}
                  onClick={() => {
                    onRowClick(id)
                    dispatch(changeSelectedId(id))
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          قبلی
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          بعدی
        </Button>
      </div>
    </div>
  )
}