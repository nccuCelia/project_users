import { useState, useEffect } from 'react';
import axios from 'axios';

export function useUsers() {
  
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://reqres.in/api/users?per_page=12');
        setUsers(result?.data?.data);
      } catch (error) {
        console.error('Fetch user data failed:', error);
      }
    };
      fetchData();
  }, []);

  const createUser = (data) => {
    setUsers([...users, data]);
  };

  const updateUserById = (id, data) => {
    setUsers(users.map((user) => ((user.id === id) ? { ...user, ...data } : user)));
  };

  const deleteUserById = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return {
    users, createUser, updateUserById, deleteUserById,
  };
}