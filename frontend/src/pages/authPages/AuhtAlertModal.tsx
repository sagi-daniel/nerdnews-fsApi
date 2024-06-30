import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';

interface AuhtAlertModalProps {
  title: string;
  description: string;
  closeModal: () => void;
}

function AuhtAlertModal({ title, description, closeModal }: AuhtAlertModalProps) {
  const navigate = useNavigate();

  return (
    <Modal title={title} closeModal={closeModal}>
      <div>
        <p className="text-lg my-4 text-center">{description}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-primary text-primary-content rounded-md shadow-md hover:bg-primary-dark transition duration-300"
          >
            Bejelentkezés
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 bg-primary text-primary-content rounded-md shadow-md hover:bg-primary-dark transition duration-300"
          >
            Regisztráció
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AuhtAlertModal;
