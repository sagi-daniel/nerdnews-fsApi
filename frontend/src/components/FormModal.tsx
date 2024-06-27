import { useOutsideClick } from '../hooks/useOutsideClick';
import CloseIcon from './CloseIcon';

interface FormModalProps {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
}

function FormModal({ title, closeModal, children }: FormModalProps) {
  const modalRef = useOutsideClick({
    handler: closeModal,
    listenCapturing: true,
  });

  return (
    <div className="z-20 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative flex flex-col gap-5 w-1/2 md:w-1/3 modal-content bg-bg-light dark:bg-bg-dark rounded-md shadow-md p-4"
      >
        <CloseIcon onClick={closeModal} />
        <div className="flex flex-col min-h-32 justify-between ">
          <h2 className="text-center ">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormModal;
