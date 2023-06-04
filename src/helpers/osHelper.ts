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

export const messageReceiver = (userAgent?: string) => {

  const agent = userAgent ?? navigator.userAgent;
  const isUIWebView = () => {
    return agent
      .toLowerCase()
      .match(/\(ip.*applewebkit(?!.*(version|crios))/)
  }

  return isUIWebView() ? window : document;
}
