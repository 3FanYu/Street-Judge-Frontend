import { Button } from "@chakra-ui/button";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Api from "../../axios/Api";
import GradingInput from "../../components/GradingInput/GradingInput";
import CleanGradingInput from "../../components/GradingInput/CleanGradingInput";
export default function Grading() {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  let { judgeID } = useParams(); // 取得網址上的參數
  const [JudgeInfo, setJudgeInfo] = useState({}); //評審資訊
  const [Records, setRecords] = useState([]);
  const [RowIndex, setRowIndex] = useState(1); //分數欄
    //輸入欄位輸入完馬上api
  const onBlur = (event, row, index) => {
    const value = parseFloat(event.target.value);
    const key = event.target.id;
    if (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      !Number.isNaN(value)
    ) {
      if (key !== undefined && key !== "") {
        //判斷是update還是insert
        console.log("Trigger update!!");
        Api.patch("score?scoreID=" + key + "&point=" + value.toString()).then(
          (res) => {
            console.log(res);
          }
        );
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

  const TableHeader = (index) => {
    //印 TableHeader
    return <Th key={index}>{Alphabet[index]}</Th>;
  };
  const [TableHeaderArray, setTableHeaderArray] = useState([]);
  const [InputArray, setInputArray] = useState([]);
  useEffect(() => {
    //一開始先api拿評審資訊
    Api.get("judge?judgeID=" + judgeID).then((res) => {
      const judgeInfo = res.data.judgeInfo;
      console.log(judgeInfo);
      setJudgeInfo(judgeInfo);
      setRecords(res.data.scores);
      setRowIndex(res.data.scores.length+1);
      for (let i = 0; i < judgeInfo.rowNum; i++) {
        //依照rowNum印出TableHeader
        setTableHeaderArray((oldArray) => [...oldArray, TableHeader(i)]);
      }
    });
  }, []);

  const newRow = () => {
    setInputArray((oldArray) => [
      ...oldArray,
      <CleanGradingInput
        index={RowIndex}
        onBlurFunc={onBlur}
      ></CleanGradingInput>,
    ]);
    setRowIndex((v) => v + 1);
  };

  return (
    <>
      <Table variant="striped">
        <Thead>
          <Tr>{TableHeaderArray}</Tr>
        </Thead>
        <Tbody>
          {Records.length > 1 ? (
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
