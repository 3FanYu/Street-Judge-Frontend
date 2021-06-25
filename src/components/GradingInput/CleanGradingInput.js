import React from "react";
import { Input } from "@chakra-ui/input";
import { Tr, Td } from "@chakra-ui/table";

export default function CleanGradingInput(props) {
  const index = props.index;
  const onBlur = props.onBlurFunc;
  //todo 要依照評審資訊的rowNum決定一列有幾欄
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
}
