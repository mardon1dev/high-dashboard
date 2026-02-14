import type { User, UserRole, StudyInfo, WorkInfo } from "../types/user";
import { calculateRiskScore } from "./calculateRiskScore";

const ROLES: UserRole[] = ["admin", "user", "moderator", "guest"];
const HOBBIES = [
  "Reading", "Gaming", "Photography", "Cooking", "Hiking", "Music",
  "Travel", "Cycling", "Swimming", "Painting", "Yoga", "Gardening",
];
const SCHOOLS = ["MIT", "Stanford", "Harvard", "Oxford", "Berkeley", "Cambridge"];
const DEGREES = ["BS Computer Science", "MBA", "PhD", "MS Engineering", "BA Economics"];
const COMPANIES = ["TechCorp", "DataFlow", "CloudNine", "InnovateLabs", "NextGen"];
const FIRST_NAMES = [
  // Classic & Common
  "James",
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "Lucas",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Theodore",
  "Harper",
  // Modern & Trending
  "Oliver",
  "Evelyn",
  "Elijah",
  "Abigail",
  "Henry",
  "Emily",
  "Sebastian",
  "Elizabeth",
  "Jackson",
  "Sofia",
  "Aiden",
  "Avery",
  "Samuel",
  "Scarlett",
  "Matthew",
  "Madison",
  // Diverse & International
  "Arjun",
  "Zahra",
  "Kenji",
  "Fatima",
  "Mateo",
  "Ananya",
  "Soren",
  "Ximena",
  "Luka",
  "Mei",
  "Amara",
  "Youssef",
  "Chiara",
  "Dante",
  "Inaya",
  "Rafael",
  "Sunita",
  "Giovanni",
];

const LAST_NAMES = [
  // Common Anglo
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Wilson",
  "Taylor",
  // Hispanic/Latino
  "Garcia",
  "Martinez",
  "Rodriguez",
  "Lopez",
  "Hernandez",
  "Gonzalez",
  "Perez",
  "Sanchez",
  // Asian/South Asian
  "Wang",
  "Li",
  "Zhang",
  "Chen",
  "Liu",
  "Singh",
  "Kumar",
  "Patel",
  "Sharma",
  "Nguyen",
  // European
  "Müller",
  "Schmidt",
  "Lefebvre",
  "Russo",
  "Ferrari",
  "Novak",
  "Jansen",
  "Ivanov",
  // Nature/Occupational
  "Baker",
  "Fisher",
  "Rivera",
  "Brooks",
  "Stone",
  "Hunter",
  "Woods",
  "Gardner",
];

/** Generates a UUID v4 using crypto API */
function generateUUID(): string {
  return crypto.randomUUID();
}

/** Generates a single mock user */
function generateUser(index: number): User {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName =
    LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];
  const name = `${firstName} ${lastName} ${index}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`;
  const age = 18 + (index % 60);
  const role = ROLES[index % ROLES.length];
  const daysAgo = index % 365;
  const lastActive = new Date(
    Date.now() - daysAgo * 24 * 60 * 60 * 1000
  ).toISOString();
  const riskScore = calculateRiskScore({ name: name, age: age });

  // Mock avatar (unique per user)
  const avatar = `https://i.pravatar.cc/150?u=${index}`;

  // Bio
  const bio = `${firstName} is a professional with ${index % 15 + 1} years of experience. Passionate about technology and innovation.`;

  // Hobbies (1-4, deterministic from index)
  const hobbyCount = 1 + (index % 4);
  const hobbies = Array.from(
    { length: hobbyCount },
    (_, i) => HOBBIES[(index + i) % HOBBIES.length]
  );

  // Studies
  const studies: StudyInfo[] = [
    {
      school: SCHOOLS[index % SCHOOLS.length],
      degree: DEGREES[index % DEGREES.length],
      year: `${2010 + (index % 14)}`,
    },
  ];

  // Work
  const work: WorkInfo[] = [
    {
      company: COMPANIES[index % COMPANIES.length],
      role: role === "admin" ? "Director" : role === "moderator" ? "Lead" : "Engineer",
      years: `${index % 10 + 1} years`,
    },
  ];

  return {
    id: generateUUID(),
    name,
    email,
    age,
    role,
    lastActive,
    riskScore,
    avatar,
    bio,
    hobbies,
    studies,
    work,
  };
}

/** Generates a mock dataset of N users with unique IDs */
export function generateMockUsers(count: number): User[] {
  const users: User[] = [];
  const seenIds = new Set<string>();

  for (let i = 0; i < count; i++) {
    const user = generateUser(i);
    if (seenIds.has(user.id)) {
      user.id = generateUUID();
    }
    seenIds.add(user.id);
    users.push(user);
  }

  return users;
}
