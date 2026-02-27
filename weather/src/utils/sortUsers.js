// Utility function to sort users by specified field and direction
export function sortUsers(users, field, direction) {
  const dir = direction === "asc" ? 1 : -1;

  return [...users].sort((a, b) => {
    if (field === "id") {
      return (a.id - b.id) * dir; 
    }

    if (field === "email") {
      return a.email.localeCompare(b.email) * dir;
    }

    return 0;
  });
}
