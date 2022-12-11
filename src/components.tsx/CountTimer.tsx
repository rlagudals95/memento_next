import React, { useEffect, useState, useCallback, useRef, memo } from "react";
import { SEX } from "@/constants";
import { useRouter } from "next/router";

const CountTimer = () => {
  const router = useRouter();
  const [lifeSeconds, setLifeSeconds] = useState(0);

  const lifeExpectancy = useCallback(() => {
    const birthday = localStorage.getItem("birthday") as unknown as string;
    if (!birthday) {
      router.replace("/");
      return
    }
    const lifeExpectancyBySex =
      localStorage.getItem("sex") === SEX.FEMALE ? 80 : 83;

    // 기대 수명
    const lifeExpectancyDate =
      `${String(parseInt(birthday.substring(0, 4)) + lifeExpectancyBySex)}` +
      String(birthday.substr(4, 8));

    const lifeExpectancySeconds = new Date(lifeExpectancyDate).getTime() / 1000;

    // 현재
    const now = Math.floor(new Date().getTime() / 1000);

    // 남은 수명
    const livedSeconds = lifeExpectancySeconds - now;

    setLifeSeconds(livedSeconds);
  }, []);

  useEffect(() => {
    lifeExpectancy();
    const myInterval = setInterval(() => {
      setLifeSeconds((lifeSeconds) => lifeSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return <div>{lifeSeconds}</div>;
};

export default CountTimer;
