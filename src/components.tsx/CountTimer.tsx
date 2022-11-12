import React, { useEffect, useState, memo } from "react";

const CountTimer = () => {
  useEffect(() => {

    console.log('seconds : ', Math.floor(new Date().getTime() / 1000));
    console.log('minutes :', (new Date().getFullYear() + 80));



    console.log(Math.floor(new Date().getTime() / 1000));
  }, []);
  return <>0000</>;
};

export default memo(CountTimer);
