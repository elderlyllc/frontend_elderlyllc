const apiLocalRootURL = 'http://localhost:8080';
const serverRootURL = 'http://18.116.165.205:8000';

// Determine which API root URL to use based on the environment
//const apiRootURL = process.env.NODE_ENV === 'development' ? apiLocalRootURL : serverRootURL;
const apiRootURL = serverRootURL;

const apiEndpoints = {
  login: `${apiRootURL}/api/login`,
  register: `${apiRootURL}/api/register`,
  forgetPassword: `${apiRootURL}/api/forget-password`,
  subscriptionList: `${apiRootURL}/api/subscriptions`,
  baseURL: apiRootURL
};

export default apiEndpoints;