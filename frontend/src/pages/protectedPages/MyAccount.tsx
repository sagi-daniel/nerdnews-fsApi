import Section from '../../components/Section';
import { useUser } from '../../features/auth/useUser';

function MyAccount() {
  const { user } = useUser();

  return (
    <Section type="horizontal" space="large">
      <div className="flex flex-col md:w-1/2 p-10 bg-border-dark  rounded-md border border-red-800">
        <div>
          <h1 className="text-4xl font-bold text-center md:text-left ">{`Hello ${user?.userName}!`}</h1>
          <p className=" pb-6 text-center md:text-left ">content</p>
          <p>Felhasználó email: {user?.email}</p>
        </div>

        <div className="text-center md:text-left">
          <h2>action</h2>
        </div>
      </div>
      <div className="flex flex-col p-2 md:w-1/2 border border-red-800 ">
        <div>
          <p>valami</p>
        </div>
      </div>
    </Section>
  );
}

export default MyAccount;
