/*
  v111 iOS-aware redirect resolver
  Drop-in patch for approved v110 baseline.
  Replace the current static upiApps/apps wiring with this block.
  Android behavior stays unchanged.
*/

const QA_UPI_PAYLOAD = "pa=test%40upi&pn=QATest&am=1.00&cu=INR";

function detectRedirectOs() {
  const ua = navigator.userAgent || "";
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  const maxTouch = navigator.maxTouchPoints || 0;
  const source = (ua + " " + platform).toLowerCase();
  if (/android/.test(source)) return "android";
  if (/iphone|ipad|ipod/.test(source) || (/mac/.test(source) && maxTouch > 1)) return "ios";
  if (/win/.test(source)) return "windows";
  if (/mac/.test(source)) return "macos";
  return "other";
}

const IOS_APP_STORE = {
  phonepe: "https://apps.apple.com/in/app/phonepe-secure-payments-app/id1170055821",
  paytm: "https://apps.apple.com/in/app/paytm-secure-upi-payments/id473941634"
};

const PLATFORM_REDIRECTS = {
  facebook: {
    android: "fb://profile",
    ios: "https://www.facebook.com/",
    windows: "https://www.facebook.com/",
    macos: "https://www.facebook.com/",
    other: "https://www.facebook.com/"
  },
  phonepeUpi: {
    android: `phonepe://pay?${QA_UPI_PAYLOAD}`,
    ios: `phonepe://pay?${QA_UPI_PAYLOAD}`,
    windows: "https://www.phonepe.com/",
    macos: "https://www.phonepe.com/",
    other: `upi://pay?${QA_UPI_PAYLOAD}`
  },
  paytmUpi: {
    android: `paytmmp://pay?${QA_UPI_PAYLOAD}`,
    ios: `paytmmp://pay?${QA_UPI_PAYLOAD}`,
    windows: "https://paytm.com/",
    macos: "https://paytm.com/",
    other: `upi://pay?${QA_UPI_PAYLOAD}`
  }
};

function openIosSchemeWithSilentFallback(primaryUrl, fallbackUrl) {
  let pageHidden = false;
  const onVisibility = () => {
    if (document.hidden) pageHidden = true;
  };
  document.addEventListener("visibilitychange", onVisibility, { once: true });
  window.location.href = primaryUrl;
  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onVisibility);
    if (!pageHidden && document.visibilityState === "visible" && fallbackUrl) {
      window.location.href = fallbackUrl;
    }
  }, 1400);
}

function openPlatformRedirect(key, label) {
  const os = detectRedirectOs();
  const config = PLATFORM_REDIRECTS[key];
  const target = config && (config[os] || config.other);
  if (!target) return;

  if (os === "ios" && key === "phonepeUpi") {
    return openIosSchemeWithSilentFallback(target, IOS_APP_STORE.phonepe);
  }
  if (os === "ios" && key === "paytmUpi") {
    return openIosSchemeWithSilentFallback(target, IOS_APP_STORE.paytm);
  }
  window.location.href = target;
}

// UPI buttons: replaces the previous static upiApps array wiring.
const upiApps = [
  ["PhonePe UPI", "phonepeUpi"],
  ["Paytm UPI", "paytmUpi"]
];
upiApps.forEach(([label, key]) => {
  const button = document.createElement("button");
  button.className = "btn green";
  button.textContent = label;
  button.onclick = () => openPlatformRedirect(key, label);
  el("payments").appendChild(button);
});

// Redirect buttons: replaces the previous apps array wiring.
const apps = [
  ["Telegram", "tg://resolve?domain=nsqmarket"],
  ["Viber", "viber://"],
  ["WhatsApp", "whatsapp://send?text=hello"],
  ["Instagram", "instagram://app"],
  ["TikTok", "snssdk1233://"],
  ["Facebook", "facebook"],
  ["Дія", "diia://"]
];
apps.forEach(([label, target]) => {
  const button = document.createElement("button");
  button.className = "btn red";
  button.textContent = label;
  button.onclick = () => {
    if (label === "Facebook") return openPlatformRedirect("facebook", label);
    window.location.href = target;
  };
  el("apps").appendChild(button);
});
