const ipToBinary = (ip: string): string => {
  return ip
    .split('.')
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('');
};

const binaryToIp = (binary: string): string => {
  const matches = binary.match(/.{1,8}/g);
  if (!matches) return '';
  return matches.map((byte) => parseInt(byte, 2).toString(10)).join('.');
};

const incrementBinary = (binary: string): string => {
  let value = parseInt(binary, 2);
  value++;
  return value.toString(2).padStart(32, '0');
};

interface CIDRResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  nextSubnet: string;
}

const calculateCIDR = (ip: string, prefix: number): CIDRResult => {
  const binaryIp = ipToBinary(ip);
  const networkBinary = binaryIp.substring(0, prefix).padEnd(32, '0');
  const networkIp = binaryToIp(networkBinary);
  const broadcastBinary = binaryIp.substring(0, prefix).padEnd(32, '1');
  const broadcastIp = binaryToIp(broadcastBinary);
  const firstHostBinary = networkBinary.substring(0, 31) + '1';
  const firstHostIp = binaryToIp(firstHostBinary);
  const lastHostBinary = broadcastBinary.substring(0, 31) + '0';
  const lastHostIp = binaryToIp(lastHostBinary);
  const nextSubnetBinary = incrementBinary(broadcastBinary);
  const nextSubnetIp = binaryToIp(nextSubnetBinary);

  return {
    network: networkIp + '/' + prefix,
    broadcast: broadcastIp,
    firstHost: firstHostIp,
    lastHost: lastHostIp,
    nextSubnet: nextSubnetIp,
  };
};

export default calculateCIDR;
