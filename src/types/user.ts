/**
 * User entity with all required fields for the dashboard.
 */

export interface StudyInfo {
  school: string;
  degree?: string;
  year?: string;
}

export interface WorkInfo {
  company: string;
  role?: string;
  years?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: UserRole;
  lastActive: string; // ISO date string
  riskScore: number;
  // Extended info (shown in Read more panel)
  avatar?: string;
  bio?: string;
  hobbies?: string[];
  studies?: StudyInfo[];
  work?: WorkInfo[];
}

export type UserRole = "admin" | "user" | "moderator" | "guest";

export type SortField = "name" | "age" | "lastActive" | "riskScore";
export type SortDirection = "asc" | "desc";
