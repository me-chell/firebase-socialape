const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  return false;
};

exports.validateSignupData = (newUser) => {
  let errors = {};

  if (!isEmail(newUser.email)) errors.email = 'Must be a valid email address';
  if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (user) => {
  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (details) => {
  let userDetails = {};
  if (!isEmpty(details.bio.trim())) userDetails.bio = details.bio;
  if (!isEmpty(details.website.trim())) {
    // https://website.com
    if (details.website.trim().substring(0, 4) !== 'http')
      userDetails.website = `http://${details.website.trim()}`;
    else userDetails.website = details.website;
  }
  if (!isEmpty(details.location.trim()))
    userDetails.location = details.location;

  return userDetails;
};
