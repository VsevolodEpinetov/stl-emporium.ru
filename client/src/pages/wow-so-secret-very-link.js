import Head from 'next/head'
import { Accordion, Title, Anchor, Text, Button, TextInput } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks';

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default function FAQPage (props) {
  const [userAgent, setUserAgent] = useState();
  const [userID, setUserID] = useLocalStorage({ key: 'user-unique-id', defaultValue: '0' });
  const [code, setCode] = useState('')

  useEffect(() => {
    setUserAgent(props.userAgent)
    console.log('shot')
  }, [props])

  useEffect(() => {
  }, [])

  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{padding: '25px'}}>
          <Title order={1} style={{ marginBottom: '15px' }}>Ультра секретная ссылка</Title>
          <Button onClick={() => {console.log(userAgent)}}>ua</Button>
          <Button onClick={() => {console.log(userID)}}>id</Button>
          <Button onClick={() => {console.log(userID)
    if (userID == 0) {
      setUserID(uuidv4());
      console.log('assigned user id')
    }}}>assign</Button>
          <Button onClick={() => {setUserID('0')}}>null</Button>
          <br/>
          <TextInput value={code} onChange={(event) => setCode(event.currentTarget.value)} />
          <Button onClick={() => {
            
          }}>Check</Button>
        </main >
      </CustomAppShell >
    </>
  )
}

export async function getServerSideProps(context) {
  const userAgent = context.req.headers['user-agent'];
  return {
    props: {userAgent}, // will be passed to the page component as props
  }
}
