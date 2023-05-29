import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
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
import { hasUserInfo } from "@/utils/AppConfig";
import { MessageType, postMessage } from "@/helpers/messageHelper";
import Button from "../components/Button"
import { Color } from "@/constants/Color";
import { FontSize } from "@/constants/style";
import Container from "@/components/Container";

const SettingPage = () => {
  const router = useRouter();
  const nameInputRef = useRef<HTMLInputElement>(null);

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
    []
  );

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target?.value);
      console.log("setName 이여라 !! ", e.target.value)
      nameInputRef.current?.focus();
    },
    []
  );

  const sexList = ["female", "male"];

  const handleChangeSex = useCallback(
    (e: SelectChangeEvent<string>) => {
      setSex(e.target.value);
    },
    []
  );


  const handleClickSubmit = useCallback(async () => {
    if (!date || !name || !sex) {
      alert("생일과 이름 성별을 입력 주세요!");
      return;
    }

    localStorage.setItem("birthday", date.format("YYYY-MM-DD"));
    localStorage.setItem("name", name);
    localStorage.setItem("sex", sex);
    try {
      await postMessage({ type: MessageType.auth, body: { birthday: date.format("YYYY-MM-DD"), name, sex } })
    } catch (error) {
      console.log(`postmessage error ${error}`)
    }

    router.replace("/MainPage");
  }, [name, date, sex]);

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
            onChange={handleChangeName}
            value={name}
            label="name"
            sx={{ width: 300 }}
            ref={nameInputRef}
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
            styleCustom={{
              width: "100%",
              height: "2.7rem",
              background: "none",
              border: `1px solid ${Color.GREY_870}`,
              borderRadius: "6.25rem",
              margin: "16px 0 0 0",
            }}
            onClick={handleClickSubmit}
          >
            <div style={{color: "black", fontSize: FontSize.Mideum, fontWeight: 700}}>mementomori</div>
          </Button>
        </LocalizationProvider>
      </Container>
    </div>
  );
};

export default SettingPage;

