const apiRootURL = 'http://localhost:8080';

const apiEndpoints = {
  login: `${apiRootURL}/api/login`,
  register: `${apiRootURL}/api/register`,
  forgetPassword: `${apiRootURL}/api/forget-password`,
};

export default apiEndpoints;