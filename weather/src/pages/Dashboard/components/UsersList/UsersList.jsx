import "./UsersList.css";

export default function UsersList({ users, deleteUser }) {
  return (
    <>
      <div className="users-mobile">
        {users.map((u) => (
          <div key={u.id} className="user-card">
            <p className="label">ID</p>
            <p className="value">{u.id}</p>

            <p className="label">Email</p>
            <p className="value">{u.email}</p>

            <button
              className="danger-btn"
              onClick={() => deleteUser(u.id, u.auth_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="danger-btn small"
                    onClick={() => deleteUser(u.id, u.auth_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
