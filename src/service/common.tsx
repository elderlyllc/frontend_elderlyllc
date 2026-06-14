const apiLocalRootURL = "http://localhost:8080";
const serverRootURL = "http://18.188.56.154:8000";

// Determine which API root URL to use based on the environment
//const apiRootURL = process.env.NODE_ENV === 'development' ? apiLocalRootURL : serverRootURL;
const apiRootURL = serverRootURL;
const apiEndpoints = {
  login: `${apiRootURL}/api/login`,
  register: `${apiRootURL}/api/register`,
  forgetPassword: `${apiRootURL}/api/forget-password`,
  sendOtp: `${apiRootURL}/api/send-otp`,
  verifyOtp: `${apiRootURL}/api/verify-otp`,
  getUpcomingServices: `${apiRootURL}/api/upcoming-services`,

  subscriptionList: `${apiRootURL}/api/subscriptions`,

  // Cart APIs
  addtocart: `${apiRootURL}/api/add-cart`,
  getcart: `${apiRootURL}/api/carts`,
  getCartDetails: (id: number) => `${apiRootURL}/api/cart-details/${id}`,
  updateCartStatus: (id: number) => `${apiRootURL}/api/cart-status/${id}`,

  //Payment APIs
  createPaymentIntent: `${apiRootURL}/api/create-payment-intent`,
   savePaymentStatus: `${apiRootURL}/api/payment/save-status`,

  updateUserDetails: (id: number) => `${apiRootURL}/api/user/${id}/details`,
  saveCartDetails: `${apiRootURL}/api/cart-details/save`,

  //Profile APIs
  getProfile: (id: number) => `${apiRootURL}/api/user/${id}`,

  //Notification APIs
getNotifications: (userId: number) => `${apiRootURL}/api/notifications/${userId}`,
createNotification: `${apiRootURL}/api/notifications`,
markNotificationRead: (id: number) => `${apiRootURL}/api/notifications/read/${id}`,
markAllNotificationsRead: (userId: number) =>
  `${apiRootURL}/api/notifications/read-all/${userId}`,
deleteNotification: (id: number) => `${apiRootURL}/api/notifications/${id}`,


//Mapping
getPincodeMapping: `${apiRootURL}/api/subscription-pincode-mappings`,

  baseURL: apiRootURL,
};


export default apiEndpoints;
