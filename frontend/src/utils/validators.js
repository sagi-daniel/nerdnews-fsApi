export const validateIpAddress = (ip) => {
  // Regex az IP cím ellenőrzésére
  const ipRegex =
    /\b(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\.(?:25[0-5]|2[0-4][0-9]|[01]?\d{1,2})\b/;
  return ipRegex.test(ip);
};

export const validatePrefix = (prefix) => {
  // A prefix csak 0 és 32 közötti szám lehet
  const prefixNum = parseInt(prefix);
  return !isNaN(prefixNum) && prefixNum >= 0 && prefixNum <= 32;
};
