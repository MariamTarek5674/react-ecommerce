import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    const {isAuthanticated} = useSelector((state)=>state.auth)

    if (isAuthanticated) {
        return props.children;
      } else {
        return <Navigate to="/login" />;
      }
}
