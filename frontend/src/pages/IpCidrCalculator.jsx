import { useState } from 'react';
import calculateCIDR from '../utils/cidrCalc';
import InputField from '../components/InputField';

function CidrCalculator() {
  const [ip, setIp] = useState('');
  const [prefix, setPrefix] = useState('');
  const [result, setResult] = useState(null);

  const [ipValid, setIpValid] = useState('');
  const [prefixValid, setPrefixValid] = useState('');

  const validateIpAddress = (ip) => {
    // Regex az IP cím ellenőrzésére
    const ipRegex =
      /\b(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\b/;
    return ipRegex.test(ip);
  };

  const validatePrefix = (prefix) => {
    // A prefix csak 0 és 32 közötti szám lehet
    const prefixNum = parseInt(prefix);
    return !isNaN(prefixNum) && prefixNum >= 0 && prefixNum <= 32;
  };

  const handleCalculate = () => {
    if (!ip || !prefix || !validateIpAddress(ip) || !validatePrefix(prefix)) {
      setResult(null);
      return;
    }

    const cidrResult = calculateCIDR(ip, prefix);
    setResult(cidrResult);
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
      <div className="flex flex-col w-full md:w-1/3">
        <h1 className="text-2xl mb-4">CIDR IP Kalkulátor</h1>
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
        <button onClick={handleCalculate} disabled={!ipValid || !prefixValid} className="btn-primary-md ">
          Számol
        </button>
      </div>
      {result && (
        <div className="flex flex-col w-full md:w-1/3 border border-bg-border-dark dark:border-bg-light p-4 rounded-md mt-4 md:mt-0">
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
  );
}

export default CidrCalculator;
