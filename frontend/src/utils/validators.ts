export const validateIpAddress = (ip: string): boolean => {
  // Regex for validating an IP address
  const ipRegex =
    /\b(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\b/;
  return ipRegex.test(ip);
};

export const validatePrefix = (prefix: string | number): boolean => {
  // The prefix can only be a number between 0 and 32
  const prefixNum = typeof prefix === "number" ? prefix : parseInt(prefix, 10);
  return !isNaN(prefixNum) && prefixNum >= 0 && prefixNum <= 32;
};
