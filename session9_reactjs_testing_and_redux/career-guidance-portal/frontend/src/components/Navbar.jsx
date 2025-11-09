import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import NotificationBell from "./NotificationBell";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
      <div>
        <span className="font-bold">Career Guidance Portal</span>
        {user && <span className="ml-4 text-sm opacity-80">({user.role.toUpperCase()})</span>}
      </div>
      <div className="flex items-center gap-3">
        <NotificationBell />
        <DarkModeToggle />
        {user ? (
          <button onClick={() => dispatch(logout())} className="bg-gray-700 px-2 py-1 rounded">Logout</button>
        ) : (
          <span>Login</span>
        )}
      </div>
    </nav>
  );
}
