import { IonContent } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import React, { useState, useEffect } from "react";
import { IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { sendOtp } from "../service/AuthicationService";

const ServiceLogin: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      history.push("/dashboard");
    }
  }, []);

  const submit = async () => {
    if (!email) {
      setToastMessage("Email is required");
      setShowToast(true);
      return;
    }

    try {
      const response = await sendOtp(email);
      console.log("OTP sent successfully:", response);
      setToastMessage("OTP sent to your email");
      setShowToast(true);
      // TODO: Navigate to OTP verification page after success
      // history.push("/verify-otp");
    } catch (error: any) {
      console.log("OTP send failed:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to send OTP";
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  return (
    <MainLayout>
      <IonContent fullscreen className="service-login-wrapper">
        {/* Service Login Section */}
        <div className="login-container">
          <h3>Welcome!</h3>
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
            placeholder="Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login-continue-btn" onClick={submit}>
            Continue
          </button>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default ServiceLogin;
