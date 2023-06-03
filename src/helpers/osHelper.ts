import document from "next/document";

export enum OS {
  ANDROID = "ANDROID",
  IOS = "IOS",
}

export const getOs = (): OS => {
  const UA = navigator.userAgent.toLowerCase();

  if (UA.indexOf("android") > -1) {
    return OS.ANDROID;
  }

  return OS.IOS;
};

export const messageReceiver = () => {
  const isUIWebView = () => {
    return navigator.userAgent
      .toLowerCase()
      .match(/\(ip.*applewebkit(?!.*(version|crios))/)
  }

  return isUIWebView() ? window : document;
}
