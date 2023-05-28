import React, { useEffect, useState, useCallback } from "react";
import { SEX } from "@/constants";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { FontSize } from "@/constants/style";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { removeUserInfo } from "@/utils/AppConfig";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
      `${String(parseInt(birthday?.substring(0, 4), 10) + lifeExpectancyBySex)}${ 
      String(birthday?.substr(4, 8))}`;

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


  const handleClickReset = useCallback(() => {
    // @TODO 서버 로직으로 변경할거 예요~
    removeUserInfo();
    router.replace("/SettingPage");
  }, [])

  return (
    <Container>
      <Name>{name}님의 남은 시간</Name>
      <LifeExpectancy>{lifeSeconds}</LifeExpectancy>
      <Birthday>{birthday}</Birthday>
      <SettingsBackupRestoreIcon onClick={handleClickReset} style={{ marginTop: '50px' }} sx={{ fontSize: 35 }} />
    </Container>
  );
};

export default CountTimer;
