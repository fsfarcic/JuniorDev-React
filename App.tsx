



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './komponente/Navbar';
import Home from './komponente/Home';
import Activities from './komponente/Activities';
import Volunteers from './komponente/Volunteers';
import Organizations from './komponente/Organizations';
import { AuthProvider } from './komponente/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/volunteers" element={<Volunteers />} />
            <Route path="/organizations" element={<Organizations />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
