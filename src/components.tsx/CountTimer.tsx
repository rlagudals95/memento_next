import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import { SEX } from "@/constants";
import { useRouter } from "next/router";

const CountTimer = () => {
  const router = useRouter();
  const counterRef = useRef<HTMLInputElement>(null);
  const [lifeSeconds, setLifeSeconds] = useState(0);

  const lifeExpectancy = useCallback(() => {
    const birthday = localStorage.getItem("birthday") as unknown as string;
    if (!birthday) {
      router.replace("/");
    }
    const lifeExpectancyBySex =
      localStorage.getItem("sex") === SEX.FEMALE ? 80 : 83;

    const lifeExpectancyDate =
      `${String(parseInt(birthday.substring(0, 4)) + lifeExpectancyBySex)}` +
      String(birthday.substr(4, 8));

    const lifeExpectancySeconds = new Date(lifeExpectancyDate).getTime() / 1000;
    setLifeSeconds(lifeExpectancySeconds);
    return lifeExpectancySeconds;
  }, []);


  const renewalLifeExpectancy = useCallback(() => {
    localStorage.setItem("lifeSeconds", String(counterRef?.current?.value));
  }, [lifeSeconds]);

  useEffect(() => {
    lifeExpectancy();
    const myInterval = setInterval(() => {
      setLifeSeconds((lifeSeconds) => lifeSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
      
      renewalLifeExpectancy();
    };
  }, []);

  return (
    <div>
      <input onChange={(e) => {console.log('ccc', e)}} readOnly={true} type="text" ref={counterRef} value={lifeSeconds} />
    </div>
  );
};

export default CountTimer;
