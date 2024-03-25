'use client';
import { useState, useEffect } from 'react';
import { getSessionData } from '../lib/actions';
import { FaUserCircle } from 'react-icons/fa';
type USER = {
  username: string;
  id: string;
};
export default function UserName() {
  const [user, setUser] = useState<USER>({ username: 'Аноним', id: '' });
  async function getUser() {
    const data = await getSessionData();
    setUser({
      username: data ? data.username : 'Аноним',
      id: data ? data.id : '',
    });
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <li className="flex items-center gap-[10px] sm:hidden">
      <FaUserCircle size={20} />
      <p>{user.username}</p>
    </li>
  );
}
