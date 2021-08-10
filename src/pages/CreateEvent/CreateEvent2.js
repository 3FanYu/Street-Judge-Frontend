import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Stack } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/number-input';
import Api from '../../axios/Api';
import { Image, Text } from '@chakra-ui/react';
import bg from '../../assets/background/poppingWhite3.jpg';
import { useHistory } from 'react-router-dom';

export default function CreateEvent2(props) {
  const eventID = props.location.state.eventID;
  const history = useHistory();
  const { register, unregister, handleSubmit } = useForm();
  const [JudgeNum, setJudgeNum] = useState(1);
  const [RowNum, setRowNum] = useState(0);
  const [JudgeList, setJudgeList] = useState([]);

  useEffect(() => {
    unregister('names');
    setJudgeList([]);
    let tmp = [];
    for (let i = 0; i < JudgeNum; i++) {
      tmp.push(
        <Input
          key={i}
          {...register(`names[${i}]`)}
          placeholder='輸入評審名稱'></Input>
      );
    }
    setJudgeList(tmp);
  }, [JudgeNum]);

  const onSubmit = data => {
    let result = {
      eventID: eventID,
      ...data,
      rowNum: parseInt(data.rowNum)
    };
    Api.post('/judge', result).then(res => {
      console.log(res);
      history.push({ pathname: '/eventOverview/' + eventID });
    });
  };
  return (
    <>
      <Center h='900'>
        <Stack>
          <Image src={bg} w='450px' h='450px'></Image>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={10} w='500px'>
              <Stack>
                <Text mb='8px'>輸入海選排數</Text>
                <NumberInput
                  {...register('rowNum')}
                  type='number'
                  defaultValue={RowNum}
                  min={0}
                  max={5}
                  onChange={v => {
                    setRowNum(parseInt(v));
                  }}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
              <Stack>
                <Text mb='8px'>輸入評審人數</Text>
                <NumberInput
                  defaultValue={JudgeNum}
                  min={0}
                  max={5}
                  onChange={v => {
                    setJudgeNum(v);
                  }}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
              {JudgeList}
              <Button type='submit'>創建活動</Button>
            </Stack>
          </form>
        </Stack>
      </Center>
    </>
  );
}
