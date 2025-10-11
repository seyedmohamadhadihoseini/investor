"use client"

import {
    Dialog,


    DialogContent,
    DialogDescription,


    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog";
import style from "./style.module.css"






export function DialogComponent({ open, setOpen, title, description, children }: {
    open: boolean, setOpen: (x: boolean) => void, title: string,
    
    description: string, children: React.ReactNode,
}) {
    
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <form  >
                <DialogContent className={`sm:max-w-[425px] ${style.container}`} onClick={e => e.stopPropagation()} onToggle={() => {
                    setOpen(false)
                }} onInteractOutside={(e) => {
                    e.preventDefault()
                    setOpen(false)
                }}>
                    <DialogHeader>
                        <DialogTitle className="text-center">{title}</DialogTitle>
                        <DialogDescription className="text-right">
                            {/* {description}. */}
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                    
                </DialogContent>
            </form>
        </Dialog>
    )
}
