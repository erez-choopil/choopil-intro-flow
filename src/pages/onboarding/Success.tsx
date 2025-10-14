import { useNavigate } from "react-router-dom";
import { SuccessDialog } from "@/components/SuccessDialog";
import { useState, useEffect } from "react";


export default function Success() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show dialog on mount
    setOpen(true);
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Navigate to dashboard when dialog closes
      navigate("/dashboard");
    }
  };

  return (
    <SuccessDialog open={open} onOpenChange={handleOpenChange} />
  );
}
