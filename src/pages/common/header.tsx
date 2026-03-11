import { IonHeader, IonToolbar } from "@ionic/react";

const Header = () => (
  <IonHeader>
  <IonToolbar style={{ "--background": "#f5f5f5", textAlign: "center" }}>
    <img
      src="/logo.png"
      alt="logo"
      style={{ height: "55px" }}
    />
  </IonToolbar>
</IonHeader>
);

export default Header;
