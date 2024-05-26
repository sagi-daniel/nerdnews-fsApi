
const ipToBinary = (ip) => {
  return ip
    .split('.')
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('');
};

const binaryToIp = (binary) => {
  return binary
    .match(/.{1,8}/g)
    .map((byte) => parseInt(byte, 2).toString(10))
    .join('.');
};

const incrementBinary = (binary) => {
  let value = parseInt(binary, 2);
  value++;
  return value.toString(2).padStart(32, '0');
};

const calculateCIDR = (ip, prefix) => {
  let binaryIp = ipToBinary(ip);
  let networkBinary = binaryIp.substr(0, prefix).padEnd(32, '0');
  let networkIp = binaryToIp(networkBinary);
  let broadcastBinary = binaryIp.substr(0, prefix).padEnd(32, '1');
  let broadcastIp = binaryToIp(broadcastBinary);
  let firstHostBinary = networkBinary.substr(0, 31) + '1';
  let firstHostIp = binaryToIp(firstHostBinary);
  let lastHostBinary = broadcastBinary.substr(0, 31) + '0';
  let lastHostIp = binaryToIp(lastHostBinary);
  let nextSubnetBinary = incrementBinary(broadcastBinary);
  let nextSubnetIp = binaryToIp(nextSubnetBinary);

  return {
    network: networkIp + '/' + prefix,
    broadcast: broadcastIp,
    firstHost: firstHostIp,
    lastHost: lastHostIp,
    nextSubnet: nextSubnetIp,
  };
};

export default calculateCIDR