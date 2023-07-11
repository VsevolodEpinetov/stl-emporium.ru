import Head from 'next/head'
import { Accordion, Title, Anchor, Text, Button, TextInput, MultiSelect, ScrollArea, Table, Grid, Center, Group, Notification, Tooltip, Divider, Stack, createStyles, Textarea, Modal, Image } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell'
import { useEffect, useState } from 'react'
import { useDisclosure, useInterval, useLocalStorage } from '@mantine/hooks';
import { fetchDataFromURINew } from '@/utils/api';
import StlRow from '@/components/StlRow';
import { notifications } from '@mantine/notifications';
import { IconHelpHexagonFilled, IconX } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  disabledClass: {
    opacity: '20%',
    cursor: 'not-allowed'
  },
  input: {
    minHeight: '150px'
  }
}));

export default function TomeOfUnderstanding(props) {
  const [tomeUsesLeft, setTomeUsesLeft] = useLocalStorage({ key: 'user-tome-uses-left', defaultValue: undefined })
  const [tomeName, setTomeName] = useLocalStorage({ key: 'user-tome-name', defaultValue: undefined })
  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const [assumedName, setAssumedName] = useState('')
  const [stlsCodes, setStlsCodes] = useState([]);
  const [chosenSTLCodes, setChosenSTLCodes] = useState([]);
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
    if (chosenSTLCodes.length > 0) {
      setErrorMinis(false);
      setSeconds(10);
      interval.start();
      const tomeData = await fetchDataFromURINew('tomes', { name: tomeName });

      if (tomeData.data.length > 0) {
        const usesLeft = tomeData.data[0].attributes.usesLeft;
        const tomeId = tomeData.data[0].id;

        if (usesLeft >= chosenSTLCodes.length) {
          const creaturesData = await fetchDataFromURINew('creatures', { name: tomeName, codes: chosenSTLCodes, tomeUses: usesLeft, tomeId: tomeId });
          const usedCredit = creaturesData.data.length;
          const newAmount = tomeUsesLeft - usedCredit;
          setStlsData(creaturesData.data)
          setTomeUsesLeft(newAmount)
        } else {
          showError('Ошибка!', 'Не хватает зарядов Тома для поиска введённых STL')
          setErrorMinis(true);
        }
      } else {
        showError('STL нет', 'Таких STL не существует')
        setErrorMinis(true);
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
            <Grid.Col xl={4} lg={5} md={6} sm={12}>
              <Title order={1} style={{ marginBottom: '35px' }}>Том понимания <span style={{ cursor: 'help' }} onClick={open}><IconHelpHexagonFilled /></span></Title>
              <Title style={{ marginBottom: '15px' }}>Информация о твоём Томе</Title>
              <Stack align='flex-end' grow>
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
                <Title className={(tomeName && tomeName != 'undefined') ? '' : classes.disabledClass}>Поиск STL по коду</Title>
                <Text style={{ marginBottom: '15px' }} className={(tomeName && tomeName != 'undefined') ? '' : classes.disabledClass}>Чтобы найти нужные тебе STL - просто введи необходимые коды ниже. Например: 017027018. На поиск 1 STL уходит 1 заряд Тома.</Text>
                <MultiSelect
                  data={stlsCodes}
                  placeholder="Введи коды STL файлов (по одному)"
                  searchable
                  creatable
                  getCreateLabel={(query) => `+ ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query };
                    setStlsCodes((current) => [...current, item]);
                    return item;
                  }}
                  disabled={!(tomeName && tomeName != 'undefined')}
                  className={(tomeName && tomeName != 'undefined') ? '' : classes.disabledClass}
                  value={chosenSTLCodes}
                  onChange={(e) => {
                    setErrorMinis(false);
                    setChosenSTLCodes(e);
                  }}
                  size='lg'
                  classNames={{
                    input: classes.input
                  }}
                  error={errorMinis}
                />
                <Button
                  style={{ marginTop: '15px' }}
                  disabled={!(tomeName && tomeName != 'undefined') || (seconds > 0)}
                  className={(tomeName && tomeName != 'undefined') ? '' : classes.disabledClass}
                  onClick={findMinis}
                  color='violet'
                  size='md'
                  fullWidth
                >
                  {seconds > 0 ? seconds : 'Найти'}
                </Button>
              </>
            </Grid.Col>
            <Grid.Col xl={8} lg={7} md={6} sm={12}>

              <ScrollArea w={'100%'}>
                <Table fontSize="md" highlightOnHover className={(tomeName && tomeName != 'undefined') ? '' : classes.disabledClass}>
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
            <Image src='/tome.png'/>
            <Title order={3} align='center'>
              Том Понимания
            </Title>
            <Title order={4} align='center'>(легенд.)</Title>
            <Divider style={{margin: '10px'}}/>
            <Text align='center'>Том Понимания позволяет своему пользователю достоверно узнать, какая студия и в каком наборе выпустила конкретную миниатюру. Это полезно для тех, у кого и так большая коллекция, поэтому смысла покупать файлы нет, а узнать, где искать файл - хочется. На поиск 1 миниатюры уходит 1 заряд Тома.</Text>
          </Modal>
        </main >
      </CustomAppShell >
    </>
  )
}
