import { MessageType, postMessage } from "@/helpers/messageHelper";
import { IUserInfo } from "@/store/user";

export const AppConfig = {
  site_name: "Starter",
  title: "Nextjs Starter",
  description: "Starter code for your Nextjs Boilerplate with Tailwind CSS",
  locale: "en",
};

// @TODO 백엔드 통신으로 변경예정
export const hasUserInfo = () => {
  return (
    localStorage.getItem("birthday") &&
    localStorage.getItem("name") &&
    localStorage.getItem("sex")
  );
};

export const removeUserInfo = () => {
  postMessage({type: MessageType.removeUserINfo})
};