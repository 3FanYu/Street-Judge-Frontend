import React from "react";
import { Tr, Td } from "@chakra-ui/table";
import { Input } from "@chakra-ui/input";
export default function GradingInput(props) {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  const scores = props.scores;
  const rowIndex = props.rowIndex;
  const onBlur = props.onBlurFunc;
  return (
    <Tr key={rowIndex}>
      {scores.map((score, index) => {
        if (score === null || score._id === "000000000000000000000000") {
          return (
            <Td key={index}>
              <Input
                onBlur={(e) => {
                  onBlur(e, index + 1, rowIndex + 1);
                }}
                placeholder={`輸入${rowIndex + 1}${Alphabet[index]}分數`}
              />
            </Td>
          );
        } else {
          return (
            <Td key={index}>
              <Input
                onBlur={(e) => {
                  onBlur(e, score.row, rowIndex + 1);
                }}
                placeholder={`輸入${score.number}${Alphabet[score.row]}分數`}
                defaultValue={score.point}
                id={score._id}
              />
            </Td>
          );
        }
      })}
    </Tr>
  );
}
