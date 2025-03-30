import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'

interface DeleteLeaveAbsenceDialogProps {
    leaveAbsenceId: string;
    onDelete: () => void;
}

const DeleteLeaveAbsenceDialog : React.FC<DeleteLeaveAbsenceDialogProps> = ({ leaveAbsenceId, onDelete }) => {
   
    if (!leaveAbsenceId) {
        console.error("Invalid Leave / Absence ID");
        return null;
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-2 mr-2 bg-red-500 hover:bg-red-600">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this employee's leave / absence? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default DeleteLeaveAbsenceDialog