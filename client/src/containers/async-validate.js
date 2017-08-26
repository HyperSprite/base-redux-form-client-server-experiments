import axios from 'axios';

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

const getUserNameExact = (fP) => {
  const relURL = `/apiv1/autocomplete/user?lookupType=userName&lookupExact=true&exclusive=true&lookupValue=${fP.userName}`;
  return axios.get(relURL, axiosConfig);
};

const asyncValidate = async (formProps, dispatch, fields) => {
  const errors = {};
  console.log('asyncValidate ------------------  1  --', formProps, fields.formValues.contentName);
  if (fields.formValues.contentName !== 'userName') {
    return errors;
  }

  const result = await getUserNameExact(formProps);
  console.log(result.data);
  if (result.data.length !== 0) {
    throw { userName: 'That username is taken' };
  }
  return errors;
};

export default asyncValidate;
