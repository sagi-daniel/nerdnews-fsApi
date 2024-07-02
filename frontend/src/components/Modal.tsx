import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from './CloseIcon';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}

function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-bg-light dark:bg-bg-dark text-content-light dark:text-content-dark p-6 rounded-md w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <CloseIcon onClick={() => setIsOpen(false)} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
