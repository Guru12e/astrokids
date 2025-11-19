"use client";

import { useCart } from "@/context/CardContext";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const paymentFunction = async () => {
    try {
      if (!session?.user?.email) {
        toast.error("Please login before checkout");
        router.push("/login");
        return;
      }

      setLoading(true);

      const orderResponse = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100,
          currency: "INR",
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData?.id) {
        toast.error("Unable to create payment order");
        setLoading(false);
        return;
      }

      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.id,
        name: "Astrokids",
        description: "Cart Checkout",
        handler: async function (response) {
          try {
            await fetch("/api/verifyOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const saveOrder = await fetch("/api/storeCartOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail: session.user.email,
                items: cart,
                totalAmount: total,
                razorpayOrderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              }),
            });

            if (saveOrder.status === 200) {
              localStorage.removeItem("cart");
              toast.success("Payment Successful!");
              router.push(`/cart-success?orderId=${orderData.id}`);
            } else {
              toast.error("Order save failed.");
            }
          } catch (e) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: session?.user?.name || "Customer",
          email: session?.user?.email,
        },
        theme: { color: "#314867" },
      };

      const paymentWindow = new window.Razorpay(paymentData);
      paymentWindow.open();

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-center text-[28px] md:text-[34px] font-bold text-[#02030B]">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-[18px] mt-10 text-gray-700">
          Your cart is empty.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-5 border-b pb-5"
              >
                <div className="w-28 h-28 relative">
                  <Image
                    src={item.image}
                    fill
                    className="object-cover rounded-xl"
                    alt={item.title}
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-[20px] font-semibold text-[#02030B]">
                    {item.title}
                  </h2>
                  <p className="text-gray-700 mt-1">₹ {item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <span className="text-[16px]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-5 flex justify-between items-center">
            <h3 className="text-[20px] font-bold">Total</h3>
            <p className="text-[22px] font-bold text-[#02030B]">₹ {total}</p>
          </div>

          <button
            onClick={paymentFunction}
            disabled={loading}
            className="w-full mt-8 bg-[#314867] hover:bg-[#253746] text-white py-3 rounded-xl text-[18px] font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
}
