

// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // // import { useAuth } from './AuthContext';
// // // Definiranje tipa za ulogu korisnika
// // type UserRole = 'admin' | 'user';

// // // Kreiranje konteksta za autentikaciju
// // const AuthContext = createContext<{
// //   userRole: UserRole;
// //   toggleUserRole: () => void;
// // }>({
// //   userRole: 'user',
// //   toggleUserRole: () => {},
// // });

// // // Izvoz providera za kontekst
// // export const AuthProvider: React.FC = ({ children }) => {
// //   const [userRole, setUserRole] = useState<UserRole>('user');

// //   const toggleUserRole = () => {
// //     setUserRole(prevRole => (prevRole === 'admin' ? 'user' : 'admin'));
// //   };

// //   return (
// //     <AuthContext.Provider value={{ userRole, toggleUserRole }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // Custom hook za pristup podacima o ulozi korisnika
// // export const useAuth = () => useContext(AuthContext);

// // // Komponenta Organizations
// // const Organizations: React.FC = () => {
// //   const { userRole } = useAuth();
// //   const [organizations, setOrganizations] = useState([]);
// //   const [approvalRequests, setApprovalRequests] = useState([]);
// //   const [nextId, setNextId] = useState(4); // Početni ID za nove zahtjeve

// //   useEffect(() => {
// //     const fetchedOrganizations = [
// //       { id: 1, name: 'Udruga za zaštitu životinja', address: 'Petrova 3', city: 'Zagreb' },
// //       { id: 2, name: 'Volonterski centar', address: 'Trg bana Jelačića 5', city: 'Zagreb' },
// //       { id: 3, name: 'Crveni križ', address: 'Ilica 16', city: 'Zagreb' },
// //     ];

// //     setOrganizations(fetchedOrganizations);
// //   }, []);

// //   const sortOrganizations = (field: string) => {
// //     const sortedOrganizations = [...organizations].sort((a, b) => {
// //       if (a[field] < b[field]) return -1;
// //       if (a[field] > b[field]) return 1;
// //       return 0;
// //     });
// //     setOrganizations(sortedOrganizations);
// //   };

// //   const handleAddRequest = (newRequest) => {
// //     setApprovalRequests([...approvalRequests, { ...newRequest, id: nextId }]);
// //     setNextId(nextId + 1);
// //   };

// //   const renderOrganizations = () => {
// //     return organizations.map((organization) => (
// //       <div key={organization.id} className="organization-card">
// //         <h3>{organization.name}</h3>
// //         <p>Adresa: {organization.address}</p>
// //         <p>Grad: {organization.city}</p>
// //       </div>
// //     ));
// //   };

// //   const renderApprovalRequests = () => {
// //     return approvalRequests.map((request) => (
// //       <div key={request.id} className="approval-request">
// //         <h3>{request.name}</h3>
// //         <p>Adresa: {request.address}</p>
// //         <p>Grad: {request.city}</p>
// //         <button onClick={() => handleApproveRequest(request.id)}>Odobri</button>
// //         <button onClick={() => handleRejectRequest(request.id)}>Odbaci</button>
// //       </div>
// //     ));
// //   };

// //   const handleApproveRequest = (id) => {
// //     const updatedRequests = approvalRequests.filter((request) => request.id !== id);
// //     setApprovalRequests(updatedRequests);
// //     setOrganizations([...organizations, approvalRequests.find((request) => request.id === id)]);
// //   };

// //   const handleRejectRequest = (id) => {
// //     const updatedRequests = approvalRequests.filter((request) => request.id !== id);
// //     setApprovalRequests(updatedRequests);
// //   };

// //   return (
// //     <div>
// //       <h2>Popis udruga</h2>
// //       <div>
// //         <button onClick={() => sortOrganizations('name')}>Sortiraj po imenu</button>
// //         <button onClick={() => sortOrganizations('address')}>Sortiraj po adresi</button>
// //         <button onClick={() => sortOrganizations('city')}>Sortiraj po gradu</button>
// //       </div>
// //       <div className="organizations-container">{renderOrganizations()}</div>
// //       {userRole === 'admin' && (
// //         <div>
// //           <h2>Zahtjevi za odobrenje</h2>
// //           {renderApprovalRequests()}
// //           <h2>Dodaj novu udrugu</h2>
// //           <AddOrganizationForm onSubmit={handleAddRequest} />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // function AddOrganizationForm({ onSubmit }) {
// //   const [name, setName] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [city, setCity] = useState('');

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit({ name, address, city });
// //     setName('');
// //     setAddress('');
// //     setCity('');
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input type="text" placeholder="Naziv udruge" value={name} onChange={(e) => setName(e.target.value)} />
// //       <input type="text" placeholder="Adresa" value={address} onChange={(e) => setAddress(e.target.value)} />
// //       <input type="text" placeholder="Grad" value={city} onChange={(e) => setCity(e.target.value)} />
// //       <button type="submit">Pošalji zahtjev</button>
// //     </form>
// //   );
// // }

