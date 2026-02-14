import { motion } from "framer-motion";
import { Button } from "../ui";

export interface ExtendedFormData {
  bio: string;
  hobbiesStr: string;
  studiesStr: string;
  workStr: string;
}

interface ExtendedFormFieldsProps {
  formData: ExtendedFormData;
  onChange: (updates: Partial<ExtendedFormData>) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
  showActions?: boolean;
}

export function ExtendedFormFields({
  formData,
  onChange,
  onSave,
  onCancel,
  isSaving = false,
  showActions = true,
}: ExtendedFormFieldsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="A short bio..."
          className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:ring-2 focus:ring-dashboard-green"
          rows={6}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Hobbies (comma-separated)
        </label>
        <input
          className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:ring-2 focus:ring-dashboard-green"
          value={formData.hobbiesStr}
          onChange={(e) => onChange({ hobbiesStr: e.target.value })}
          placeholder="Reading, Gaming, Cooking"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Studies (one per line: School | Degree | Year)
        </label>
        <textarea
          className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:ring-2 focus:ring-dashboard-green"
          rows={2}
          value={formData.studiesStr}
          onChange={(e) => onChange({ studiesStr: e.target.value })}
          placeholder="MIT | BS CS | 2015"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Work (one per line: Company | Role | Years)
        </label>
        <textarea
          className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:ring-2 focus:ring-dashboard-green"
          rows={2}
          value={formData.workStr}
          onChange={(e) => onChange({ workStr: e.target.value })}
          placeholder="TechCorp | Engineer | 3 years"
        />
      </div>
      {showActions && onSave && onCancel && (
        <div className="flex gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSave}
            isLoading={isSaving}
            loadingText="Saving..."
          >
            Save
          </Button>
        </div>
      )}
    </motion.div>
  );
}
