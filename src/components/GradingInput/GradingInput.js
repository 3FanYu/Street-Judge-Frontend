import React from "react";
import { Tr, Td } from "@chakra-ui/table";
import { Input } from "@chakra-ui/input";
export default function GradingInput(props) {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  const readOnly = props.readOnly ? props.readOnly : false;
  const scores = props.scores;
  const rowIndex = props.rowIndex?props.rowIndex:null;
  const onBlur = props.onBlurFunc ? props.onBlurFunc : () => {};
  return (
    <Tr key={rowIndex}>
      {scores.map((score, index) => {
        if (score === null || score.isEmpty === true) {
          return (
            <Td key={index}>
              <Input
                isReadOnly={readOnly}
                onBlur={(e) => {
                  onBlur(e, index + 1, rowIndex + 1);
                }}
                placeholder={ rowIndex ? `輸入${rowIndex + 1}${Alphabet[index]}分數` : '空白' }
              />
            </Td>
          );
        } else {
          return (
            <Td key={index}>
              <Input
                isReadOnly={readOnly}
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
