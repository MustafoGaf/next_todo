'use client';
import { ReactNode, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

interface IModalProp {
  children: ReactNode;
  isActive: boolean;
  modalClasses?: string;
  onClose: () => void;
}
const Modal = ({ children, isActive, modalClasses, onClose }: IModalProp) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current == e.target) {
        onClose();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose]);
  
  const node = document.getElementById('modal');
  if (!node) return null;
  return ReactDom.createPortal(
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-[#8484849c] ${
        isActive ? '' : 'hidden'
      } `}
      ref={ref}
    >
      <div
        className={`modal_content rounded-[10px] bg-[#FFFFFF] p-[20px] ${modalClasses}`}
      >
        {children}
      </div>
    </div>,
    node,
  );
};

export default Modal;
