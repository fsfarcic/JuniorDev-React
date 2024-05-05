




import  { useState } from 'react';
import { useAuth } from './AuthContext';
import '../App.css'; 

function Activities() {
  
  const [activities, setActivities] = useState([]);
  
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerLastName, setVolunteerLastName] = useState('');

 
  const { userRole } = useAuth();

  
  const openModal = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  
  const closeModal = () => {
    setShowModal(false);
  };

  
  const handleVolunteerRegistration = (e) => {
    e.preventDefault(); 

    
    if (volunteerName.trim() === '' || volunteerLastName.trim() === '') {
      alert('Molimo unesite ime i prezime volontera.');
      return;
    }

    
    const updatedActivity = { ...selectedActivity };
    updatedActivity.participants.push(`${volunteerName} ${volunteerLastName}`);

    
    const updatedActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(updatedActivities);

    
    setVolunteerName('');
    setVolunteerLastName('');

    alert('Uspješno ste se prijavili na aktivnost.');
  };

  
  const removeParticipant = (participantIndex) => {
    const updatedActivity = { ...selectedActivity };
    updatedActivity.participants.splice(participantIndex, 1);

    
    const updatedActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(updatedActivities);
  };

  
  const deleteActivity = () => {
    const updatedActivities = activities.filter((activity) =>
      activity.id !== selectedActivity.id
    );
    setActivities(updatedActivities);
    setShowModal(false); 
  };

  
  const renderParticipants = () => {
    return selectedActivity.participants.map((participant, index) => (
      <div key={index} className="participant">
        <span>{participant}</span>
        {userRole === 'admin' && (
          <button onClick={() => removeParticipant(index)}>Ukloni</button>
        )}
      </div>
    ));
  };

  
  const renderModal = () => {
    if (!selectedActivity) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>{selectedActivity.name}</h2>
          <p><strong>Opis:</strong> {selectedActivity.description}</p>
          <p><strong>Organizacija:</strong> {selectedActivity.organization}</p>
          <p><strong>Lokacija:</strong> {selectedActivity.location}</p>
          <p><strong>Popis sudionika:</strong></p>
          {renderParticipants()}
          {/* Forma za prijavu na aktivnost */}
          <form onSubmit={handleVolunteerRegistration}>
            <label>
              Ime volontera:
              <input
                type="text"
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                required
              />
            </label>
            <label>
              Prezime volontera:
              <input
                type="text"
                value={volunteerLastName}
                onChange={(e) => setVolunteerLastName(e.target.value)}
                required
              />
            </label>
            <button type="submit">Prijavi se</button>
          </form>
          {userRole === 'admin' && (
            <div>
              <button onClick={deleteActivity}>Obriši aktivnost</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  
  const renderActivities = () => {
    const activitiesList = [
      { id: 1, name: 'Čišćenje parka', date: '2024-05-15 10:00', description: 'Čišćenje parka u sklopu akcije "Zelena čistka"', organization: 'Ekološko društvo Zeleni svijet', location: 'Park Maksimir, Zagreb', participants: ['Ana', 'Ivan', 'Marija'] },
      { id: 2, name: 'Bojanje školske klupe', date: '2024-05-20 14:00', description: 'Bojanje školskih klupa u osnovnoj školi Katarina Zrinski', organization: 'Društvo za unapređenje školskog okoliša', location: 'Osnovna škola Katarina Zrinski, Split', participants: ['Marko', 'Petra', 'Josip'] },
      { id: 3, name: 'Sadnja cvijeća', date: '2024-05-25 09:00', description: 'Sadnja cvijeća u gradskom parku u sklopu manifestacije "Cvjetni vrtovi"', organization: 'Gradski vrtlar', location: 'Gradski park, Rijeka', participants: ['Luka', 'Ana', 'Iva'] },
    ];

    return activitiesList.map(activity => (
      <div key={activity.id} className="activity-card" onClick={() => openModal(activity)}>
        <h3>{activity.name}</h3>
        <p>Datum: {activity.date}</p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Popis aktivnosti</h2>
      <div className="activities-container">
        {renderActivities()}
      </div>
      {showModal && renderModal()}
    </div>
  );
}

export default Activities;






















// import  { useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import '../App.css'; // Uvoz CSS-a za stilizaciju

// function Activities() {
//   const [activities, setActivities] = useState([]);
//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [volunteerName, setVolunteerName] = useState('');
//   const [volunteerLastName, setVolunteerLastName] = useState('');
//   const [newActivityData, setNewActivityData] = useState({
//     name: '',
//     date: '',
//     description: '',
//     organization: '',
//     location: '',
//     participants: [],
//   });
//   const { userRole } = useAuth();

//   useEffect(() => {
//     // Ovdje možete simulirati dohvaćanje aktivnosti s backend-a
//     const fetchedActivities = [
//       { id: 1, name: 'Čišćenje parka', date: '2024-05-15 10:00', description: 'Čišćenje parka u sklopu akcije "Zelena čistka"', organization: 'Ekološko društvo Zeleni svijet', location: 'Park Maksimir, Zagreb', participants: ['Ana', 'Ivan', 'Marija'] },
//       { id: 2, name: 'Bojanje školske klupe', date: '2024-05-20 14:00', description: 'Bojanje školskih klupa u osnovnoj školi Katarina Zrinski', organization: 'Društvo za unapređenje školskog okoliša', location: 'Osnovna škola Katarina Zrinski, Split', participants: ['Marko', 'Petra', 'Josip'] },
//       { id: 3, name: 'Sadnja cvijeća', date: '2024-05-25 09:00', description: 'Sadnja cvijeća u gradskom parku u sklopu manifestacije "Cvjetni vrtovi"', organization: 'Gradski vrtlar', location: 'Gradski park, Rijeka', participants: ['Luka', 'Ana', 'Iva'] },
//     ];

//     // Postavljanje dohvaćenih aktivnosti u stanje
//     setActivities(fetchedActivities);
//   }, []);

//   const openModal = (activity) => {
//     setSelectedActivity(activity);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleVolunteerRegistration = (e) => {
//     e.preventDefault();

//     if (volunteerName.trim() === '' || volunteerLastName.trim() === '') {
//       alert('Molimo unesite ime i prezime volontera.');
//       return;
//     }

//     const updatedActivity = { ...selectedActivity };
//     updatedActivity.participants.push(`${volunteerName} ${volunteerLastName}`);

//     const updatedActivities = activities.map((activity) =>
//       activity.id === updatedActivity.id ? updatedActivity : activity
//     );
//     setActivities(updatedActivities);

//     setVolunteerName('');
//     setVolunteerLastName('');

//     alert('Uspješno ste se prijavili na aktivnost.');
//   };

//   const removeParticipant = (participantIndex) => {
//     const updatedActivity = { ...selectedActivity };
//     updatedActivity.participants.splice(participantIndex, 1);

//     const updatedActivities = activities.map((activity) =>
//       activity.id === updatedActivity.id ? updatedActivity : activity
//     );
//     setActivities(updatedActivities);
//   };

//   const deleteActivity = () => {
//     const updatedActivities = activities.filter((activity) =>
//       activity.id !== selectedActivity.id
//     );
//     setActivities(updatedActivities);
//     setShowModal(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewActivityData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAddActivity = () => {
//     setShowModal(true);
//   };

//   const handleCreateActivity = (e) => {
//     e.preventDefault();
//     const newActivity = {
//       id: activities.length + 1,
//       ...newActivityData,
//       participants: [],
//     };
//     setActivities([...activities, newActivity]);
//     setNewActivityData({
//       name: '',
//       date: '',
//       description: '',
//       organization: '',
//       location: '',
//       participants: [],
//     });
//     setShowModal(false);
//   };

//   const renderParticipants = () => {
//     return selectedActivity.participants.map((participant, index) => (
//       <div key={index} className="participant">
//         <span>{participant}</span>
//         {userRole === 'admin' && (
//           <button onClick={() => removeParticipant(index)}>Ukloni</button>
//         )}
//       </div>
//     ));
//   };

//   const renderModal = () => {
//     if (!selectedActivity) return null;
  
//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close" onClick={closeModal}>&times;</span>
//           <h2>{selectedActivity.name}</h2>
//           <p><strong>Opis:</strong> {selectedActivity.description}</p>
//           <p><strong>Organizacija:</strong> {selectedActivity.organization}</p>
//           <p><strong>Lokacija:</strong> {selectedActivity.location}</p>
//           <p><strong>Popis sudionika:</strong></p>
//           {renderParticipants()}
//           <form onSubmit={handleVolunteerRegistration}>
//             <label>
//               Ime volontera:
//               <input
//                 type="text"
//                 value={volunteerName}
//                 onChange={(e) => setVolunteerName(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Prezime volontera:
//               <input
//                 type="text"
//                 value={volunteerLastName}
//                 onChange={(e) => setVolunteerLastName(e.target.value)}
//                 required
//               />
//             </label>
//             <button type="submit">Prijavi se</button>
//           </form>
//           {userRole === 'admin' && (
//             <div>
//               <button onClick={deleteActivity}>Obriši aktivnost</button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderActivities = () => {
//     return activities.map(activity => (
//       <div key={activity.id} className="activity-card" onClick={() => openModal(activity)}>
//         <h3>{activity.name}</h3>
//         <p>Datum: {activity.date}</p>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <h2>Popis aktivnosti</h2>
//       <button onClick={handleAddActivity} className="add-activity-button">Dodaj aktivnost</button>
//       <div className="activities-container">
//         {renderActivities()}
//       </div>
//       {showModal && renderModal()}
//     </div>
//   );
// }

// export default Activities;



