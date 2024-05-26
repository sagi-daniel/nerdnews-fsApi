import React, { useState } from 'react';
import calculateCIDR from '../services/cidrCalc';


function CidrCalculator()  {
  const [ip, setIp] = useState('');
  const [prefix, setPrefix] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (ip && prefix) {
      const cidrResult = calculateCIDR(ip, prefix);
      setResult(cidrResult);
    }
  };

  return (
    <div>
      <h1>CIDR Calculator</h1>
      <div>
        <label>
          IP Address:
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Prefix:
          <input
            type="number"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <h2>Result:</h2>
          <p>Network: {result.network}</p>
          <p>Broadcast: {result.broadcast}</p>
          <p>First Host: {result.firstHost}</p>
          <p>Last Host: {result.lastHost}</p>
          <p>Next Subnet: {result.nextSubnet}</p>
        </div>
      )}
    </div>
  );
};

export default CidrCalculator;
