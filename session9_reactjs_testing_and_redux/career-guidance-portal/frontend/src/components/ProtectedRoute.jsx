import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children, roles=[] }){
  const { token, user } = useSelector(state=>state.auth);
  if(!token) return <Navigate to="/login" replace />;
  if(roles.length && !roles.includes(user?.role)) return <Navigate to="/forbidden" replace />;
  return children;
}
