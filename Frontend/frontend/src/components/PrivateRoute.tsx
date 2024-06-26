import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ROLE } from "../util/roles";
import { AccessDenied } from "../error/AccessDenied";
 
const PrivateRoute = ({ 
  children,
  role
 }: { 
  children: JSX.Element
  role : ROLE
 }) => {
  let location = useLocation();
 
  const { user, isLoggedIn, loading } = useAppSelector((state) => state.auth);
 
  if (loading === 'pending') {
    return <p>Checking authenticaton..</p>;
  }
 
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const userHasRequiredRole = user && user.authorities.includes(role.toString()) ? true : false
 
  if (isLoggedIn && !userHasRequiredRole){
    return <AccessDenied requiredRole={role}/>
  }

  return children;
};
 
export default PrivateRoute;