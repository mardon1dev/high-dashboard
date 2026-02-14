import type { StudyInfo, WorkInfo } from "../../types/user";

export function parseHobbies(str: string): string[] {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseStudies(str: string): StudyInfo[] {
  return str
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [school, degree, year] = line.split("|").map((s) => s.trim());
      return { school: school || "", degree, year };
    });
}

export function parseWork(str: string): WorkInfo[] {
  return str
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [company, role, years] = line.split("|").map((s) => s.trim());
      return { company: company || "", role, years };
    });
}

export function formatStudiesForInput(studies: { school: string; degree?: string; year?: string }[]): string {
  return (studies ?? [])
    .map((s) => [s.school, s.degree, s.year].filter(Boolean).join(" | "))
    .join("\n");
}

export function formatWorkForInput(work: { company: string; role?: string; years?: string }[]): string {
  return (work ?? [])
    .map((w) => [w.company, w.role, w.years].filter(Boolean).join(" | "))
    .join("\n");
}
