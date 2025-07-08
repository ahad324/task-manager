import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        aria-live="polite"
      >
        <ClipLoader
          color="#2563EB"
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
