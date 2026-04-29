import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonSpinner } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createPaymentIntent,
  savePaymentStatus,
} from "../service/PaymentService";
import { useHistory } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51TR1RdAMSPWZehVkdElOLapTUmCB5x3zrOvTQdIYhneYQwPiftC5cxMHxifxCNnpjXHWoRikQePyMAG9BfZZTdO900pPbFHIXL"
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const userId = localStorage.getItem("user_id");
      const cartId = localStorage.getItem("cart_id");
      const amount = localStorage.getItem("selected_subscription_value");

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (result.error) {
        await savePaymentStatus({
          user_id: userId ? Number(userId) : null,
          cart_id: cartId ? Number(cartId) : null,
          payment_intent_id:
            result.error.payment_intent?.id || `failed_${Date.now()}`,
          amount: amount ? Number(amount) : null,
          currency: "usd",
          status: "failed",
          failure_message: result.error.message,
        });

        alert(result.error.message);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        await savePaymentStatus({
          user_id: userId ? Number(userId) : null,
          cart_id: cartId ? Number(cartId) : null,
          payment_intent_id: result.paymentIntent.id,
          amount: amount ? Number(amount) : null,
          currency: result.paymentIntent.currency,
          status: result.paymentIntent.status,
          failure_message: null,
        });

        history.push("/tagging");
      }
    } catch (error: any) {
      alert(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-card card-soft">
     

      <div className="payment-element-wrap">
        <PaymentElement />
      </div>

      <IonButton
        expand="block"
        className="pay-btn"
        onClick={handlePay}
        disabled={!stripe || loading}
      >
        {loading ? <IonSpinner /> : "Pay Now"}
      </IonButton>
    </div>
  );
};

const StripePaymentPage: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(true);

  useEffect(() => {
    const initPayment = async () => {
      try {
        const amount =
          Number(localStorage.getItem("selected_subscription_value")) || 499;

        const data = await createPaymentIntent(amount);
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        alert(error.message || "Failed to initialize payment");
      } finally {
        setLoadingPayment(false);
      }
    };

    initPayment();
  }, []);

  return (
    <MainLayout>
      <IonContent fullscreen className="payment-page">
        <div className="payment-shell">
         

          {loadingPayment ? (
            <div className="payment-loader">
              <IonSpinner />
            </div>
          ) : clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          ) : (
            <p className="payment-error">Unable to load payment form.</p>
          )}
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default StripePaymentPage;