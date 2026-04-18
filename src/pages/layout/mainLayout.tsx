import { IonPage, IonContent, IonHeader, IonToolbar, IonFooter } from "@ionic/react";
import Header from "../common/header";
import Footer from "../common/footer";
import { useLocation } from "react-router-dom";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <IonPage>
      <Header />

      <IonContent fullscreen>
        {children}
      </IonContent>
    { location.pathname !== "/login"  && location.pathname !== "/forget-password" && location.pathname !== "/subscription" && location.pathname !== "/registration" && location.pathname !== "/tagging" &&
        <Footer />
    }
    
    
    </IonPage>
  );
};

export default MainLayout;
