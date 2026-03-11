import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon
} from "@ionic/react";

import { homeOutline, settingsOutline } from "ionicons/icons";
import MainLayout from "./layout/mainLayout";

const Home: React.FC = () => {
  return (
     <MainLayout>
     <IonContent fullscreen className="ion-padding">

        {/* Video Section */}
        <div style={{
          height: "200px",
          background: "#000",
          borderRadius: "10px",
          marginBottom: "20px"
        }}>
          <p style={{ color: "#fff", textAlign: "center", paddingTop: "80px" }}>
            Video Player
          </p>
        </div>

        {/* Login Section */}
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h2 style={{ textAlign: "center" }}>LOGIN</h2>

          <input
            placeholder="Username"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}
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
          />

          <button style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            borderRadius: "8px",
            background: "#f59e7d",
            color: "#fff",
            border: "none"
          }}>
            LOGIN
          </button>
        </div>

      </IonContent>
      </MainLayout>
  );
};

export default Home;