// // export default Organizations;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from './AuthContext'; // Uvezali smo useAuth kuku iz AuthContext

// // Komponenta Organizations
// const Organizations: React.FC = () => {
//   const { userRole } = useAuth(); // Koristimo useAuth kuku za dobivanje uloge korisnika
//   const [organizations, setOrganizations] = useState([]);
//   const [approvalRequests, setApprovalRequests] = useState([]);
//   const [nextId, setNextId] = useState(4); // Početni ID za nove zahtjeve

//   useEffect(() => {
//     const fetchedOrganizations = [
//       { id: 1, name: 'Udruga za zaštitu životinja', address: 'Petrova 3', city: 'Zagreb' },
//       { id: 2, name: 'Volonterski centar', address: 'Trg bana Jelačića 5', city: 'Zagreb' },
//       { id: 3, name: 'Crveni križ', address: 'Ilica 16', city: 'Zagreb' },
//     ];

//     setOrganizations(fetchedOrganizations);
//   }, []);

//   const sortOrganizations = (field: string) => {
//     const sortedOrganizations = [...organizations].sort((a, b) => {
//       if (a[field] < b[field]) return -1;
//       if (a[field] > b[field]) return 1;
//       return 0;
//     });
//     setOrganizations(sortedOrganizations);
//   };

//   const handleAddRequest = (newRequest) => {
//     setApprovalRequests([...approvalRequests, { ...newRequest, id: nextId }]);
//     setNextId(nextId + 1);
//   };

//   const renderOrganizations = () => {
//     return organizations.map((organization) => (
//       <div key={organization.id} className="organization-card">
//         <h3>{organization.name}</h3>
//         <p>Adresa: {organization.address}</p>
//         <p>Grad: {organization.city}</p>
//       </div>
//     ));
//   };

//   const renderApprovalRequests = () => {
//     return approvalRequests.map((request) => (
//       <div key={request.id} className="approval-request">
//         <h3>{request.name}</h3>
//         <p>Adresa: {request.address}</p>
//         <p>Grad: {request.city}</p>
//         <button onClick={() => handleApproveRequest(request.id)}>Odobri</button>
//         <button onClick={() => handleRejectRequest(request.id)}>Odbaci</button>
//       </div>
//     ));
//   };

//   const handleApproveRequest = (id) => {
//     const updatedRequests = approvalRequests.filter((request) => request.id !== id);
//     setApprovalRequests(updatedRequests);
//     setOrganizations([...organizations, approvalRequests.find((request) => request.id === id)]);
//   };

//   const handleRejectRequest = (id) => {
//     const updatedRequests = approvalRequests.filter((request) => request.id !== id);
//     setApprovalRequests(updatedRequests);
//   };

//   return (
//     <div>
//       <h2>Popis udruga</h2>
//       <div>
//         <button onClick={() => sortOrganizations('name')}>Sortiraj po imenu</button>
//         <button onClick={() => sortOrganizations('address')}>Sortiraj po adresi</button>
//         <button onClick={() => sortOrganizations('city')}>Sortiraj po gradu</button>
//       </div>
//       <div className="organizations-container">{renderOrganizations()}</div>
//       {userRole === 'admin' && (
//         <div>
//           <h2>Zahtjevi za odobrenje</h2>
//           {renderApprovalRequests()}
//           <h2>Dodaj novu udrugu</h2>
//           <AddOrganizationForm onSubmit={handleAddRequest} />
//         </div>
//       )}
//     </div>
//   );
// };

