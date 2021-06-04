import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Center, Stack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import Api from "../../axios/Api";

export default function CreateEvent2(props) {
  const eventInfo = props.location.state.eventInfo;
  const { register, handleSubmit } = useForm();
  const [JudgeNum, setJudgeNum] = useState(1);
  const [RowNum, setRowNum] = useState(0);
  const [JudgeList, setJudgeList] = useState([]);

  useEffect(() => {
    setJudgeList([]);
    let tmp = [];
    for (let i = 0; i < JudgeNum; i++) {
      tmp.push(
        <Input
          key={i}
          {...register(`judges[${i}]`)}
          placeholder="輸入評審名稱"
        ></Input>
      );
    }
    setJudgeList(tmp);
  }, [JudgeNum]);

  const onSubmit = (data) => {
    let result = {
      ...data,
      ...eventInfo,
      rowNum:parseInt(data.rowNum)
    };
    console.log(result)
    Api.post("/event", result).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={10} w="500px">
            <NumberInput
              {...register("rowNum")}
              type="number"
              defaultValue={RowNum}
              min={0}
              max={5}
              onChange={(v) => {
                setRowNum(parseInt(v));
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <NumberInput
              {...register("judgeNum")}
              defaultValue={JudgeNum}
              min={0}
              max={5}
              onChange={(v) => {
                setJudgeNum(v);
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {JudgeList}
            <Button type="submit">創建活動</Button>
          </Stack>
        </form>
      </Center>
    </>
  );
}
