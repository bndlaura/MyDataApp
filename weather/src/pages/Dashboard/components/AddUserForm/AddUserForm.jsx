import "./AddUserForm.css";

export default function AddUserForm({ addUser }) {
  return (
    <form
      className="add-user-form"
      onSubmit={(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        addUser(email, password);
        e.target.reset();
      }}
    >
      <input
        name="email"
        type="email"
        className="input"
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        className="input"
        placeholder="Password"
        required
        minLength={8}
      />
      <button type="submit" className="add-btn">
        Add User
      </button>
    </form>
  );
}
