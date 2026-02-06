import { useAuth } from "../../../app/providers/AuthProvider";

export default function Dashboard() {
  const { logout, user } = useAuth();
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
