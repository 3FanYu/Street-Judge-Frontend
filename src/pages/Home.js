import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";
import { Image, Stack, Text } from "@chakra-ui/react"
import React from "react";
import { useHistory } from "react-router";
import bg from '../assets/background/poppingWhite1.jpg';

export default function Home() {
  let history = useHistory();
  return (
    <>
      <Center h="1000">
      <Stack direction="column" spacing="24px">
      <Text fontSize="6xl">JudgeMentor</Text>
        <Image src={bg}/>
        <Button onClick={()=>{history.push('/createEvent')}}>新活動</Button>
        <Button>所有活動</Button>
        </Stack>
      </Center>
    </>
  );
}
