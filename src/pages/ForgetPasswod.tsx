import { IonContent } from "@ionic/react";

import MainLayout from "./layout/mainLayout";
import React, { useState } from "react";
import { IonToast } from "@ionic/react";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const submit = () => {
    if (!email) {
      setToastMessage("Email is required");
      setShowToast(true);
      return;
    }
    console.log("Email:", email);
  };

  return (
    <MainLayout>
      <IonContent fullscreen className="ion-padding">
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Forget Password</h3>
          <h4 style={{ textAlign: "center" }}>
            Enter your email to reset your password
          </h4>
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            onDidDismiss={() => setShowToast(false)}
            duration={2000}
            position="top"
            color="danger"
          />
          <input
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "12px",
              borderRadius: "8px",
              background: "#f59e7d",
              color: "#fff",
              border: "none",
            }}
            onClick={submit}
          >
            Continue
          </button>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default ForgetPassword;
