import React, { useEffect, useState } from 'react';
import InputField from '../components/InputField';
import Section from '../components/Section';
import calculateCIDR from '../utils/cidrCalc';
import { validateIpAddress, validatePrefix } from '../utils/validators';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { FiRefreshCcw } from 'react-icons/fi';

interface CIDRResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  nextSubnet: string;
}

function CidrCalculator() {
  const [ip, setIp] = useLocalStorageState<string>('', 'ip-input');
  const [prefix, setPrefix] = useLocalStorageState<string>('', 'prefix-input');
  const [result, setResult] = useLocalStorageState<CIDRResult | null>(null, 'cidr');

  const [ipValid, setIpValid] = useState<boolean>(false);
  const [prefixValid, setPrefixValid] = useState<boolean>(false);

  useEffect(() => {
    setIpValid(validateIpAddress(ip));
    setPrefixValid(validatePrefix(prefix));
  }, [ip, prefix]);

  const handleCalculate = () => {
    if (!ip || !prefix || !validateIpAddress(ip) || !validatePrefix(prefix)) {
      setResult(null);
      return;
    }
    const cidrResult = calculateCIDR(ip, parseInt(prefix, 10));
    setResult(cidrResult);
  };

  const handleCloseResult = () => {
    setResult(null);
    setIp('');
    setPrefix('');
    setIpValid(false);
    setPrefixValid(false);
  };

  return (
    <Section type="horizontal" space="large">
      <div className="flex flex-col  md:w-1/2 justify-center ">
        <h1 className="">CIDR IP Calculator</h1>
        <InputField
          type="text"
          id="ip"
          label="Target IP Address:"
          value={ip}
          setValue={setIp}
          isValid={ipValid}
          errorMessage="Please enter a valid IP address."
          successMessage="Valid IP address"
        />
        <InputField
          type="number"
          id="prefix"
          label="Prefix"
          value={prefix}
          setValue={setPrefix}
          isValid={prefixValid}
          errorMessage="Please enter a valid Prefix number 0-32."
          successMessage="Valid Prefix number"
        />
        <div>
          <button onClick={handleCalculate} disabled={!ipValid || !prefixValid} className="btn-primary-md">
            Calculate
          </button>
        </div>
      </div>

      <div className="flex flex-col md:w-1/2 justify-center">
        {result && (
          <div className="relative bg-primary text-primary-content border border-bg-border-dark dark:border-bg-light p-4 rounded-md mt-4 md:mt-0">
            <div
              onClick={handleCloseResult}
              className="absolute flex justify-center items-center gap-2 right-2 top-2 cursor-pointer"
            >
              Reset
              <FiRefreshCcw />
            </div>
            <h2 className="text-lg font-bold mb-2">Result:</h2>
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
