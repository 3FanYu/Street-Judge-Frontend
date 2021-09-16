import React from 'react';
import { Input } from '@chakra-ui/input';
import { Tr, Td } from '@chakra-ui/table';
import { Tag } from '@chakra-ui/tag';

export default function CleanGradingInput(props) {
  const Alphabet = 'ABCDE'; //印出ＡＢＣＤＥ組
  const index = props.index;
  const onBlur = props.onBlurFunc;
  const amount = props.amount;
  const amountMap = Array.from(Array(amount).keys());
  //todo 要依照評審資訊的rowNum決定一列有幾欄
  return (
    <Tr key={index} maxW='900px'>
      <Td>
        <Tag variant='solid' colorScheme='teal'>
          {index}
        </Tag>
      </Td>
      {amountMap.map(key => {
        return (
          <Td>
            <Input width='100%' maxW='130px'
              onBlur={e => {
                onBlur(e, key+1, index);
              }}
              placeholder={`輸入${index}${Alphabet[key]}分數`}
            />
          </Td>
        );
      })}
    </Tr>
  );
}
