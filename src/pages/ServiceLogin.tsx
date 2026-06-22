import { IonContent } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import React, { useState, useEffect } from "react";
import { IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "../service/AuthicationService";
import { setToken, setRoleId } from "../features/loginSlice";

const ServiceLogin: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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
      setOtpSent(true);
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

  const verifyOtpSubmit = async () => {
    if (!otp) {
      setToastMessage("OTP is required");
      setShowToast(true);
      return;
    }

    try {
      const response = await verifyOtp(email, otp);
      console.log("OTP verified successfully:", response);

      // Persist token and user info
      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", String(response.user_id));
      localStorage.setItem("role_id", String(response.user.role_id));

      // Update Redux store
      dispatch(setToken(response.token));
      dispatch(setRoleId(response.user.role_id));

      setToastMessage("OTP verified successfully");
      setShowToast(true);

      // Navigate based on role
      if (response.user.role_id === 3) {
        history.push("/pmapping");
      } else {
        history.push("/dashboard");
      }
    } catch (error: any) {
      console.log("OTP verification failed:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to verify OTP";
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
          
          {!otpSent ? (
            <>
              <input
                className="login-input"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="login-continue-btn" onClick={submit}>
                Continue
              </button>
            </>
          ) : (
            <>
              <input
                className="login-input"
                placeholder="Registered Email"
                value={email}
                disabled
              />
              <input
                className="login-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="login-continue-btn" onClick={verifyOtpSubmit}>
                Verify OTP
              </button>
              <button 
                className="login-continue-btn" 
                onClick={() => setOtpSent(false)}
                style={{ marginTop: "10px", backgroundColor: "#ccc", color: "#333" }}
              >
                Change Email
              </button>
            </>
          )}
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default ServiceLogin;
