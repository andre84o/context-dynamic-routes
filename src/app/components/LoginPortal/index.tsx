"use client";

import { UseUserContext } from "@/utils/context";
import LoginPopupModal from "@/components/LoginPopupModal";

export default function LoginPortal() {
  const { showLogin, closeLogin } = UseUserContext();
  return <LoginPopupModal open={showLogin} onClose={closeLogin} />;
}
