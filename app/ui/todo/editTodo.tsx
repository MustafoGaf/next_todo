'use client'
import { FaEdit } from 'react-icons/fa';
import Modal from '../component/Modal';
import { Suspense, useState } from 'react';
const EditTodo = ({ id, title }: { id: string; title: string }) => {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div
      onClick={() => setModal(true)}
      className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
      <FaEdit /> <p>Изменить</p>
      {modal && (
        <Suspense>
          <Modal isActive={modal} onClose={() => setModal(false)}>
            <div>
              <input type="text" defaultValue={title} />
              <button type="submit">Save</button>
            </div>
          </Modal>
        </Suspense>
      )}
    </div>
  );
};

export default EditTodo;
