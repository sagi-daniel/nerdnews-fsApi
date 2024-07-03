import FormConfirmation from '../../features/auth/FormConfirmation';

function DeleteAccountConfim() {
  return (
    <FormConfirmation
      title="A felhasználói fiókodat zároltuk!"
      message="90 nap múlva véglegesen töröljük a fiókodat! Ha szeretnéd a a fiókod visszaállítását vagy a végleges törlést kérni a 90 napos várakozási idő előtt, kérjük, írj nekünk az Adatkezelési tájékoztatóban található elérhetőségen, és segítünk."
    />
  );
}

export default DeleteAccountConfim;
