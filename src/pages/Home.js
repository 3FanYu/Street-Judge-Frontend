import { Button } from "@chakra-ui/button";
import { Center } from "@chakra-ui/layout";
import React from "react";
import { useHistory } from "react-router";

export default function Home() {
  let history = useHistory();
  return (
    <>
      <Center h="1000">
        <Button onClick={()=>{history.push('/createEvent')}}>新活動</Button>
        <Button>所有活動</Button>
      </Center>
    </>
  );
}
