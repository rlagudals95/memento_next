import React, { useEffect, useState, useCallback, memo } from "react";
import { SEX } from "@/constants";

const CountTimer = () => {
  const [lifeSeconds, setLifeSeconds] = useState(0);
  const [test, setTest] = useState(1000);


  
  const setLifeExpectancyAndStartCounting = useCallback(() => {
    const birthday = localStorage.getItem("birthday") as unknown as string;
    const lifeExpectancyBySex =
      localStorage.getItem("sex") === SEX.FEMALE ? 80 : 83;

    const lifeExpectancyDate =
      `${String(parseInt(birthday.substring(0, 4)) + lifeExpectancyBySex)}` +
      String(birthday.substr(4, 8));
    const lifeExpectancySeconds = new Date(lifeExpectancyDate).getTime() / 1000;

    setLifeSeconds(lifeExpectancySeconds);
  }, []);

  useEffect(() => {
    setLifeExpectancyAndStartCounting();

    function setTimeOutRecursion() {
      setTimeout(function () {
        console.log("count")
        setTest(test - 1);
        setTimeOutRecursion();
      }, 1000);
    }

    setTimeOutRecursion();
    // /return setTimeOutRecursion();
  }, []);

  return <>{test}</>;
};

export default memo(CountTimer);
