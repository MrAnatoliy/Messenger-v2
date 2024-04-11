import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
 
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
 
  const { isLoggedIn, loading } = useAppSelector((state) => state.auth);
 
  if (loading === 'pending') {
    return <p>Checking authenticaton..</p>;
  }
 
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
 
  return children;
};
 
export default PrivateRoute;