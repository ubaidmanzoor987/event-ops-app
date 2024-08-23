import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { PopUpDeleteIcon } from '@/assets/svgs';

interface IDeletePocketModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickConfirm: () => void;
  onClickCancel: () => void;
}

const DeletePocketModal = React.forwardRef<HTMLDivElement, IDeletePocketModal>(
  ({ open, setOpen, onClickCancel, onClickConfirm }, ref) => {
    return (
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-white flex items-center justify-center flex-col"
          ref={ref}
        >
          {/* DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. */}
          <DialogHeader>
            <DialogTitle>&nbsp;</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {/* <PopUpDeleteIcon className="w-28 h-28 text-transparent" /> */}
          </div>
          <p className="mt-3 text-xl font-semibold tracking-normal leading-8 text-center uppercase text-headingColor">
            Are you sure you want to delete this pocket?
          </p>
          <div className="w-full flex items-center justify-between gap-x-2">
            <Button
              className="py-7 w-full bg-gray-100 text-gray-400 hover:bg-gray-100"
              onClick={onClickCancel}
            >
              <span className="font-medium text-base">Cancel</span>
            </Button>
            <Button className="py-7 w-full" onClick={onClickConfirm}>
              <span className="font-medium text-base">Continue</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

DeletePocketModal.displayName = 'DeletePocketModal';

export default DeletePocketModal;
