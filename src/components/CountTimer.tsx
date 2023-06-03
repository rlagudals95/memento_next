import React, { useEffect, useState, useCallback } from "react";
import { SEX } from "@/constants";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { FontSize } from "@/constants/style";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { removeUserInfo } from "@/utils/AppConfig";
import { useUserStore } from "@/store";

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
  const { userInfo } = useUserStore();

  const [lifeSeconds, setLifeSeconds] = useState(0);

  const lifeExpectancy = useCallback(() => {

    const birthday = userInfo?.birthday;

    if (!birthday) {
      router.replace("/");
      return
    }
    const lifeExpectancyBySex =
      userInfo.sex === SEX.FEMALE ? 80 : 83;

    // 기대 수명
    const lifeExpectancyDate =
      `${String(parseInt(birthday?.substring(0, 4), 10) + lifeExpectancyBySex)}${String(birthday?.substr(4, 8))}`;

    const lifeExpectancySeconds = new Date(lifeExpectancyDate).getTime() / 1000;

    // 현재
    const now = Math.floor(new Date().getTime() / 1000);

    // 남은 수명
    const _livedSeconds = lifeExpectancySeconds - now;

    setLifeSeconds(_livedSeconds);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.birthday) {
      // @TODO 백엔드 통신으로 모두 변경하자
      lifeExpectancy();
    }
    const myInterval = setInterval(() => {
      setLifeSeconds((lifeSeconds) => lifeSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [userInfo]);


  const handleClickReset = useCallback(() => {
    removeUserInfo();
    router.replace("/SettingPage");
  }, [])

  return (
    <Container>
      <Name>{userInfo.name}님의 남은 시간</Name>
      <LifeExpectancy>{lifeSeconds}</LifeExpectancy>
      <Birthday>{userInfo.birthday}</Birthday>
      <SettingsBackupRestoreIcon onClick={handleClickReset} style={{ marginTop: '50px' }} sx={{ fontSize: 35 }} />
    </Container>
  );
};

export default CountTimer;
