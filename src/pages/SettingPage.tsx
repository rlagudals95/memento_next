import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import styled from "@emotion/styled";
import { hasUserInfo } from "@/utils/AppConfig";
import { MessageType, postMessage } from "@/helpers/messageHelper";

const SettingPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (
      hasUserInfo()
    ) {
      router.replace("/MainPage");
    }
  }, []);

  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");

  const handleChangeDate = useCallback(
    (newValue: Dayjs | null) => {
      setDate(newValue);
    },
    [date]
  );

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target?.value);
    },
    [name]
  );

  const handleClickSubmit = useCallback(async () => {
    if (!date || !name || !sex) {
      alert("입력을 확인해 주세요!");
      return;
    }

    await localStorage.setItem("birthday", date.format("YYYY-MM-DD"));
    await localStorage.setItem("name", name);
    await localStorage.setItem("sex", sex);

    await postMessage({type: MessageType.auth, body: {birthday: date.format("YYYY-MM-DD"), name, sex}})

    router.replace("/MainPage");
  }, [name, date, sex]);

  const sexList = ["female", "male"];

  const handleChangeSex = useCallback(
    (e: SelectChangeEvent<string>) => {
      setSex(e.target.value);
    },
    [sex]
  );

  const Container = styled.div`
    margin: auto 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `
  return (
    <div className="grid h-screen text-center">
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            className="w-full"
            label="birthday"
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            style={{ marginTop: "10px" }}
            className="w-full"
            required
            id="outlined-required"
            label="name"
            value={name}
            onChange={handleChangeName}
            defaultValue="name"
            sx={{ width: 300 }}
          />

          <FormControl style={{ marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-helper-label">sex</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sex}
              label="sex"
              onChange={handleChangeSex}
            >
              {Array.from(sexList).map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            style={{ marginTop: "20px" }}
            className="my-3"
            color="primary"
            onClick={handleClickSubmit}
            variant="outlined"
          >
            mementomori
          </Button>
        </LocalizationProvider>
      </Container>
    </div>
  );
};

export default SettingPage;
