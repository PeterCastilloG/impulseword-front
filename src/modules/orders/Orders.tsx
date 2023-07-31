"use client";
import { IOrdersContentPage } from "./interfaces/orders.interface";
import { useState } from "react";
import { clsx } from "@/shared/lib/clsx";
import { verifyInvoiceChallengeOrder } from "./services/orders.services";
import { UserAuth } from "@/shared/interfaces/auth";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from "./Orders.module.scss";
import DesktopOrders from "./components/desktop-orders/Desktop-orders";
import MobileOrders from "./components/mobile-orders/Mobile-orders";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function OrdersPage({
  ordersPage,
  userAuth,
}: {
  ordersPage: IOrdersContentPage;
  userAuth: UserAuth;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePayChallenge({
    challengeOrderId,
  }: {
    challengeOrderId: number;
  }) {
    router.push("/challenge/invoice/" + challengeOrderId);
  }

  async function handleVerifyChallengOrder({
    challengeOrderId,
  }: {
    challengeOrderId: number;
  }) {
    setLoading(true);
    const { success, data, kindMessage } = await verifyInvoiceChallengeOrder({
      ...userAuth,
      challengeOrderId,
    });
    setLoading(false);
    if (success) {
      router.push("/challenge/invoice/" + data.challengeOrderId);
    } else {
      const message = kindMessage ?? "Ha ocurrido un error inseperado";
      toast.error(message);
    }
  }

  return (
    <div className={clsx(styles.container, loading && styles.ableBtns)}>
      <div className={styles.details}>
        <span>{ordersPage.title}</span>
        <p>{ordersPage.description}</p>
      </div>
      <div className={styles.content}>
        <DesktopOrders
          orderPage={ordersPage}
          handlePayChallenge={handlePayChallenge}
          handleVerifyChallengOrder={handleVerifyChallengOrder}
        />
        <MobileOrders
          orderPage={ordersPage}
          handlePayChallenge={handlePayChallenge}
          handleVerifyChallengOrder={handleVerifyChallengOrder}
        />
        {ordersPage.pages.length > 1 && (
          <div className={styles.pages}>
            <Link
              href={"/challenge/orders?page=" + ordersPage.pages[0] ?? 1}
              prefetch
            >
              <IoIosArrowBack />
            </Link>
            {ordersPage.pages.map((item) => (
              <Link href={"/challenge/orders?page=" + item} prefetch key={item}>
                {item}
              </Link>
            ))}
            <Link
              href={
                "/challenge/orders?page=" +
                  ordersPage.pages[ordersPage.pages.length - 1] ?? 1
              }
              prefetch
            >
              <IoIosArrowForward />
            </Link>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
