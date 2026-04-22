import {
  IonContent,
  IonIcon
} from "@ionic/react";

import MainLayout from "./layout/mainLayout";
import { logoApple } from "ionicons/icons";
import React, { useState,useEffect } from "react";
import { IonToast } from "@ionic/react";
import {loginUser}  from "../service/AuthicationService";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";



const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
  let token =  localStorage.getItem("token");
  if(token){
    history.push("/dashboard");
  }
}, []);
  const submit = async () => {
  if (!email) {
    setToastMessage("Email is required");
    setShowToast(true);
    return;
  }

  if (!password) {
    setToastMessage("Password is required");
    setShowToast(true);
    return;
  }

  try {
    const data = await loginUser(email, password);

    console.log("Login successful:", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user_id",data.user_id);
    if(data.token){
       
     history.push("/subscription");
    }

  } catch (error: any) {
    console.log("Login failed:", error);
    const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Login failed";
    setToastMessage(errorMessage);
    setShowToast(true);
  }

  // console.log("Email:", email);
  // console.log("Password:", password);
};
const GoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success:", tokenResponse);
    },
    onError: () => {
      console.log("Login Failed");
    }
  });


  return (
    <MainLayout>
      <IonContent fullscreen className="ion-padding">

        {/* Login Section */}
        <div className="login-container">
          <h3>Welcome Back!</h3>
          <h4>Sign In to your account</h4>
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            onDidDismiss={() => setShowToast(false)}
            duration={2000}
            position="top"
            color="danger"
          />
          <input
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/forget-password" className="login-forgot-link">
            Forgot Password
          </a>
          <button className="login-continue-btn" onClick={submit}>
            Continue
          </button>
          <div className="login-divider">OR</div>
          <div className="login-social-wrapper">
            <button
              className="login-social-btn"
              onClick={() => GoogleLogin()}
            >
              <img
                className="login-social-icon"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Continue with Google
            </button>
            <button className="login-social-btn">
              <IonIcon icon={logoApple} className="login-social-icon" />
              Continue with Apple
            </button>
          </div>
          <div className="login-signup-section">
            Don't have an account? <a href="/registration" className="login-signup-link">Sign Up</a>
          </div>
        </div>

      </IonContent>
    </MainLayout>
  );
};

export default Login;