// function AddOrganizationForm({ onSubmit }) {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ name, address, city });
//     setName('');
//     setAddress('');
//     setCity('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Naziv udruge" value={name} onChange={(e) => setName(e.target.value)} />
//       <input type="text" placeholder="Adresa" value={address} onChange={(e) => setAddress(e.target.value)} />
//       <input type="text" placeholder="Grad" value={city} onChange={(e) => setCity(e.target.value)} />
//       <button type="submit">Pošalji zahtjev</button>
//     </form>
//   );
// }

// export default Organizations;


import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Uvozimo useAuth kuku iz AuthContext

// Komponenta Organizations
const Organizations: React.FC = () => {
  const { userRole } = useAuth(); // Koristimo useAuth kuku za dobivanje uloge korisnika
  const [organizations, setOrganizations] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [nextId, setNextId] = useState(4); // Početni ID za nove zahtjeve

  // Simulacija dohvaćanja popisa udruga s backend-a
  useEffect(() => {
    const fetchedOrganizations = [
      { id: 1, name: 'Udruga za zaštitu životinja', address: 'Petrova 3', city: 'Zagreb' },
      { id: 2, name: 'Volonterski centar', address: 'Trg bana Jelačića 5', city: 'Zagreb' },
      { id: 3, name: 'Crveni križ', address: 'Ilica 16', city: 'Zagreb' },
    ];

    setOrganizations(fetchedOrganizations);
  }, []);

  // const sortOrganizations = (field: string) => {
  //   const sortedOrganizations = [...organizations].sort((a, b) => {
  //     if (a[field] < b[field]) return -1;
  //     if (a[field] > b[field]) return 1;
  //     return 0;
  //   });
  //   setOrganizations(sortedOrganizations);
  // };


  const sortOrganizations = (field: string) => {
    const sortedOrganizations = [...organizations].sort((a, b) => {
      return a[field].localeCompare(b[field], 'hr'); // 'hr' označava hrvatski jezik, zamijenite ga s vašim odgovarajućim jezikom ako je potrebno
    });
    setOrganizations(sortedOrganizations);
  };

  const handleAddRequest = (newRequest) => {
    setApprovalRequests([...approvalRequests, { ...newRequest, id: nextId }]);
    setNextId(nextId + 1);
  };

  const renderApprovalRequests = () => {
    return approvalRequests.map((request) => (
      <div key={request.id} className="approval-request">
        <h3>{request.name}</h3>
        <p>Adresa: {request.address}</p>
        <p>Grad: {request.city}</p>
        <button onClick={() => handleApproveRequest(request.id)}>Odobri</button>
        <button onClick={() => handleRejectRequest(request.id)}>Odbaci</button>
      </div>
    ));
  };

  const handleApproveRequest = (id) => {
    const approvedRequest = approvalRequests.find((request) => request.id === id);
    const updatedRequests = approvalRequests.filter((request) => request.id !== id);
    setApprovalRequests(updatedRequests);
    setOrganizations([...organizations, approvedRequest]);
  };

  const handleRejectRequest = (id) => {
    const updatedRequests = approvalRequests.filter((request) => request.id !== id);
    setApprovalRequests(updatedRequests);
  };

  const renderOrganizations = () => {
    return organizations.map((organization) => (
      <div key={organization.id} className="organization-card">
        <h3>{organization.name}</h3>
        <p>Adresa: {organization.address}</p>
        <p>Grad: {organization.city}</p>
      </div>
    ));
  };

  return (
    <div>
      <h2>Popis udruga</h2>
      <div>
        <button onClick={() => sortOrganizations('name')}>Sortiraj po imenu</button>
        <button onClick={() => sortOrganizations('address')}>Sortiraj po adresi</button>
        <button onClick={() => sortOrganizations('city')}>Sortiraj po gradu</button>
      </div>
      <div className="organizations-container">{renderOrganizations()}</div>
      {userRole === 'admin' && (
        <div>
          <h2>Zahtjevi za odobrenje</h2>
          {renderApprovalRequests()}
          <h2>Dodaj novu udrugu</h2>
          <AddOrganizationForm onSubmit={handleAddRequest} />
        </div>
      )}
    </div>
  );
};

function AddOrganizationForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, address, city });
    setName('');
    setAddress('');
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Naziv udruge" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Adresa" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Grad" value={city} onChange={(e) => setCity(e.target.value)} />
      <button type="submit">Dodaj udrugu</button>
    </form>
  );
}

export default Organizations;
