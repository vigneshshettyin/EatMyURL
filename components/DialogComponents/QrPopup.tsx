import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { QrCodeIcon } from "lucide-react"

export function QrPopup() {
  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
        <QrCodeIcon className="ml-2 h-4 w-4 cursor-pointer hover:scale-110"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Get redirected to the current link by scanning the qr code
        </DialogDescription>
        <div className="flex justify-center">
          <img className="rounded-xl w-[248px] h-[248px]" src="https://s3.amazonaws.com/images.seroundtable.com/qrfree-kaywa-1379333209.png" alt="" />
        </div>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}
