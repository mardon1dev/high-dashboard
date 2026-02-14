import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Pencil, ChevronRight } from "lucide-react";
import type { User } from "../types/user";
import { useUserStore } from "../store/useUserStore";
import { Button } from "./ui";
import {
  DetailRow,
  ExtendedFormFields,
  ExtendedProfileView,
  CoreUserForm,
  SidePanel,
  parseHobbies,
  parseStudies,
  parseWork,
  formatStudiesForInput,
  formatWorkForInput,
} from "./user-modal";

const FAILURE_RATE = 0.1;
const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=default";

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
  onSaveFailure?: (message: string) => void;
  onSaveSuccess?: () => void;
}

export function UserDetailsModal({
  user,
  onClose,
  onSaveFailure,
  onSaveSuccess,
}: UserDetailsModalProps) {
  const { users, updateUser } = useUserStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const currentUser = users.find((u) => u.id === user?.id) || user;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    riskScore: 0,
    bio: "",
    hobbiesStr: "",
    studiesStr: "",
    workStr: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isExtendedEditMode, setIsExtendedEditMode] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        age: currentUser.age,
        riskScore: currentUser.riskScore,
        bio: currentUser.bio ?? "",
        hobbiesStr: (currentUser.hobbies ?? []).join(", "),
        studiesStr: formatStudiesForInput(currentUser.studies ?? []),
        workStr: formatWorkForInput(currentUser.work ?? []),
      });
      setError(null);
    }
  }, [currentUser, isEditMode, isExtendedEditMode]);

  const handleSaveCore = useCallback(() => {
    if (!currentUser) return;
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    const snapshot = { ...currentUser };
    setIsSaving(true);
    setError(null);
    updateUser(currentUser.id, {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      riskScore: formData.riskScore,
    });
    setTimeout(() => {
      const shouldFail = Math.random() < FAILURE_RATE;
      if (shouldFail) {
        updateUser(currentUser.id, snapshot);
        onSaveFailure?.("Server synchronization failed. Reverting changes.");
      } else {
        setIsEditMode(false);
        onSaveSuccess?.();
      }
      setIsSaving(false);
    }, 800);
  }, [currentUser, formData, updateUser, onSaveFailure, onSaveSuccess]);

  const handleSaveExtended = useCallback(() => {
    if (!currentUser) return;
    const hobbies = parseHobbies(formData.hobbiesStr);
    const studies = parseStudies(formData.studiesStr);
    const work = parseWork(formData.workStr);
    const snapshot = { ...currentUser };
    setIsSaving(true);
    setError(null);
    updateUser(currentUser.id, {
      bio: formData.bio || undefined,
      hobbies: hobbies.length ? hobbies : undefined,
      studies: studies.length ? studies : undefined,
      work: work.length ? work : undefined,
    });
    setTimeout(() => {
      const shouldFail = Math.random() < FAILURE_RATE;
      if (shouldFail) {
        updateUser(currentUser.id, snapshot);
        onSaveFailure?.("Server synchronization failed. Reverting changes.");
      } else {
        setIsExtendedEditMode(false);
        onSaveSuccess?.();
      }
      setIsSaving(false);
    }, 800);
  }, [currentUser, formData, updateUser, onSaveFailure, onSaveSuccess]);

  const hasExtendedInfo =
    (currentUser?.bio && currentUser.bio.length > 0) ||
    (currentUser?.hobbies && currentUser.hobbies.length > 0) ||
    (currentUser?.studies && currentUser.studies.length > 0) ||
    (currentUser?.work && currentUser.work.length > 0);

  if (!currentUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex h-[85vh] max-h-175 w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative flex flex-1 flex-col overflow-hidden"
        >
          <div className="h-2 w-full bg-dashboard-green" />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={currentUser.avatar || DEFAULT_AVATAR}
                  alt={currentUser.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-dashboard-cream"
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{currentUser.name}</h2>
                  <p className="text-sm text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <Button variant="icon" onClick={onClose}>
                <X className="h-5 w-5 text-slate-500" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {isEditMode ? (
                <CoreUserForm
                  formData={formData}
                  onChange={(u) => setFormData((p) => ({ ...p, ...u }))}
                  onSubmit={handleSaveCore}
                  onCancel={() => setIsEditMode(false)}
                  error={error}
                  isSaving={isSaving}
                />
              ) : (
                <motion.div
                  key="view-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <DetailRow label="Role" value={currentUser.role} isBadge />
                  <DetailRow label="Age" value={String(currentUser.age)} />
                  <DetailRow label="Risk Score" value={String(currentUser.riskScore)} isRiskScore />
                  <DetailRow
                    label="Last Active"
                    value={new Date(currentUser.lastActive).toLocaleDateString()}
                  />
                  <div className="flex flex-wrap justify-end gap-3 pt-4">
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsEditMode(true)}>
                      <Pencil className="h-4 w-4" /> Edit Profile
                    </Button>
                    {(hasExtendedInfo || showReadMore) && (
                      <Button variant="secondary" className="w-full sm:w-auto" onClick={() => setShowReadMore(true)}>
                        Read more <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    {!hasExtendedInfo && !showReadMore && (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowReadMore(true);
                          setIsExtendedEditMode(true);
                        }}
                      >
                        Add more info <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {showReadMore && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex shrink-0"
            >
              <SidePanel
                title="Extended Profile"
                onClose={() => setShowReadMore(false)}
              >
                <AnimatePresence mode="wait">
                  {isExtendedEditMode ? (
                    <ExtendedFormFields
                      key="extended-edit"
                      formData={formData}
                      onChange={(u) => setFormData((p) => ({ ...p, ...u }))}
                      onSave={handleSaveExtended}
                      onCancel={() => setIsExtendedEditMode(false)}
                      isSaving={isSaving}
                      showActions={true}
                    />
                  ) : (
                    <ExtendedProfileView user={currentUser} onEdit={() => setIsExtendedEditMode(true)} />
                  )}
                </AnimatePresence>
              </SidePanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
