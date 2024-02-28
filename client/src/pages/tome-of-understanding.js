import Head from 'next/head'
import { Title, Text, Button, TextInput, ScrollArea, Table, Grid, Divider, Stack, Modal, Image } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell/CustomAppShell'
import { useEffect, useState } from 'react'
import { useDisclosure, useInterval, useLocalStorage } from '@mantine/hooks';
import { fetchDataFromURINew } from '@/utils/api';
import StlRow from '@/components/StlRow';
import { notifications } from '@mantine/notifications';
import { IconHelpHexagonFilled, IconX } from '@tabler/icons-react';

export default function TomeOfUnderstanding(props) {
  const [tomeUsesLeft, setTomeUsesLeft] = useLocalStorage({ key: 'user-tome-uses-left', defaultValue: undefined })
  const [tomeName, setTomeName] = useLocalStorage({ key: 'user-tome-name', defaultValue: undefined })

  const [opened, { open, close }] = useDisclosure(false);

  const [assumedName, setAssumedName] = useState('')
  const [stlCode, setStlCode] = useState('');
  const [stlsData, setStlsData] = useState([]);
  const [errorTome, setErrorTome] = useState(false)
  const [errorMinis, setErrorMinis] = useState(false)

  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);

  function showError(title, description) {
    notifications.show({
      title: title,
      message: description,
      color: 'red',
      withCloseButton: true,
      withBorder: true,
      icon: <IconX />,
    })
  }

  function showNotification(title, description) {
    notifications.show({
      title: title,
      message: description,
      withCloseButton: true,
      withBorder: true,
    })
  }

  async function saveAndCheckCode() {
    setErrorTome(false);
    setSeconds(10);
    interval.start();
    if (assumedName && assumedName != 'undefined') {
      const res = /^[a-zA-Zа-яА-Я]+$/.test(assumedName)
      if (res) {
        const response = await fetchDataFromURINew('tomes', { name: assumedName });
        if (response.data.length > 0) {
          setErrorTome(false)
          setTomeName(assumedName)
          setTomeUsesLeft(response.data[0].attributes.usesLeft)
        } else {
          setErrorTome(true)
          showError('Ошибка!', 'Такого тома не существует')
        }
      } else {
        setErrorTome(true)
        showError('Ошибка!', 'Неизвестная ошибка')
      }
    } else {
      setErrorTome(true)
      showError('Ошибка!', 'Похоже, что ты забыл ввести том.')
    }
  }

  async function findMinis() {
    if (stlCode.length > 0) {
      setErrorMinis(false);
      setSeconds(4);
      interval.start();
      const tomeData = await fetchDataFromURINew('tomes', { name: tomeName });

      if (tomeData.data.length > 0) {
        const usesLeft = tomeData.data[0].attributes.usesLeft;
        const tomeId = tomeData.data[0].id;

        if (usesLeft >= 1) {
          const heroesData = await fetchDataFromURINew('creatures', { name: tomeName, codes: [stlCode], tomeUses: usesLeft, tomeId: tomeId });
          const monstersData = await fetchDataFromURINew('monsters', { name: tomeName, codes: [stlCode], tomeUses: usesLeft, tomeId: tomeId });
          const terrainData = await fetchDataFromURINew('terrains', { name: tomeName, codes: [stlCode], tomeUses: usesLeft, tomeId: tomeId });

          const overallData = heroesData?.data.concat(monstersData?.data).concat(terrainData?.data);
          if (overallData.length > 0) {
            const newAmount = tomeUsesLeft - 1;
            setStlsData([...stlsData, overallData[0]]) // because the code is unique. Even if it is in several tables it's still the very same item
            setTomeUsesLeft(newAmount)
            showNotification('Израсходован 1 заряд', `Осталось ${newAmount} зарядов тома`)
          } else {
            console.log('no stls')
            showError('STL нет', 'Таких STL не существует. Заряды не использованы')
            setErrorMinis(true);
          }
        } else {
          showError('Ошибка!', 'Не хватает зарядов Тома для поиска введённых STL')
          setErrorMinis(true);
        }
      }
    } else {
      showError('Пустое поле', 'Ты забыл ввести коды миниатюр')
      setErrorMinis(true);
    }
  }

  useEffect(() => {
    if (tomeName && tomeName != 'undefined') {
      setAssumedName(tomeName)
      fetchDataFromURINew('tomes', { name: tomeName }).then(data => {
        if (data.data.length > 0) {
          setTomeUsesLeft(data.data[0].attributes.usesLeft);
        }
      })
    }
  }, [tomeName])

  return (
    <>
      <Head />
      <CustomAppShell >
        <main style={{ padding: '25px' }}>
          <Grid>
            <Grid.Col span={{ sm: 12, md: 6, lg: 5, xl: 4 }}>
              <Title order={1} style={{ marginBottom: '35px' }}>Том понимания <span style={{ cursor: 'help' }} onClick={open}><IconHelpHexagonFilled /></span></Title>
              <Title style={{ marginBottom: '15px' }}>Информация о твоём Томе</Title>
              <Stack align='flex-end'>
                <TextInput
                  value={assumedName}
                  onChange={(event) => {
                    let res = /^[a-zA-Zа-яА-Я]+$/.test(event.currentTarget.value);
                    setErrorTome(false);
                    if (res || event.currentTarget.value == '') setAssumedName(event.currentTarget.value)
                  }}
                  disabled={tomeName && tomeName != 'undefined'}
                  size='lg'
                  style={{ width: '100%' }}
                  error={errorTome}
                  placeholder='Введи название Тома'
                />

                <Button
                  onClick={saveAndCheckCode}
                  disabled={(tomeName && tomeName != 'undefined') || (assumedName.length == 0) || seconds > 0}
                  color={errorTome ? 'red' : 'lime'}
                  size='lg'
                  fullWidth
                >
                  {seconds > 0 ? seconds : (assumedName.length == 0 ? 'Введи название Тома' : 'Проверить и сохранить')}
                </Button>

                <Button
                  onClick={() => { setTomeName(undefined); setTomeUsesLeft(undefined); }}
                  disabled={!(tomeName && tomeName != 'undefined')}
                  size='lg'
                  fullWidth
                >
                  Заменить
                </Button>
              </Stack>
              {
                tomeName && tomeName != 'undefined' &&
                <Title order={3} style={{ marginTop: '15px' }}>Осталось зарядов: {tomeUsesLeft}</Title>
              }
              <Divider style={{ marginTop: '15px' }} />
              <>
                <Title>Поиск STL по коду</Title>
                <Text style={{ marginBottom: '15px' }} >Чтобы найти нужные тебе STL - просто введи необходимые коды ниже. Например: 017027018. На поиск 1 STL уходит 1 заряд Тома.</Text>
                <TextInput
                  value={stlCode}
                  onChange={(e) => {
                    setErrorMinis(false);
                    setStlCode(e.currentTarget.value);
                  }}
                  disabled={!(tomeName && tomeName != 'undefined')}
                  size='lg'
                  error={errorMinis}
                />
                <Button
                  style={{ marginTop: '15px' }}
                  disabled={!(tomeName && tomeName != 'undefined') || (seconds > 0)}
                  onClick={findMinis}
                  color='violet'
                  size='md'
                  fullWidth
                >
                  {seconds > 0 ? seconds : 'Найти'}
                </Button>
              </>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 6, lg: 7, xl: 8 }}>

              <ScrollArea w={'100%'}>
                <Table fontSize="md" highlightOnHover>
                  <thead>
                    <tr>
                      <th>Изображение</th>
                      <th>Код</th>
                      <th>Студия</th>
                      <th>Релиз</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stlsData.length > 0 && stlsData.map((item, id) => {
                      return (<StlRow stlInfo={item.attributes} key={`item-row-${item.attributes.code}-${id}`} />)
                    })}
                  </tbody>
                </Table>
              </ScrollArea>

            </Grid.Col>
          </Grid>
          <Modal opened={opened} onClose={close} title="Том понимания!" centered>
            <Image src='/tome.png' />
            <Title order={3} align='center'>
              Том Понимания
            </Title>
            <Title order={4} align='center'>(легенд.)</Title>
            <Divider style={{ margin: '10px' }} />
            <Text align='center'>Том Понимания позволяет своему пользователю достоверно узнать, какая студия и в каком наборе выпустила конкретную миниатюру. Это полезно для тех, у кого и так большая коллекция, поэтому смысла покупать файлы нет, а узнать, где искать файл - хочется. На поиск 1 миниатюры уходит 1 заряд Тома.</Text>
          </Modal>
        </main >
      </CustomAppShell >
    </>
  )
}
