const { parsePhoneNumberFromString } = require('libphonenumber-js');

const validatePhoneNumber = (phoneNumber) => {
  try {
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
    return phoneNumberObj && phoneNumberObj.isValid();
  } catch (error) {
    return false;
  }
};

module.exports = { validatePhoneNumber };
