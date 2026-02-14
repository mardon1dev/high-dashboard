import { motion } from "framer-motion";
import { Pencil, GraduationCap, Briefcase, Heart } from "lucide-react";
import type { User } from "../../types/user";
import { Button } from "../ui";

interface ExtendedProfileViewProps {
  user: User;
  onEdit: () => void;
}

export function ExtendedProfileView({ user: u, onEdit }: ExtendedProfileViewProps) {
  const hasContent =
    (u.bio && u.bio.length > 0) ||
    (u.hobbies?.length ?? 0) > 0 ||
    (u.studies?.length ?? 0) > 0 ||
    (u.work?.length ?? 0) > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {u.bio && (
        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-slate-500">About</p>
          <p className="text-sm text-slate-700">{u.bio}</p>
        </div>
      )}
      {u.hobbies && u.hobbies.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase text-slate-500">
            <Heart className="h-3 w-3" /> Hobbies
          </p>
          <div className="flex flex-wrap gap-1">
            {u.hobbies.map((h) => (
              <span
                key={h}
                className="rounded-full bg-dashboard-cream px-2 py-0.5 text-xs text-dashboard-dark"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
      {u.studies && u.studies.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase text-slate-500">
            <GraduationCap className="h-3 w-3" /> Education
          </p>
          <ul className="space-y-2">
            {u.studies.map((s, i) => (
              <li key={i} className="text-sm text-slate-700">
                <strong>{s.school}</strong> {s.degree && `— ${s.degree}`}{" "}
                {s.year && `(${s.year})`}
              </li>
            ))}
          </ul>
        </div>
      )}
      {u.work && u.work.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase text-slate-500">
            <Briefcase className="h-3 w-3" /> Work
          </p>
          <ul className="space-y-2">
            {u.work.map((w, i) => (
              <li key={i} className="text-sm text-slate-700">
                <strong>{w.company}</strong> {w.role && `— ${w.role}`}{" "}
                {w.years && `(${w.years})`}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!hasContent && <p className="text-sm text-slate-500">No extended info yet.</p>}
      <Button variant="outline" className="w-full" onClick={onEdit}>
        <Pencil className="h-4 w-4" /> {hasContent ? "Edit" : "Add"} Extended Info
      </Button>
    </motion.div>
  );
}
