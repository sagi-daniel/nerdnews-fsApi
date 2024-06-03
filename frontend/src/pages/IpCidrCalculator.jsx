import { useState } from 'react';
import calculateCIDR from '../utils/cidrCalc';
import InputField from '../components/InputField';
import Section from '../components/Section';
import { validateIpAddress, validatePrefix } from '../utils/validators';
import { useLocaleStorageState } from '../hooks/useLocaleStorageState';
import { FiRefreshCcw } from 'react-icons/fi';

function CidrCalculator() {
  const [ip, setIp] = useLocaleStorageState('', 'ip-input');
  const [prefix, setPrefix] = useLocaleStorageState('', 'prefix-input');
  const [result, setResult] = useLocaleStorageState(null, 'cidr');

  const [ipValid, setIpValid] = useState('');
  const [prefixValid, setPrefixValid] = useState('');

  const handleCalculate = () => {
    if (!ip || !prefix || !validateIpAddress(ip) || !validatePrefix(prefix)) {
      setResult(null);

      return;
    }
    const cidrResult = calculateCIDR(ip, prefix);
    setResult(cidrResult);
  };

  const handleCloseResult = () => {
    setResult(null);
    setIp('');
    setPrefix('');
  };

  return (
    <Section type="horizontal" space="large">
      <div className="flex flex-col md:w-1/2 justify-center ">
        <h1 className="">CIDR IP Kalkulátor</h1>
        <InputField
          type="text"
          id={'ip'}
          label="Cél IP cím:"
          value={ip}
          setValue={setIp}
          validateInput={validateIpAddress}
          validationResult={setIpValid}
          errorMessage="Kérem, adjon meg egy érvényes IP címet."
          successMessage="Érvényes IP cím"
        />
        <InputField
          type="number"
          id={'prefix'}
          label="Prefix"
          value={prefix}
          setValue={setPrefix}
          validateInput={validatePrefix}
          validationResult={setPrefixValid}
          errorMessage="Kérem, adjon meg egy érvényes prefixet (0-32)."
          successMessage="Érvényes prefix"
        />
        <div>
          <button onClick={handleCalculate} disabled={!ipValid || !prefixValid} className="btn-primary-md ">
            Számol
          </button>
        </div>
      </div>

      <div className="flex flex-col md:w-1/2 justify-center">
        {result && (
          <div className=" relative bg-primary text-primary-content border border-bg-border-dark dark:border-bg-light p-4 rounded-md mt-4 md:mt-0">
            <div
              onClick={handleCloseResult}
              className="absolute flex justify-center items-center gap-2 right-2 top-2 cursor-pointer"
            >
              Újra
              <FiRefreshCcw />
            </div>
            <h2 className="text-lg font-bold mb-2">Eredmény:</h2>
            <p>
              <span className="font-bold">Network:</span> {result.network}
            </p>
            <p>
              <span className="font-bold">Broadcast:</span> {result.broadcast}
            </p>
            <p>
              <span className="font-bold">First Host:</span> {result.firstHost}
            </p>
            <p>
              <span className="font-bold">Last Host:</span> {result.lastHost}
            </p>
            <p>
              <span className="font-bold">Next Subnet:</span> {result.nextSubnet}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}

export default CidrCalculator;
