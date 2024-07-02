import { FiAlertCircle, FiLogIn } from 'react-icons/fi';

type ButtonStyle = 'primary' | 'neutral' | 'delete';
type IconType = 'login' | 'error';

interface DeleteAlertProps {
  alertIcon?: IconType;
  alertMessage: string;
  alertDescription?: string;
  buttonText: string;
  buttonStyle?: ButtonStyle;
  confrimText: string;
  confrimStyle?: ButtonStyle;
  buttonAction: () => void;
  confirmAction: () => void;
}

function Alert({
  alertIcon,
  alertMessage,
  alertDescription = '',
  buttonText,
  buttonStyle = 'neutral',
  confrimText,
  confrimStyle = 'primary',
  buttonAction,
  confirmAction,
}: DeleteAlertProps) {
  const buttonStyles = {
    primary: 'btn-primary',
    neutral: 'btn-neutral',
    cancel: 'btn-cancel',
    delete: 'btn-delete',
  };

  return (
    <>
      <div className="flex space-x-2">
        {alertIcon === 'error' && <FiAlertCircle className="text-2xl text-error" />}
        {alertIcon === 'login' && <FiLogIn className="text-2xl text-primary" />}
        <h2 className="text-lg">{alertMessage}</h2>
      </div>

      {alertDescription && <p className="text-sm">{alertDescription}</p>}
      <div className="flex justify-end mt-6 space-x-2">
        <button onClick={buttonAction} className={`${buttonStyles[buttonStyle]}`}>
          {buttonText}
        </button>
        <button className={`${buttonStyles[confrimStyle]}`} onClick={confirmAction}>
          {confrimText}
        </button>
      </div>
    </>
  );
}

export default Alert;
