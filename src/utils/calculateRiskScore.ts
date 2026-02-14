// Pass the user as an argument!
export function calculateRiskScore(user: { name: string; age: number }): number {
  let hash = 0;

  // Use the user's ID string as the "salt" for the hash
  const seed = user.name;

  for (let i = 0; i < 50; i++) {
    // Outer loop for "weight"
    for (let j = 0; j < seed.length; j++) {
      const char = seed.charCodeAt(j);
      // The bitwise math now depends on the specific user's ID
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
  }

  // Combine with a variable like age to ensure different scores
  // even if IDs were somehow similar
  const finalScore = Math.abs(hash + user.age) % 100;

  return finalScore;
}
