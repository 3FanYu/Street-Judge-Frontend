import React, { useEffect, useState } from "react";
import Api from "../../axios/Api";
import { useParams } from "react-router";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import GradingInput from "../../components/GradingInput/GradingInput";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/table";

export default function Settlement() {
  const Alphabet = "ABCDE"; //印出ＡＢＣＤＥ組
  let { eventID } = useParams(); // 取得網址上的參數
  const [AllScores, setAllScores] = useState([]);
  const [AddUps, setAddUps] = useState([]);
  const getTableHeader = (rowNum) => {
    let headerArray = [];
    for (let i = 0; i < rowNum; i++) {
      const header = <Th key={i}>{Alphabet[i]}</Th>;
      headerArray.push(header);
    }
    return headerArray;
  };
  useEffect(async () => {
    try {
      const res = await Api.get("settlement?eventID=" + eventID);
      const data = res.data;
      if (data.message === true) {
        setAllScores(data.allScores);
        setAddUps(data.addUps);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <Tabs>
        <TabList>
          {AllScores ? (
            AllScores.map((judge) => {
              return <Tab>{judge.name}</Tab>;
            })
          ) : (
            <></>
          )}
          <Tab>總成績</Tab>
        </TabList>

        <TabPanels>
          {AllScores ? (
            AllScores.map((judge) => {
              return (
                <TabPanel>
                  <Table variant="striped">
                    <Thead>
                      <Tr>{getTableHeader(judge.rowNum)}</Tr>
                    </Thead>
                    <Tbody>
                      {judge.scores.map((scores) => {
                        return <GradingInput scores={scores} readOnly={true} />;
                      })}
                    </Tbody>
                  </Table>
                </TabPanel>
              );
            })
          ) : (
            <></>
          )}
          <TabPanel>
            {AddUps ? (
              AddUps.map((scores) => {
                return <GradingInput scores={scores} readOnly={true} />;
              })
            ) : (
              <></>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
