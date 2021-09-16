import { Button } from '@chakra-ui/button';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Api from '../../axios/Api';
import GradingInput from '../../components/GradingInput/GradingInput';
import CleanGradingInput from '../../components/GradingInput/CleanGradingInput';
import { Center } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
export default function Grading() {
  const Alphabet = 'ABCDE'; //印出ＡＢＣＤＥ組
  let { judgeID } = useParams(); // 取得網址上的參數
  const [JudgeInfo, setJudgeInfo] = useState({}); //評審資訊
  const [Records, setRecords] = useState([]);
  const [RowIndex, setRowIndex] = useState(1); //分數欄
  //輸入欄位輸入完馬上api
  const onBlur = (event, row, index) => {
    const value = parseFloat(event.target.value);
    const key = event.target.id;
    if (
      value !== '' &&
      value !== null &&
      value !== undefined &&
      !Number.isNaN(value)
    ) {
      const data = {
        judgeID: judgeID,
        number: index,
        row: row,
        point: value
      };
      Api.post('score', data).then(res => {
        event.target.id = res.data.insertedID;
      });
    }
  };

  const TableHeader = index => {
    //印 TableHeader
    return (
      <Th key={index}>
        <Center>
          <Tag colorScheme='teal'>{Alphabet[index]}</Tag>
        </Center>
      </Th>
    );
  };
  const [TableHeaderArray, setTableHeaderArray] = useState([]);
  const [InputArray, setInputArray] = useState([]);
  useEffect(() => {
    //一開始先api拿評審資訊
    Api.get('judge?judgeID=' + judgeID).then(res => {
      const judgeInfo = res.data.judgeInfo;
      setJudgeInfo(judgeInfo);
      setRecords(res.data.scores);
      setRowIndex(res.data.scores.length + 1);
      for (let i = 0; i < judgeInfo.rowNum; i++) {
        //依照rowNum印出TableHeader
        setTableHeaderArray(oldArray => [...oldArray, TableHeader(i)]);
      }
    });
  }, []);

  const newRow = () => {
    setInputArray(oldArray => [
      ...oldArray,
      <CleanGradingInput
        index={RowIndex}
        onBlurFunc={onBlur}
        amount={JudgeInfo.rowNum}></CleanGradingInput>
    ]);
    setRowIndex(v => v + 1);
  };

  return (
    <>
      <Center>
        <Table variant='striped' width='100%' maxW='900px' ml='50px'>
          <Thead>
            <Tr>
              <Th key='index'></Th>
              {TableHeaderArray}
            </Tr>
          </Thead>
          <Tbody>
            {Records.length > 0 ? (
              Records.map((scores, rowIndex) => {
                return (
                  <GradingInput
                    scores={scores}
                    rowIndex={rowIndex}
                    onBlurFunc={onBlur}
                  />
                );
              })
            ) : (
              <></>
            )}
            {InputArray}
          </Tbody>
        </Table>
      </Center>

      <Center>
        <Button
          onClick={() => {
            newRow();
          }}>
          +
        </Button>
      </Center>
    </>
  );
}
