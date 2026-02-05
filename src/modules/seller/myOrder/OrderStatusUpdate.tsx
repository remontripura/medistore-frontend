"use client";

import { useState } from "react";
import { deleteMedicine } from "@/actions/medicineAction";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function DeleteMedicineDialog({
  deleteId,
}: {
  deleteId: string | undefined;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteMedicine(id);
      toast.success("Medicine deleted successfully!", {
        position: "top-center",
      });
    } catch (err) {
      toast.error("Failed to delete medicine.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialogContent size="sm">
      <AlertDialogHeader>
        <AlertDialogTitle>
          Are you sure you want to delete this medicine?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="cursor-pointer">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handleDelete(deleteId!)}
          className={`bg-red-500 hover:bg-red-700 cursor-pointer ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {loading ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
