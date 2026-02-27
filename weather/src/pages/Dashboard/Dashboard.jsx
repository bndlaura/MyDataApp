import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useUsers } from "../../hooks/useUsers";
import "./Dashboard.css";
import Header from "./components/Header/Header";
import SearchSort from "./components/SearchSort/SearchSort";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import UsersList from "./components/UsersList/UsersList";
import Pagination from "./components/Pagination/Pagination";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {
    users,
    loading,
    sortDirection,
    setSortField,
    setSortDirection,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    total,
    deleteUser,
    addUser,
  } = useUsers();

  return (
    <div className="dashboard-wrapper">
      <Header user={user} onLogout={() => dispatch(logoutUser())} />

      <div className="top-section">
        <SearchSort
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortDirection={sortDirection}
          setSortField={setSortField}
          setSortDirection={setSortDirection}
        />
        <AddUserForm addUser={addUser} />
      </div>

      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : (
        <>
          <UsersList users={users} deleteUser={deleteUser} />
          <Pagination page={page} setPage={setPage} total={total} />
        </>
      )}
    </div>
  );
}
