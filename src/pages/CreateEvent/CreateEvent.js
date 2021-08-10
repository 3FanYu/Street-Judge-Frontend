import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center, Stack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useHistory } from "react-router";
import Api from "../../axios/Api";
import { Image, Text } from "@chakra-ui/react";
import bg from "../../assets/background/poppingWhite2.jpg"

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
      <Center h="900">
        <Stack>
          <Center>
            <Image src = {bg} w="450px" h="450px"/>
          </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={10} w="500px">
            <Stack spacing={0}> 
            <Text mb="9px">活動名稱</Text>
            <Input {...register("name")} placeholder="輸入活動名稱"></Input>
            </Stack>
            <Stack spacing={0}> 
            <Text mb="9px">負責人</Text>
            <Input {...register("owner")} placeholder="輸入負責人"></Input>
            </Stack>
            <Stack spacing={0}> 
            <Text mb="9px">密碼</Text>

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
            </Stack>
            <Button type="submit">下一步</Button>
          </Stack>
        </form>
        </Stack>
      </Center>
    </>
  );
}
