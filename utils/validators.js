
const validateName = (name) => {
  const nameRegex = new RegExp(/^[A-Za-z][A-Za-z]+[a-zA-Z]$/);
  return nameRegex.test(name);
}

const validateEmail = (email) => {
  const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  return emailRegex.test(email);
}

const validatePassword = (password) => {
  const passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  
  return passwordRegex.test(password);
}

module.exports = {
  validateName,
  validateEmail,
  validatePassword
}