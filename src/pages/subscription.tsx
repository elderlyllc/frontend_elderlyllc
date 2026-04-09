import React, { useRef, useState,useEffect, use } from "react";
import { IonButton, IonContent, IonIcon } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import "./Subscription.css";
import { leafOutline, star, diamond } from "ionicons/icons";
import {subscriptionList}  from "../service/Subscription";

type PlanId = "basic" | "standard" | "premium";

const Subscription: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const contentRef = useRef<any>(null);
  const planRefs = useRef<Record<PlanId, HTMLDivElement | null>>({
    basic: null,
    standard: null,
    premium: null,
  });

  const plans = [
    {
      id: "basic" as PlanId,
      name: "Basic",
      price: "$19.99",
      icon: leafOutline,
    },
    {
      id: "standard" as PlanId,
      name: "Standard",
      price: "$29.99",
      icon: star,
      best: true,
    },
    {
      id: "premium" as PlanId,
      name: "Premium",
      price: "$49.99",
      icon: diamond,
    },
  ];
  useEffect(() => {
    //call subscription API to get the current subscription status and update the UI accordingly
    const fetchSubscription = async () => {
      try {
        const data = await subscriptionList();
        console.log("Subscription data:", data);
        setSubscriptionData(data);
        // Update UI based on subscription status if needed
      } catch (error: any) {
        console.error("Error fetching subscription data:", error.message);
      }
    };

    fetchSubscription();
  },[]);

  const handleSubscribe = (planId: PlanId) => {
    alert(`Subscribed to ${planId}`);
  };

  const scrollToPlan = async (planId: PlanId) => {
    const el = planRefs.current[planId];
    const content = contentRef.current;
    if (!el || !content || typeof content.scrollToPoint !== "function") return;

    const y = Math.max(el.offsetTop - 16, 0);
    await content.scrollToPoint(0, y, 350);
  };

  const handlePlanClick = (planId: PlanId) => {
    const next = selectedPlan === planId ? null : planId;
    setSelectedPlan(next);

    if (next) {
      setTimeout(() => {
        scrollToPlan(planId);
      }, 120);
    }
  };

  const renderDetails = (planId: PlanId) => {
    switch (planId) {
      case "basic":
        return (
          <>
            <li>Limited features</li>
            <li>Email support</li>
            <li>Ideal for individuals</li>
          </>
        );
      case "standard":
        return (
          <>
            <li>All Basic features</li>
            <li>Priority support</li>
            <li>Best value for most users</li>
          </>
        );
      case "premium":
        return (
          <>
            <li>All Standard features</li>
            <li>24/7 premium support</li>
            <li>Advanced analytics</li>
          </>
        );
    }
  };

  return (
    <MainLayout>
      <IonContent ref={contentRef} fullscreen className="subscription-page">
        <div className="subscription-shell">
          <div className="subscription-header">
            <h2 className="subscription-title">Subscription Plan</h2>
            <p className="subscription-subtitle">
              Choose the plan that fits you best
            </p>
            {subscriptionData && (
              <p className="current-subscription">
                Current Subscription: {subscriptionData.currentPlan || 'None'}
              </p>
            )}
          </div>

          <div className="plans-list">
            {plans.map((plan) => (
              <div
                key={plan.id}
                ref={(el) => {
                  planRefs.current[plan.id] = el;
                }}
                className="plan-item"
              >
                <div
                  className={`plan-card ${selectedPlan === plan.id ? "active" : ""}`}
                  onClick={() => handlePlanClick(plan.id)}
                >
                  {plan.best && <div className="best-badge">Best Value</div>}

                  <div className="plan-icon-wrap">
                    <IonIcon icon={plan.icon} className="plan-icon" />
                  </div>

                  <div className="plan-name">{plan.name}</div>

                  <div className="plan-price">{plan.price}</div>
                  <div className="plan-period">/month</div>

                  <IonButton
                    className="subscribe-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan.id);
                    }}
                  >
                    Subscribe
                  </IonButton>
                </div>

                {selectedPlan === plan.id && (
                  <div className="plan-details-wrap">
                    <div className="plan-details-arrow" />
                    <div className="plan-details-card">
                      <button
                        type="button"
                        className="close-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(null);
                        }}
                      >
                        ✕
                      </button>

                      <h3 className="details-heading">
                        {plan.name} Plan Details
                      </h3>

                      <ul className="details-list">{renderDetails(plan.id)}</ul>

                      <IonButton
                        expand="block"
                        className="details-subscribe-btn"
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        Subscribe
                      </IonButton>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="skip-container">
          <IonButton className="skip-btn" onClick={() => console.log("skip")}>
            Skip
          </IonButton>
        </div>
      </IonContent>
    </MainLayout>
  );
};

export default Subscription;
