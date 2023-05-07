import React, { useEffect, useState, useCallback } from "react";
import { SEX } from "@/constants";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { FontSize } from "@/constants/style";

const CountTimer = () => {
  const router = useRouter();
  const [lifeSeconds, setLifeSeconds] = useState(0);
  const [name, setName] = useState(localStorage.getItem('name') || null)
  const [birthday, setBirthDay] = useState(localStorage.getItem("birthday" || null));

  const lifeExpectancy = useCallback(() => {
    if (!birthday) {
      router.replace("/");
      return
    }
    const lifeExpectancyBySex =
      localStorage.getItem("sex") === SEX.FEMALE ? 80 : 83;

    // 기대 수명
    const lifeExpectancyDate =
      `${String(parseInt(birthday?.substring(0, 4)) + lifeExpectancyBySex)}` +
      String(birthday?.substr(4, 8));

    const lifeExpectancySeconds = new Date(lifeExpectancyDate).getTime() / 1000;

    // 현재
    const now = Math.floor(new Date().getTime() / 1000);

    // 남은 수명
    const _livedSeconds = lifeExpectancySeconds - now;

    setLifeSeconds(_livedSeconds);
  }, []);

  useEffect(() => {
    // @TODO 백엔드 통신으로 모두 변경하자
    lifeExpectancy();

    const myInterval = setInterval(() => {
      setLifeSeconds((lifeSeconds) => lifeSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <Container>
      <Name>{name}님의 남은 시간</Name>
      <LifeExpectancy>{lifeSeconds}</LifeExpectancy>
      <Birthday>{birthday}</Birthday>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Name = styled.div`
  font-size: ${FontSize.Mideum};
`

const LifeExpectancy = styled.div`
  margin-top: 4px;
  font-size: ${FontSize.Large};
  font-weight: 700;
`

const Birthday = styled.div`
  margin-top: 5px;
  font-size: ${FontSize.Small};
  opacity: 0.5;
`

export default CountTimer;
