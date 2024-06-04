import { useState } from 'react';
import Section from '../components/Section';
import { formatDateIsoToNormal } from '../utils/helpers';

function MyAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: '',
    registrationDate: '2023-01-01',
  });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       [name]: value,
  //     }));
  //   };

  //   const handleEdit = () => {
  //     setIsEditing(!isEditing);
  //   };

  //   const handleDelete = () => {
  //     // Fiók törlése logika
  //     console.log('Fiók törölve');
  //   };

  return (
    <Section type="horizontal" space="large">
      <div className="flex flex-col md:w-1/2 p-10 bg-border-dark  rounded-md border border-red-800">
        <div>
          <h1 className="text-4xl font-bold text-center md:text-left ">Hello {user.name}!</h1>
          <p className=" pb-6 text-center md:text-left ">content</p>
          <p>Felhasználó létrehozva: {formatDateIsoToNormal(user.registrationDate)}</p>
        </div>

        <div className="text-center md:text-left">
          <h2>action</h2>
        </div>
      </div>
      <div className="flex flex-col p-2 md:w-1/2 border border-red-800 ">
        <div>
          <p>valami</p>
        </div>
      </div>
    </Section>
  );
}

export default MyAccount;
