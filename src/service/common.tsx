const apiLocalRootURL = 'http://localhost:8080';
const serverRootURL = 'http://3.15.207.26:8000';

// Determine which API root URL to use based on the environment
//const apiRootURL = process.env.NODE_ENV === 'development' ? apiLocalRootURL : serverRootURL;
const apiRootURL = serverRootURL;

const apiEndpoints = {
  login: `${apiRootURL}/api/login`,
  register: `${apiRootURL}/api/register`,
  forgetPassword: `${apiRootURL}/api/forget-password`,
  baseURL: apiRootURL
};

export default apiEndpoints;