import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import Api from "../../axios/Api";

export default function Grading() {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  let { judgeID } = useParams();// 取得網址上的參數
  const [JudgeInfo, setJudgeInfo] = useState({});//評審資訊
  const [RowIndex, setRowIndex] = useState(1);//分數欄
  const InputRow = (index) => { //todo 要依照評審資訊的rowNum決定一列有幾欄
    return (
      <Tr key={index}>
        <Td>
          <Input
            onBlur={(e) => {
              onBlur(e, 1, index);
            }}
            placeholder={`輸入${index}A分數`}
          />
        </Td>
        <Td>
          <Input
            onBlur={(e) => {
              onBlur(e, 2, index);
            }}
            placeholder={`輸入${index}B分數`}
          />
        </Td>
        <Td>
          <Input
            onBlur={(e) => {
              onBlur(e, 3, index);
            }}
            placeholder={`輸入${index}C分數`}
          />
        </Td>
      </Tr>
    );
  };
  const TableHeader = (index) => { //印 TableHeader
    return <Th key={index}>{Alphabet[index]}</Th>;
  };
  const [TableHeaderArray, setTableHeaderArray] = useState([]);
  const [InputArray, setInputArray] = useState([]);
  useEffect(() => { //一開始先api拿評審資訊
    Api.get("judge?judgeID=" + judgeID).then((res) => {
      const judgeInfo = res.data.judgeInfo;
      console.log(judgeInfo);
      setJudgeInfo(judgeInfo);
      for (let i = 0; i < judgeInfo.rowNum; i++) { //依照rowNum印出TableHeader
        setTableHeaderArray((oldArray) => [...oldArray, TableHeader(i)]);
      }
    });
    newRow();//預設先有第一列分數輸入欄位
  }, []);

  const newRow = () => {
    setInputArray((oldArray) => [...oldArray, InputRow(RowIndex)]);
    setRowIndex((v) => v + 1);
  };

  const onBlur = (event, row, index) => {//輸入欄位輸入完馬上api 
    const value = parseFloat(event.target.value);
    const key = event.target.id;
    if (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      !Number.isNaN(value)
    ) {
      if (key !== undefined && key !== "") { //判斷是update還是insert
        console.log("Trigger update!!");
        Api.patch("score?scoreID="+key+"&point="+value.toString()).then((res) => {
          console.log(res)
        });
      } else {
        console.log("trigger API !!");
        const data = {
          judgeID: judgeID,
          number: index,
          row: row,
          point: value,
        };
        Api.post("score", data).then((res) => {
          event.target.id = res.data.insertedID;
        });
      }
    }
  };
  return (
    <>
      <Table variant="striped">
        <Thead>
          <Tr>{TableHeaderArray}</Tr>
        </Thead>
        <Tbody>{InputArray}</Tbody>
      </Table>
      <Button
        onClick={() => {
          newRow();
        }}
      >
        New Row
      </Button>
    </>
  );
}
