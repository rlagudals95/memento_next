import { getOs, OS } from "./osHelper";

export interface MessagePacket {
  type: MessageType;
  body: any;
}

export enum MessageType {
  auth = "auth",
}

export const onMessage = (e: MessageEvent) => {
  const { type, data } = JSON.parse(e.data);

  switch (type) {
    case MessageType.auth:
      break;
    default:
      break;
  }
};

export const postMessage = (message: MessagePacket) => {
  if (getOs() === OS.ANDROID) {
    // @ts-ignore
    document.ReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  }
};
