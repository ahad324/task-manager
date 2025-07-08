import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';

function Header() {
  const { user, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Task Manager Logo" className="h-8 w-8" />
          <h1 className="text-xl font-semibold tracking-tight">Task Manager</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm font-medium">
                Welcome, {user.username}
              </span>
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-blue-200 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium hover:text-blue-200 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
