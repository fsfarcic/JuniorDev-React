






import  { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; 

function Volunteers() {
  const { userRole } = useAuth(); 
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [filterParam, setFilterParam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newVolunteer, setNewVolunteer] = useState({
    firstName: '',
    lastName: '',
    city: '',
    jobType: '',
    email: '',
    phoneNumber: ''
  });
  const [editVolunteerId, setEditVolunteerId] = useState(null);

  useEffect(() => {
    const fetchedVolunteers = [
      { id: 1, firstName: 'Ana', lastName: 'Kovač', city: 'Zagreb', jobType: 'Edukacija', email: 'ana@example.com', phoneNumber: '123-456-789' },
      { id: 2, firstName: 'Ivan', lastName: 'Horvat', city: 'Split', jobType: 'Zaštita okoliša', email: 'ivan@example.com', phoneNumber: '987-654-321' },
      { id: 3, firstName: 'Petra', lastName: 'Novak', city: 'Rijeka', jobType: 'Zdravstvo', email: 'petra@example.com', phoneNumber: '555-555-555' },
    ];

    setAllVolunteers(fetchedVolunteers);
    setFilteredVolunteers(fetchedVolunteers);
  }, []);

  useEffect(() => {
    filterVolunteers(filterParam);
  }, [filterParam]);

  useEffect(() => {
    searchVolunteers();
  }, [searchQuery]);

  const filterVolunteers = (param) => {
    setFilterParam(param);

    if (param === '') {
      setFilteredVolunteers(allVolunteers);
    } else {
      const filtered = allVolunteers.filter(volunteer => volunteer.city === param || volunteer.jobType === param);
      setFilteredVolunteers(filtered);
    }
  };

  const searchVolunteers = () => {
    if (searchQuery === '') {
      setFilteredVolunteers(allVolunteers);
    } else {
      const filtered = allVolunteers.filter(volunteer =>
        volunteer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVolunteers(filtered);
    }
  };

  const renderVolunteers = () => {
    return filteredVolunteers.map(volunteer => (
      <div key={volunteer.id} className="volunteer-card">
        <h3>{volunteer.firstName} {volunteer.lastName}</h3>
        <p>Grad: {volunteer.city}</p>
        <p>Vrsta posla: {volunteer.jobType}</p>
        <p>Email: {volunteer.email}</p>
        <p>Telefon: {volunteer.phoneNumber}</p>
        {userRole === 'admin' && (
          <>
            <button onClick={() => handleDeleteVolunteer(volunteer.id)}>Obriši</button>
            <button onClick={() => handleEditVolunteer(volunteer.id)}>Uredi</button>
          </>
        )}
      </div>
    ));
  };

  const handleDeleteVolunteer = (id) => {
    const updatedVolunteers = allVolunteers.filter(volunteer => volunteer.id !== id);
    setAllVolunteers(updatedVolunteers);
    setFilteredVolunteers(updatedVolunteers); 
  };

  const handleEditVolunteer = (id) => {
    setEditVolunteerId(id);
    const volunteer = allVolunteers.find(volunteer => volunteer.id === id);
    setNewVolunteer(volunteer);
  };

  const handleAddVolunteer = () => {
    const id = allVolunteers.length + 1;
    const updatedVolunteers = [...allVolunteers, { id, ...newVolunteer }];
    setAllVolunteers(updatedVolunteers);
    setFilteredVolunteers(updatedVolunteers); 
    setNewVolunteer({
      firstName: '',
      lastName: '',
      city: '',
      jobType: '',
      email: '',
      phoneNumber: ''
    });
  };

  const handleEditSubmit = () => {
    const updatedVolunteers = allVolunteers.map(volunteer =>
      volunteer.id === editVolunteerId ? newVolunteer : volunteer
    );
    setAllVolunteers(updatedVolunteers);
    setFilteredVolunteers(updatedVolunteers); 
    setEditVolunteerId(null);
    setNewVolunteer({  
      firstName: '',
      lastName: '',
      city: '',
      jobType: '',
      email: '',
      phoneNumber: ''
    });
  };

  return (
    <div>
      <h2>Volonteri</h2>
      <div className="filter-container">
        <label>
          Filtriraj po gradu ili vrsti posla:
          <select value={filterParam} onChange={(e) => filterVolunteers(e.target.value)}>
            <option value="">Svi volonteri</option>
            <option value="Zagreb">Zagreb</option>
            <option value="Split">Split</option>
            <option value="Rijeka">Rijeka</option>
            <option value="Edukacija">Edukacija</option>
            <option value="Zaštita okoliša">Zaštita okoliša</option>
            <option value="Zdravstvo">Zdravstvo</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Pretraži volontere..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchVolunteers}>Pretraži</button>
        <button onClick={() => filterVolunteers('')}>Prikaži sve</button>
      </div>
      {userRole === 'admin' && (
        <div className="admin-controls">
          <h3>Dodaj novog volontera:</h3>
          <input
            type="text"
            placeholder="Ime"
            value={newVolunteer.firstName}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Prezime"
            value={newVolunteer.lastName}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, lastName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Grad"
            value={newVolunteer.city}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Vrsta posla"
            value={newVolunteer.jobType}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, jobType: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newVolunteer.email}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefon"
            value={newVolunteer.phoneNumber}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, phoneNumber: e.target.value })}
          />
          <button onClick={handleAddVolunteer}>Dodaj volontera</button>
        </div>
      )}
      {editVolunteerId && (
        <div className="edit-controls">
          <h3>Uredi volontera:</h3>
          <input
            type="text"
            placeholder="Ime"
            value={newVolunteer.firstName}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Prezime"
            value={newVolunteer.lastName}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, lastName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Grad"
            value={newVolunteer.city}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="Vrsta posla"
            value={newVolunteer.jobType}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, jobType: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newVolunteer.email}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Telefon"
            value={newVolunteer.phoneNumber}
            onChange={(e) => setNewVolunteer({ ...newVolunteer, phoneNumber: e.target.value })}
          />
          <button onClick={handleEditSubmit}>Spremi promjene</button>
        </div>
      )}
      <div className="volunteers-container">
        {renderVolunteers()}
      </div>
    </div>
  );
}

export default Volunteers;



