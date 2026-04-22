import React, { useRef, useState, useEffect } from "react";
import { IonButton, IonContent, IonIcon } from "@ionic/react";
import MainLayout from "./layout/mainLayout";
import { leafOutline, star, diamond } from "ionicons/icons";
import { subscriptionList } from "../service/Subscription";
import { addCart } from "../service/Cart";
import { useHistory } from "react-router-dom";

interface SubscriptionDetail {
  id: number;
  subscription_id: number;
  monthly: boolean;
  yearly: boolean;
  amount: string;
  created_at: string;
  created_by: number;
}

interface ApiSubscriptionData {
  id: number;
  subscription_type: string;
  created_at: string;
  updated_at: string;
  details: SubscriptionDetail[];
}

interface Plan {
  id: string | number;
  name: string;
  price: string;
  icon: string;
  best?: boolean;
  subscriptionId: number;
  details?: SubscriptionDetail[];
}

const Subscription: React.FC = () => {
  const history = useHistory();
  const [selectedPlan, setSelectedPlan] = useState<string | number | null>(null);
  const [subscriptionDataList, setSubscriptionDataList] = useState<ApiSubscriptionData[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<any>(null);
  const planRefs = useRef<Record<string | number, HTMLDivElement | null>>({});

  const iconMap: Record<string, string> = {
    basic: leafOutline,
    standard: star,
    premium: diamond,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }, [history]);

  const transformSubscriptionsToPlans = (data: ApiSubscriptionData[]): Plan[] => {
    return data.map((subscription, index) => {
      const detail = subscription.details[0];
      const typeLower = subscription.subscription_type.toLowerCase();

      return {
        id: subscription.id,
        name:
          subscription.subscription_type.charAt(0).toUpperCase() +
          subscription.subscription_type.slice(1),
        price: `$${detail?.amount || "0.00"}`,
        icon: iconMap[typeLower] || star,
        subscriptionId: subscription.id,
        details: subscription.details,
        best: index === 1,
      };
    });
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await subscriptionList();
        console.log("Subscription data:", data);
        setSubscriptionDataList(data);
        const transformedPlans = transformSubscriptionsToPlans(data);
        setPlans(transformedPlans);
      } catch (error: any) {
        console.error("Error fetching subscription data:", error.message);
      }
    };

    fetchSubscription();
  }, []);

  const handleSubscribe = async (planId: string | number, planName: string) => {
    try {
      setLoading(true);

      const selectedPlanData = plans.find((plan) => plan.id === planId);

      if (!selectedPlanData) {
        throw new Error("Selected plan not found");
      }

      const firstDetail = selectedPlanData.details?.[0];

      const userId = localStorage.getItem("user_id");

      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      const payload = {
        customer_id: Number(userId),
        createdBy: Number(userId),
        subscription_id: selectedPlanData.subscriptionId,
        subscription_value: firstDetail?.amount ? Number(firstDetail.amount) : 0,
        isactive: true,
        is_default: true,
      };

      console.log("Adding cart with payload:", payload);

      const response = await addCart(payload);

      console.log(`Subscribed to plan: ${planName} (ID: ${planId})`);
      console.log("Cart created successfully:", response);

      localStorage.setItem("selected_subscription_id", String(selectedPlanData.subscriptionId));
      localStorage.setItem(
        "selected_subscription_value",
        String(firstDetail?.amount || 0)
      );

      if (response?.data?.id) {
        localStorage.setItem("cart_id", String(response.data.id));
      }

      if (response?.data?.cardnumber) {
        localStorage.setItem("card_number", response.data.cardnumber);
      }

      history.push("/tagging");
    } catch (error: any) {
      console.error("Error adding cart:", error.message);
      alert(error.message || "Failed to add cart");
    } finally {
      setLoading(false);
    }
  };

  const scrollToPlan = async (planId: string | number) => {
    const el = planRefs.current[planId];
    const content = contentRef.current;
    if (!el || !content || typeof content.scrollToPoint !== "function") return;

    const y = Math.max(el.offsetTop - 16, 0);
    await content.scrollToPoint(0, y, 350);
  };

  const handlePlanClick = (planId: string | number) => {
    const next = selectedPlan === planId ? null : planId;
    setSelectedPlan(next);

    if (next) {
      setTimeout(() => {
        scrollToPlan(planId);
      }, 120);
    }
  };

  const renderDetailsTable = (plan: Plan) => {
    if (!plan.details || plan.details.length === 0) {
      return <p>No details available</p>;
    }

    return (
      <div className="details-table-wrap">
        <table className="details-table">
          <thead>
            <tr>
              <th>Detail ID</th>
              <th>Amount</th>
              <th>Billing Period</th>
              <th>Monthly</th>
              <th>Yearly</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {plan.details.map((detail) => (
              <tr key={detail.id}>
                <td>{detail.id}</td>
                <td>${detail.amount}</td>
                <td>
                  {detail.monthly ? "Monthly" : ""} {detail.yearly ? "Yearly" : ""}
                </td>
                <td>{detail.monthly ? "✓" : "✗"}</td>
                <td>{detail.yearly ? "✓" : "✗"}</td>
                <td>{new Date(detail.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
            {subscriptionDataList.length > 0 && (
              <p className="current-subscription">
                Available Plans: {subscriptionDataList.length}
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
                    disabled={loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan.id, plan.name);
                    }}
                  >
                    {loading ? "Please wait..." : "Subscribe"}
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

                      <h4 className="pricing-details-heading">Pricing & Billing Options</h4>
                      {renderDetailsTable(plan)}

                      <IonButton
                        expand="block"
                        className="details-subscribe-btn"
                        disabled={loading}
                        onClick={() => handleSubscribe(plan.id, plan.name)}
                      >
                        {loading ? "Please wait..." : "Subscribe"}
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