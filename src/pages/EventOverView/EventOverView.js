//
//12312312312312312
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Text,
  Heading,
  VStack,
  HStack,
  Center,
  Tag,
  Button,
  Container
} from '@chakra-ui/react';
import Api from '../../axios/Api';
import AppBar from '../../components/Header/AppBar';

export default function EventOverView() {
  const { REACT_APP_DOMAIN } = process.env;
  const history = useHistory();
  const { eventID } = useParams();
  const [Title, setTitle] = useState('');
  const [Event, setEvent] = useState();
  const [Judges, setJudges] = useState([]);
  const copyToClipboard = async ID => {
    const domain = `${REACT_APP_DOMAIN}/gradingPage/`;
    try {
      navigator.clipboard.writeText(domain + ID).then(function() {
        console.log('success');
      });
    } catch (err) {
      console.log(err);
    }
  };
  const redirectToSettlePage=(eventID)=>{
    history.push({pathname:'/settlePage/'+eventID})
  }
  useEffect(async () => {
    try {
      const res = await Api.get('event?eventID=' + eventID);
      if (res.status === 200 && res.data.result === true) {
        const data = res.data;
        setEvent(data.event)
        console.log(data.event.owner)
        setTitle(data.event.name);
        setJudges(data.event.judges);
      }
    } catch (err) {
      alert(err);
    }
  }, []);
  return (
    <>
      <AppBar Title={Title}></AppBar>
      <VStack mt='50px' spacing={10}>
        <Container h='50px'>
          <HStack style={{ float: 'left' }}>
            <Center>
              <Text fontSize='20px'> 主辦人：</Text>
              <Heading style={{ float: 'right' }}>{Event? Event.owner:""}</Heading>
            </Center>
          </HStack>
        </Container>
        <Container>
          <Text fontSize='20px'>評審</Text>
          <VStack spacing={4}>
            {Judges.map((judge, index) => {
              return (
                <HStack>
                  <Tag size='lg'>{judge.name}</Tag>
                  <Button
                    colorScheme='teal'
                    size='sm'
                    onClick={() => copyToClipboard(judge._id)}>
                    複製連結
                  </Button>
                </HStack>
              );
            })}
          </VStack>
        </Container>
        <Container>
          <Center>
            <Button mt='60px' onClick={()=>{redirectToSettlePage(Event._id)}}>結算成績</Button>
          </Center>
        </Container>
      </VStack>
    </>
  );
}
