import { X } from "lucide-react";
import { Button } from "../ui";

interface ModalPanelProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  accentColor?: "green" | "orange";
}

export function ModalPanel({ title: _title, onClose: _onClose, children, accentColor = "green" }: ModalPanelProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        className={`h-2 w-full ${accentColor === "orange" ? "bg-dashboard-orange" : "bg-dashboard-green"}`}
      />
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
}

interface SidePanelProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export function SidePanel({ title, onClose, children }: SidePanelProps) {
  return (
    <div className="flex max-w-90 w-full shrink-0 flex-col border-l border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {onClose && (
          <Button type="button" variant="icon" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4 text-slate-500" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
