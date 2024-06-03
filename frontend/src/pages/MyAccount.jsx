import { useState } from 'react';
import Section from '../components/Section';

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

  return <Section type="horizontal"></Section>;
}

export default MyAccount;
