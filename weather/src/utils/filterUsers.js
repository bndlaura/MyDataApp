// Utility function to filter users based on search query
export function filterUsers(users, query) {
  if (!query) return users;
  return users.filter((u) =>
    u.email.toLowerCase().includes(query.toLowerCase())
  );
}
