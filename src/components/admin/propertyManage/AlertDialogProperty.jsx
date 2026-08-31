"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteProperty } from "@/services/action/property";

const AlertDialogProperty = ({ property, onDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!property?._id) {
      toast.error("Property ID not found");
      return;
    }

    try {
      setIsDeleting(true);

      const result = await deleteProperty(property._id);

      if (result?.success) {
        toast.success("Property deleted successfully!", {
          description: `${property.title} has been removed from your properties.`,
        });

        onDeleted?.(property._id);
      } else {
        toast.error("Failed to delete property", {
          description:
            result?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);

      toast.error("Failed to delete property", {
        description: "Something went wrong while deleting the property.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        className="p-2 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors bg-transparent"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* Confirmation Dialog */}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[440px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Delete project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <div className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Are you sure you want to permanently delete this project? This
                  action cannot be undone.
                </p>

                {/* Property Info */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                  <div className="flex items-start gap-3">
                    {/* Cover Image */}
                    {property.coverImage && (
                      <img
                        src={property.coverImage}
                        alt={property.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                    )}

                    <div className="min-w-0 space-y-1">
                      <h3 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                        {property.title || "Untitled Property"}
                      </h3>

                      {property.locationName && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {property.locationName}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        {property.propertyType && (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            {property.propertyType}
                          </span>
                        )}

                        {property.status && (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                            {property.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-rose-500 font-medium">
                  ⚠️ All property information, images, and related data will be
                  permanently deleted.
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              {/* Cancel */}
              <Button slot="close" variant="tertiary" disabled={isDeleting}>
                Cancel
              </Button>

              {/* Confirm Delete */}
              <Button
                slot="close"
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default AlertDialogProperty;
