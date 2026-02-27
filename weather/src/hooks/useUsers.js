import { useEffect, useState, useCallback } from "react";
import { supabase } from "../api/supabaseClient";
import { sortUsers } from "../utils/sortUsers";
import { filterUsers } from "../utils/filterUsers";
import { paginate } from "../utils/paginate";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 10;

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    // Fetch all users from the "users" table
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (!error) setUsers(data || []);

    setLoading(false);
  }, []);

  async function deleteUser(id, auth_id) {
    // Delete user from "users" table
    await supabase.from("users").delete().eq("id", id);

    // If the deleted user is the currently logged-in user, log him out
    if (currentUser?.id === auth_id) {
      await supabase.auth.signOut();
      dispatch(logoutUser());
      return;
    }

    // Refresh the user list after deletion
    fetchUsers();
  }

  async function addUser(email, password) { 
    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });

    // If sign up is successful, add the user to the "users" table and refresh the list
    if (!error && data?.user) {
      await supabase.from("users").insert({
        auth_id: data.user.id,
        email: data.user.email,
      });
      fetchUsers();
    }
  }

 // Load users on initial hook usage
  useEffect(() => {
    // Use a flag to prevent state updates if the component unmounts before the fetch completes
    let mounted = true;

    async function load() {
      if (!mounted) return;
      await fetchUsers();
    }
  
    load();

    return () => {
      mounted = false;
    };
  }, [fetchUsers]);

  // Re-apply filtering, sorting, and pagination whenever related state changes
  useEffect(() => {}, [searchQuery, sortField, sortDirection]);

  const filtered = filterUsers(users, searchQuery);
  const sorted = sortUsers(filtered, sortField, sortDirection);
  const paginated = paginate(sorted, page, perPage);

  return {
    users: paginated,
    loading,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    total: filtered.length,
    deleteUser,
    addUser,
  };
}
