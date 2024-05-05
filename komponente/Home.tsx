


import { Link } from 'react-router-dom';
import '../App.css'; 

function Home() {
  return (
    <div>
      <h2>Početna stranica</h2>
      <div className="frame">
        <p>Ovdje možete vidjeti osnovne informacije o aplikaciji.</p>
      </div>
      <div>
        <h3>Navigacija na druge komponente:</h3>
        <div className="button-container">
          <Link to="/activities"><button>Aktivnosti</button></Link>
          <Link to="/volunteers"><button>Volonteri</button></Link>
          <Link to="/organizations"><button>Udruge</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
