
const validate = (formProps) => {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address';
  }
  if (!formProps.firstname) {
    errors.firstname = 'Required';
  }
  if (!formProps.lastname) {
    errors.lastname = 'Required';
  }
  if (!formProps.userName) {
    errors.userName = 'Required';
  }
  // if (!formProps.phoneNumbers.phoneNumber) {
  //   errors.phoneNumbers = 'Required';
  // }
  return errors;
};

export default validate;
