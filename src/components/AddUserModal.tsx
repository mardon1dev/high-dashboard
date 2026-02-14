import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import type { User, UserRole } from "../types/user";
import { useUserStore } from "../store/useUserStore";
import { Input, Button, Select } from "./ui";
import {
  ExtendedFormFields,
  SidePanel,
  parseHobbies,
  parseStudies,
  parseWork,
} from "./user-modal";

const ROLES: UserRole[] = ["admin", "user", "moderator", "guest"];
const FAILURE_RATE = 0.1;

interface AddUserModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
}

export function AddUserModal({
  onClose,
  onSuccess,
  onFailure,
}: AddUserModalProps) {
  const { addUser, removeUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 25,
    role: "user" as UserRole,
    riskScore: 50,
    bio: "",
    hobbiesStr: "",
    studiesStr: "",
    workStr: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!formData.name.trim()) {
        setError("Name is required.");
        return;
      }
      if (!formData.email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
      }
      if (formData.age < 1 || formData.age > 120) {
        setError("Age must be between 1 and 120.");
        return;
      }
      if (formData.riskScore < 0 || formData.riskScore > 100) {
        setError("Risk score must be between 0 and 100.");
        return;
      }

      const hobbies = parseHobbies(formData.hobbiesStr);
      const studies = parseStudies(formData.studiesStr);
      const work = parseWork(formData.workStr);

      const newUser: Omit<User, "id"> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: formData.age,
        role: formData.role,
        lastActive: new Date().toISOString(),
        riskScore: formData.riskScore,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        ...(formData.bio && { bio: formData.bio }),
        ...(hobbies.length > 0 && { hobbies }),
        ...(studies.length > 0 && { studies }),
        ...(work.length > 0 && { work }),
      };

      setIsSaving(true);
      const id = addUser(newUser);
      setTimeout(() => {
        const shouldFail = Math.random() < FAILURE_RATE;
        if (shouldFail) {
          removeUser(id);
          onFailure?.("Failed to add user. Please try again.");
        } else {
          onSuccess?.();
          onClose();
        }
        setIsSaving(false);
      }, 800);
    },
    [formData, addUser, removeUser, onSuccess, onFailure, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-user-title"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[85vh] max-h-175 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="h-2 w-full bg-dashboard-orange" />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="add-user-title"
                className="text-xl font-bold text-slate-800"
              >
                Add New User
              </h2>
              <Button
                type="button"
                variant="icon"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-5 w-5 text-slate-500" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <Input
                label="Full Name"
                type="text"
                autoFocus
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="John Doe"
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="john@example.com"
              />
              <Input
                label="Age"
                type="number"
                min={1}
                max={120}
                value={formData.age}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    age: Number(e.target.value) || 0,
                  }))
                }
              />
              <Input
                label="Risk Score (0–100)"
                type="number"
                min={0}
                max={100}
                value={formData.riskScore}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    riskScore: Number(e.target.value) || 0,
                  }))
                }
              />
              <Select
                label="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    role: e.target.value as UserRole,
                  }))
                }
                options={ROLES.map((r) => ({
                  value: r,
                  label: r.charAt(0).toUpperCase() + r.slice(1),
                }))}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSaving}
                  loadingText="Adding..."
                >
                  Add User
                </Button>
              </div>
            </form>
          </div>
        </div>

        <SidePanel title="Add more details">
          <ExtendedFormFields
            formData={formData}
            onChange={(u) => setFormData((p) => ({ ...p, ...u }))}
            showActions={false}
          />
        </SidePanel>
      </motion.div>
    </div>
  );
}
