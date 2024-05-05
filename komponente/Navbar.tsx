



import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.tsx';
import '../App.css'; 

function Navbar() {
  const { userRole, toggleUserRole } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/activities">Aktivnosti</Link></li>
        <li><Link to="/volunteers">Volonteri</Link></li>
        <li><Link to="/organizations">Udruge</Link></li>
      </ul>
      <div>
        <label>
          Admin:
          <input
            type="checkbox"
            checked={userRole === 'admin'}
            onChange={toggleUserRole}
          />
        </label>
      </div>
    </nav>
  );
}

export default Navbar;



