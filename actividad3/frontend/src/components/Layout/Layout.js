import { useContext } from 'react';
import NavBar from '../NavBar/NavBar';
import { Navigate, useLocation } from 'react-router';
import AuthContext from '../../context/auth-context';

const Layout = ({ component: Component }) => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  if (Object.entries(authCtx.currentUser).length !== 0) {
    return (
      <div>
        <NavBar />
        <main>
          <Component />
        </main>
      </div>
    );
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};
export default Layout;
