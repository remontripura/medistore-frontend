// components/ProgressBar.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      if (!anchor || !anchor.href) return;

      const targetUrl = anchor.href;
      const currentUrl = window.location.href;
      const isExternal = !targetUrl.startsWith(window.location.origin);
      const isNewTab = (anchor.target ?? "").toLowerCase() === "_blank";

      if (isExternal || isNewTab) return;

      if (targetUrl === currentUrl) return;
      NProgress.start();
    };

    const attachListeners = () => {
      document.querySelectorAll<HTMLAnchorElement>("a").forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
        anchor.addEventListener("click", handleAnchorClick);
      });
    };

    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll<HTMLAnchorElement>("a").forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return null;
}
