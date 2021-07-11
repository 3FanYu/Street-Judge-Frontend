import React from "react";
import { Tr, Td } from "@chakra-ui/table";
import { Input } from "@chakra-ui/input";
import { Tag } from "@chakra-ui/tag";
import { Badge, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function GradingInput(props) {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  const readOnly = props.readOnly ? props.readOnly : false;
  const scores = props.scores;
  const rowIndex = props.rowIndex ? props.rowIndex : null;
  const onBlur = props.onBlurFunc ? props.onBlurFunc : () => {};
  const rankInput = props.rankInput ? props.rankInput : 0;
  const isOT = props.isOT ? props.isOT : false;
  const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  };
  return (
    <Tr key={rowIndex}>
      <Td>
        <Tag variant="solid" colorScheme="teal">
          {rowIndex + 1}
        </Tag>
      </Td>
      {scores.map((score, index) => {
        if (score === null || score.isEmpty === true) {
          return (
            <Td key={index}>
              <Input
                isReadOnly={readOnly}
                onBlur={(e) => {
                  onBlur(e, index + 1, rowIndex + 1);
                }}
                placeholder={
                  readOnly
                    ? "未輸入"
                    : `輸入${rowIndex + 1}${Alphabet[index]}分數`
                }
              />
            </Td>
          );
        } else {
          return (
            <Td key={index}>
              <InputGroup>
              {isOT && score.rank == rankInput ? <InputLeftElement pointerEvents="none" children={<Badge colorScheme="purple" >OT</Badge>} /> : <></>}
              <Input
                bg={score.rank <= rankInput ? "teal" : ""}
                isReadOnly={readOnly}
                onBlur={(e) => {
                  onBlur(e, score.row, rowIndex + 1);
                }}
                placeholder={`輸入${score.number}${Alphabet[score.row]}分數`}
                defaultValue={Math.round(score.point*100)/100}
                id={score._id}
              ></Input>
              </InputGroup>
            </Td>
          );
        }
      })}
    </Tr>
  );
}
