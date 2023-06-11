export const PRODUCTION = process.env.NODE_ENV === "production";

export enum EnvType {
  LOCAL = "local",
  DEV = "development",
  PROD = "production"
}

export const backEndHost = () => {
  if (process.env.NODE_ENV === EnvType.PROD) {
    return "https://api-prod.com";
  } if (process.env.NODE_ENV === EnvType.DEV) {
    // @TODO - dev server 분리  
    return "http://localhost:3001";
  } 
    return "http://localhost:3001";
};


export enum SEX {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
