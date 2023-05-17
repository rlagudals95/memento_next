import { getOs, OS } from "./osHelper";

export interface MessagePacket {
  type: string;
  body: any;
}

export const onMessage = (e: MessageEvent) => {
  const { type, data } = JSON.parse(e.data);

  switch (type) {
    case "test":
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
