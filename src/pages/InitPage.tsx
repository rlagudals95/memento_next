import { useRouter } from "next/router";
import React, { useState, useCallback, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { SEX } from "@/constants";

const InitPage = () => {
  useEffect(() => {
    if (
      localStorage.getItem("birthday") &&
      localStorage.getItem("name") &&
      localStorage.getItem("sex")
    ) {
      router.replace("/MainPage");
    }
  }, []);
  const router = useRouter();
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
    (e: React.ChangeEvent) => {
      //@ts-ignore
      setName(e.target?.value);
    },
    [name]
  );

  const handleClickGoMain = useCallback(async () => {

    if (!date || !name || !sex) {
      alert("입력을 확인해 주세요!");
      return;
    }

    await localStorage.setItem("birthday", date.format("YYYY-MM-DD"));
    await localStorage.setItem("name", name);
    await localStorage.setItem("sex", sex);
    router.replace("/MainPage");
  }, [name, date, sex]);

  const sexList = [SEX.FEMALE, SEX.MALE];

  const handleChangeSex = useCallback(
    (e: React.ChangeEvent) => {
      //@ts-ignore
      setSex(e.target.value);
    },
    [sex]
  );
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col">
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
            className="my-5 w-full"
            required
            id="outlined-required"
            label="name"
            value={name}
            onChange={handleChangeName}
            defaultValue="name"
            sx={{ width: 300 }}
          />

          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">sex</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sex}
              label="sex"
              //@ts-ignore
              onChange={handleChangeSex}
            >
              {Array.from(sexList).map((sex) => {
                return (
                  <MenuItem key={sex} value={sex}>
                    {sex}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            className="my-3"
            color="primary"
            onClick={handleClickGoMain}
            variant="outlined"
          >
            mementomori
          </Button>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default InitPage;
