import React from "react";
import {Tr, Td } from "@chakra-ui/table";
import { Input } from "@chakra-ui/input";
export default function GradingInput(props) {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  const scores = props.scores;
  const rowIndex = props.rowIndex;
  const onBlur = props.onBlur;
  return (
    <Tr key={rowIndex}>
      {scores.map((score, index) => {
        if (score === null) {
          return (
            <Td key={index}>
              <Input
                onBlur={(e) => {
                  onBlur(e, 1, index);
                }}
                placeholder={`輸入${rowIndex + 1}${Alphabet[index]}分數`}
              ></Input>
            </Td>
          );
        } else {
          return (
            <Td key={index}>
              <Input
                onBlur={(e) => {
                  onBlur(e, 1, index);
                }}
                placeholder={`輸入${score.number}${Alphabet[score.row]}分數`}
                value={score.point}
              />
            </Td>
          );
        }
      })}
    </Tr>
  );
}
