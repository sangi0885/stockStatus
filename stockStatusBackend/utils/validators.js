const isNullOrUndefined = require('./nullOrUndefined');
const validator = require('validator');

/**
 * This method checks if the email is valid
 * @param {*} email
 * @returns boolean
 */
const isValidateEmail = email => {
  /**
   * we can use validator to validate email
   */
  return validator.isEmail(email);
};

/**
 * This method checks if the password is valid
 * password should be atleast 4 characters long and not null
 * @param {*} password
 * @returns boolean
 */
const isValidPassword = password => {
  if (isNullOrUndefined(password) || password.length < 4) {
    return false;
  }
  return true;
};

/**
 * This method checks if emailId and password provided are valid
 * email should be valid and not null
 * password should be atleast 4 characters long and not null
 * @param {*} password
 * @returns List of errors for better user understanding
 */
const isValidateEmailAndPass = (email, password) => {
  const errors = [];
  if (isNullOrUndefined(email) || isNullOrUndefined(password)) {
    errors.push('Email and password are required');
  }

  if (!isValidateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  if (!isValidPassword(password)) {
    errors.push('Please enter a password with at least 4 characters');
  }
  return errors;
};

/**
 * Verifies if the user details provided are valid
 * email should be valid and not null
 * roles valid role as our system has three
 * isActive should be boolean
 */
const isValidateUserToBeUpdated = details => {
  const { userId, email, roleId } = details;
  const errors = [];
  if (isNullOrUndefined(details)) {
    errors.push('No details to update');
  }

  if (!isValidateEmail(email)) {
    errors.push('Provided email address is invalid');
  }
  if (isNullOrUndefined(userId)) {
    errors.push('Invalid user id');
  }

  if (isNullOrUndefined(roleId)) {
    errors.push('Invalid role');
  }

  return errors;
};

const isPaintToBeUpdated = details => {
  const errors = [];
  console.log('details', details);
  if (isNullOrUndefined(details)) {
    errors.push('No details to update');
    return errors;
  }

  const { paintId, quantity } = details;
  if (
    !isValidateEmail(quantity) &&
    validator.isNumeric(quantity) &&
    quantity >= 0
  ) {
    errors.push('Please enter a valid quantity');
  }

  if (!isNullOrUndefined(paintId)) {
    errors.push('Invalid paint id');
  }
};

const isPaintToBeAdded = details => {
  const errors = [];
  console.log('details', details);
  if (isNullOrUndefined(details)) {
    errors.push('No details to update');
    return errors;
  }

  const { name, quantity } = details;
  if (isNullOrUndefined(quantity) || quantity < 0) {
    errors.push('Please enter a valid quantity');
  }

  if (isNullOrUndefined(name)) {
    errors.push('Invalid paint name');
  }

  return errors;
};

module.exports = {
  isValidateEmail,
  isValidPassword,
  isValidateEmailAndPass,
  isValidateUserToBeUpdated,
  isPaintToBeUpdated,
  isPaintToBeAdded
};
