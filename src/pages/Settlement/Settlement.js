import React, { useEffect, useState } from 'react';
import Api from '../../axios/Api';
import { useParams } from 'react-router';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import GradingInput from '../../components/GradingInput/GradingInput';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/table';
import { Center } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { Input } from '@chakra-ui/input';

export default function Settlement() {
  const Alphabet = 'ABCDE'; //印出ＡＢＣＤＥ組
  const { eventID } = useParams(); // 取得網址上的參數
  const [AllScores, setAllScores] = useState([]); // 所有評審的分數
  const [AddUps, setAddUps] = useState([]); // 總成績
  const [RankMap, setRankMap] = useState({}); // 紀錄 AllScores 的排名
  const [AddUpsRankMap, setAddUpsRankMap] = useState({}); // 紀錄 總成績 的排名
  const [DisplayBest, setDisplayBest] = useState(null); // 顯示用的名次篩選
  const [RealBest, setRealBest] = useState(0); // 真正的名次（存在 RankMap AddUpsRankMap 的 名次）
  const changeRankMap = index => {
    // tab切換時改變 RankMap
    let tmpMap = {};
    const scores = AllScores[index].scores;
    const rowNum = AllScores[index].rowNum;
    for (let i = 0; i < scores.length; i++) {
      // loop through 所有分數，並把名次存進RankMap
      for (let j = 0; j < rowNum; j++) {
        if (tmpMap[scores[i][j].rank] == undefined) {
          tmpMap[scores[i][j].rank] = false;
        } else {
          // 若有重複的排名就設定true 代表 可能有ot的狀況
          tmpMap[scores[i][j].rank] = true;
        }
      }
    }
    setRankMap(tmpMap);
  };
  const getTableHeader = rowNum => {
    //產生 TableHeader
    let headerArray = [];
    for (let i = 0; i < rowNum; i++) {
      const header = (
        <Th key={i}>
          <Center>
            <Tag colorScheme='teal'>{Alphabet[i]}</Tag>
          </Center>
        </Th>
      );
      headerArray.push(header);
    }
    return headerArray;
  };
  const handleBestChange = (event, index) => {
    //當 "取幾強" 輸入匡的直遭到改動，除了改變DisplayRank(顯示用)，也背景運算出真實排名（RankMap裡真實存在的排名）
    let value = event.target.value;
    const rankmap = index ? RankMap : AddUpsRankMap;
    if (value === null || value === undefined || value === '') {
      // 若輸入匡為空的則直接把值設為0
      value = 0;
    }
    setDisplayBest(value === 0 ? null : value); // 先設定顯示用的排名
    while (rankmap[value] === undefined && value > 0) {
      // 計算真實排名，若輸入的排名不存在rankmap中就 -1 直到排名存在為止
      value -= 1;
    }
    setRealBest(value); // 設定真實排名
  };

  useEffect(async () => {
    try {
      const res = await Api.get('settlement?eventID=' + eventID); // get api
      const data = res.data;
      if (data.message === true) {
        // 成功取得資料就將資料存進hook中
        const allScores = data.allScores;
        const addUps = data.addUps;
        setAllScores(allScores);
        setAddUps(addUps);
        let tmpMap = {};
        for (let i = 0; i < addUps.length; i++) {
          for (let j = 0; j < allScores[0].rowNum; j++) {
            if (tmpMap[addUps[i][j].rank] == undefined) {
              tmpMap[addUps[i][j].rank] = false;
            } else {
              tmpMap[addUps[i][j].rank] = true;
            }
          }
        }
        setAddUpsRankMap(tmpMap); // 設定 AddUpsRankMap
      }
    } catch (err) {
      alert(err);
    }
  }, []);
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>總成績</Tab>
          {AllScores ? (
            AllScores.map((judge, index) => {
              return (
                <Tab
                  onClick={() => {
                    changeRankMap(index);
                  }}>
                  {judge.name}
                </Tab>
              );
            })
          ) : (
            <></>
          )}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table variant='striped'>
              <Thead>
                <Tr>
                  <Input
                    colorScheme='whiteAlpha'
                    size='lg'
                    placeholder='輸入晉級名額數'
                    value={DisplayBest}
                    onChange={v => {
                      handleBestChange(v);
                    }}
                  />
                  {AddUps[0] ? getTableHeader(AddUps[0].length) : <></>}
                </Tr>
              </Thead>
              <Tbody>
                {AddUps ? (
                  AddUps.map((scores, index) => {
                    return (
                      <GradingInput
                        scores={scores}
                        readOnly={true}
                        rowIndex={index}
                        rankInput={RealBest}
                        isOT={AddUpsRankMap[RealBest]}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </Tbody>
            </Table>
          </TabPanel>
          {AllScores ? (
            AllScores.map((judge, index) => {
              return (
                <TabPanel>
                  <Table variant='striped'>
                    <Thead>
                      <Tr>
                        <Input
                          colorScheme='whiteAlpha'
                          size='lg'
                          placeholder='輸入晉級名額數'
                          value={DisplayBest}
                          onChange={v => {
                            handleBestChange(v, index);
                          }}
                        />
                        {getTableHeader(judge.rowNum)}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {judge.scores.map((scores, index) => {
                        return (
                          <GradingInput
                            scores={scores}
                            readOnly={true}
                            rowIndex={index}
                            rankInput={RealBest}
                            isOT={RankMap[RealBest]}
                          />
                        );
                      })}
                    </Tbody>
                  </Table>
                </TabPanel>
              );
            })
          ) : (
            <></>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
}
