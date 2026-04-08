import {
  IonContent,
  IonIcon
} from "@ionic/react";

import MainLayout from "./layout/mainLayout";
import { logoApple } from "ionicons/icons";
import React, { useState } from "react";
import { IonToast } from "@ionic/react";
import { registerUser } from "../service/AuthicationService";
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';


const Registration: React.FC = () => {
   const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const submit = async () => {

    if (!fullName) {
      setToastMessage("Full Name is required");
      setShowToast(true);
      return;
    }

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
        const data = await registerUser(fullName, email, password);
    
        console.log("Registration successful:", data);
        localStorage.setItem("token", data.token);
        if(data.token){
           
         history.push("/login");
        }
    
      } catch (error: any) {
        setToastMessage(error.message);
        setShowToast(true);
      }

    // console.log("Full Name:", fullName);
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
  // async function onAppleButtonPress() {
  //   // Start the sign-in request
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });

  //   console.log('Apple login response:', appleAuthRequestResponse);

  //   // Example: send identityToken to backend for validation
  //   if (appleAuthRequestResponse.identityToken) {
  //     // send token to server
  //   }
  // }

  return (
    <MainLayout>
      <IonContent fullscreen className="ion-padding">


        {/* Registration Section */}
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ textAlign: "center" }}>Create an Account</h3>
          <h4 style={{ textAlign: "center" }}>Sign Up to get started</h4>
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            onDidDismiss={() => setShowToast(false)}
            duration={2000}
            position="top"
            color="danger"
          />
          <input
            placeholder="Full Name"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            placeholder="Email  "
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            borderRadius: "8px",
            background: "#f59e7d",
            color: "#fff",
            border: "none"
          }}
            onClick={submit}>
            Continue
          </button>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            OR
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px"
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                fontWeight: "500",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
              }}
              onClick={() => GoogleLogin()}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                style={{ width: "20px", height: "20px" }}
              />
              Continue with Google
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                fontWeight: "500",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
              }}
              // onClick={onAppleButtonPress}
            >
              <IonIcon icon={logoApple} style={{ fontSize: "20px" }} />
              Continue with Apple
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have an account? <a href="/login" style={{ color: "#f59e7d", textDecoration: "underline" }}>Sign Up</a>
          </div>
        </div>

      </IonContent>
    </MainLayout>
  );
};

export default Registration;
