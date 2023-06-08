import { getOs, OS } from "./osHelper";

export interface MessagePacket {
  type: MessageType;
  body?: any;
}

export enum MessageType {
  auth = "auth",
  hasUserInfo = "hasUserInfo",
  setUserInfo = "setUserInfo",
  removeUserINfo = "removeUserInfo"
}

export const onMessage = (e: MessageEvent) => {
  const { type } = JSON.parse(e.data);

  switch (type) {
    case MessageType.auth:
      break;
    default:
      break;
  }
};

export const isMobile = (): boolean => {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ]

  return mobileRegex.some(mobile => window.navigator.userAgent.match(mobile))
}


export const postMessage = (message: MessagePacket) => {
  if(!isMobile()) return;

  // @ts-ignore
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
  
};
