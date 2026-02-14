import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Input, Button } from "../ui";

interface CoreUserFormProps {
  formData: { name: string; email: string; age: number; riskScore: number };
  onChange: (updates: Partial<{ name: string; email: string; age: number; riskScore: number }>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  error?: string | null;
  isSaving?: boolean;
  riskScoreAddon?: React.ReactNode;
}

export function CoreUserForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  error,
  isSaving = false,
  riskScoreAddon,
}: CoreUserFormProps) {
  return (
    <motion.form
      key="edit-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}
      <Input
        label="Full Name"
        autoFocus
        value={formData.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => onChange({ email: e.target.value })}
      />
      <Input
        label="Age"
        type="number"
        value={formData.age}
        onChange={(e) => onChange({ age: Number(e.target.value) })}
      />
      <Input
        label="Risk Score (0–100)"
        type="number"
        min={0}
        max={100}
        value={formData.riskScore}
        onChange={(e) => onChange({ riskScore: Number(e.target.value) || 0 })}
        addon={riskScoreAddon}
      />
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSaving} loadingText="Saving...">
          Save Changes
        </Button>
      </div>
    </motion.form>
  );
}
