import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center, Stack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router";
import Api from "../../axios/Api";

export default function CreateEvent() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [ShowPW, setShowPW] = useState(false);
  const onSubmit = (data) => {
    Api.post("/event", data).then((res) => {
      history.push({ pathname: "CreateEvent2", state: { eventID: res.data.eventID } });
    });
    
  };
  const handleShow = () => {
    setShowPW(!ShowPW);
  };
  return (
    <>
      <Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={10} w="500px">
            <Input {...register("name")} placeholder="活動名稱"></Input>
            <Input {...register("owner")} placeholder="負責人"></Input>
            <InputGroup>
              <Input
                type={ShowPW ? "text" : "password"}
                {...register("password")}
                placeholder="密碼"
              ></Input>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShow}>
                  {ShowPW ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit">下一步</Button>
          </Stack>
        </form>
      </Center>
    </>
  );
}
