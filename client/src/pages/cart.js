import Head from 'next/head'
import { useLocalStorage, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import { Group, Text, Table, Title, Button, Modal, List, ScrollArea, Anchor, Grid, Paper, Divider, Stack, Select, TextInput } from '@mantine/core'
import { IconAt, IconBrandTelegram, IconBrandVk } from '@tabler/icons-react'
import ItemRow from '@/components/ItemRow';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CustomAppShell from '@/components/CustomAppShell/CustomAppShell';
import { fetchDataFromURINew } from '@/utils/api';

function generateToken() {
  const firstPart = [
    'Обычный',
    'Редкий',
    'Эпический',
    'Легендарный',
    'Мифический',
    'Необычный',
    'Магический',
    'Странный',
    'Тайный',
    'Мерцающий',
    'Благословенный',
    'Жевательный',
    'Эфирный',
    'Мрачный',
    'Боевой',
    'Поддельный',
    'Фальшивый',
    'Темный',
    'Светлый',
    'Нескончаемый',
    'Резной',
    'Маленький',
    'Полный',
    'Цветной',
    'Монохромный',
    'Призрачный',
    'Серебрянный',
    'Золотой',
    'Алмазный',
    'Изумрудный',
    'Каменный',
    'Стальной',
    'Заколдованный',
    'Зачаренный',
    'Счастливый',
    'Угрюмый',
    'Унылый',
    'Радостный',
    'Затерянный',
    'Спокойный',
    'Кричащий',
    'Орущий',
    'Странствующий',
    'Болтливый',
    'Смертоносный',
    'Исцеляющий',
    'Невредимый',
    'Пророческий',
    'Мясной',
    'Пьяный',
    'Трезвый',
    'Острый',
    'Тупой',
    'Свежий',
    'Вонючий',
    'Грязный',
    'Восхитительный',
    'Большой',
    'Праздничный',
    'Обыденный',
    'Пивной',
    'Мощный',
    'Хилый',
    'Возрожденный',
    'Высокорожденный',
    'Перерожденный',
    'Древний',
    'Новый',
    'Точный',
    'Меткий',
    'Слепой',
    'Зрячий',
    'Рыбацкий',
    'Боевой',
    'Мирный',
    'Душный',
    'Прыткий',
    'Тренировочный',
    'Пахучий',
    'Составной',
    'Гейзерный',
    'Панцирный',
    'Терракотовый',
    'Запечатанный',
    'Небесный',
    'Земной',
    'Подземный',
    'Падающий',
    'Летящий',
    'Зимний',
    'Летний',
    'Весенний',
    'Осенний',
    'Хитроумный',
    'Игрушечный',
    'Лунный',
    'Любвеобильный',
    'Хмельной',
    'Вкусный',
    'Плетенный',
    'Мятный',
    'Взрывчатый',
    'Грибной',
    'Утиный'
  ]
  const secondPart = [
    'Мурлок',
    'Дракон',
    'Мимик',
    'Меч',
    'Посох',
    'Моргенштерн',
    'Кистень',
    'Слизень',
    'Кинжал',
    'Молот',
    'Арбалет',
    'Лук',
    'Топор',
    'Кнут',
    'Цеп',
    'Шакрам',
    'Лич',
    'Тролль',
    'Огр',
    'Бармаглот',
    'Архимаг',
    'Волшебник',
    'Паладин',
    'Следопыт',
    'Друид',
    'Архидруид',
    'Дух',
    'Рух',
    'Ифрит',
    'Трент',
    'Энт',
    'Скелет',
    'Изобретатель',
    'Орк',
    'Гоблин',
    'Воин',
    'Чернокнижник',
    'Некромант',
    'Эликсир',
    'Рог',
    'Разбойник',
    'Бочонок',
    'Дворф',
    'Гном',
    'Жрец',
    'Маг',
    'Таурен',
    'Следопыт',
    'Плут',
    'Варвар',
    'Чародей',
    'Нагрудник',
    'Шлем',
    'Щит',
    'Заряд',
    'Олень',
    'Брюхоног',
    'Ящик',
    'Сундук',
    'Банан',
    'Знак',
    'Камень',
    'Пульт',
    'Мяч',
    'Бард',
    'Штырь',
    'Жезл',
    'Мастер',
    'Наемник',
    'Череп',
    'Скакун',
    'Ангел',
    'Панцирь',
    'Шаман',
    'Цыпленок',
    'Монах',
    'Мистик',
    'Алхимик',
    'Бог',
    'Петух',
    'Орел'
  ]
  const thirdPart = [
    'Подземелья',
    'Слизня',
    'Вулкана',
    'Божества',
    'Бога',
    'Богини',
    'Митрила',
    'Болота',
    'Банана',
    'Рыбы',
    'Щенков',
    'Котят',
    'Камня',
    'Самоцветов',
    'Сплава',
    'Огня',
    'Магмы',
    'Воздуха',
    'Кожи',
    'Воды',
    'Снега',
    'Тряпок',
    'Ткани',
    'Меди',
    'Серебра',
    'Платины',
    'Льда',
    'Роз',
    'Жара',
    'Бочонка',
    'Ларца',
    'Ящика',
    'Тыквы',
    'Зубов',
    'Кости',
    'Конфет',
    'Шоколада',
    'Печенья',
    'Сахара',
    'Карамели',
    'Бумаги',
    'Смолы',
    'Волка',
    'Пластика',
    'Луносвета',
    'Подгорода',
    'Оргриммара',
    'Штормграда',
    'Даларана',
    'Стальгорна',
    'Дарнаса',
    'Экзодара',
    'Лимонада',
    'Лимонов',
    'Апельсинов',
    'Яблок',
    'Курицы',
    'Говядины',
    'Призрака',
    'Стали',
    'Генератора',
    'Вуду',
    'Монастыря',
    'Яйца',
    'Енота',
    'Пива',
    'Хмеля',
    'Эля',
    'Бухты',
    'Осколков',
    'Будущего',
    'Прошлого'
  ]

  const string = `${firstPart[Math.floor(Math.random() * firstPart.length)]}${secondPart[Math.floor(Math.random() * secondPart.length)]}Из${thirdPart[Math.floor(Math.random() * thirdPart.length)]}`
  return string;
}

export default function CartPage() {
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })

  const [shoppingCartWithData, setShoppingCartWithData] = useState([]);
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const [cartIsLoading, setCartIsLoading] = useState(true);

  const [discount, setDiscount] = useState(0);
  const [identificator, setIdentificator] = useState('')
  const [paymentIsInProgress, setPaymentIsInProgress] = useState(false)

  const [tooLowTotal, setTooLowTotal] = useState(false);


  const isMobile = useMediaQuery("(max-width: 50em)");
  const [vk, setVK] = useState('');
  const [tg, setTg] = useState('');
  const [mail, setMail] = useState('');
  const [optionsContacts, setOptionsContacts] = useState([]);
  const [chosenPreferredContact, setChosenPreferredContact] = useState('');
  const [payButtonIsDisabled, setPayButtonIsDisabled] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function redirectToSuccess(identificator, total, preferredMethod) {
    const params = new URLSearchParams(searchParams);
    params.set('identificator', identificator);
    params.set('total', total);
    params.set('preferredContact', preferredMethod)

    router.push('/payment-success' + '?' + params.toString());
  }

  const sendInfoToTelegram = async (total, vk, telegram, mail, preferredMethod, identificator) => {
    const response = await fetch(`/api/telegramService?total=${total}&vk=${vk}&telegram=${telegram}&mail=${mail}&preferredMethod=${preferredMethod}&identificator=${identificator}`, {

    })
  }

  async function placeOrder() {

    //TODO: field verifications
    setPaymentIsInProgress(true);
    let newCart = shoppingCart.map(item => {
      let newObj = {
        code: item.code,
        amount: item.amount,
        type: item.type
      }
      return newObj;
    })
    const totalCost = getTotal();
    const response = await fetchDataFromURINew('place-order', { 
      totalCost: totalCost, 
      cartItems: JSON.stringify(newCart),
      vk: vk, 
      tg: tg, 
      mail: mail,
      chosenPreferredContact: chosenPreferredContact, 
      identificator: identificator
    });


    if (!response.data.created) {
      // TODO: log errors
    } else {
      sendInfoToTelegram(totalCost, vk, tg, mail, chosenPreferredContact, identificator)
      setShoppingCart([]);
      redirectToSuccess(identificator, totalCost, chosenPreferredContact);
    }
  }

  useEffect(() => {
    let contacts = [];
    if (vk.length > 0) contacts.push({ label: 'ВКонтакте', value: 'vk' })
    if (tg.length > 0) contacts.push({ label: 'Telegram', value: 'telegram' })
    if (mail.length > 0) contacts.push({ label: 'Почту', value: 'mail' })

    if (chosenPreferredContact === 'vk' && vk.length === 0) setChosenPreferredContact('')
    if (chosenPreferredContact === 'telegram' && tg.length === 0) setChosenPreferredContact('')
    if (chosenPreferredContact === 'mail' && mail.length === 0) setChosenPreferredContact('')

    setOptionsContacts(contacts);
  }, [tg, vk, mail])

  useEffect(() => {
    setIdentificator(generateToken());
  }, [])

  useEffect(() => {
    if (chosenPreferredContact !== '') setPayButtonIsDisabled(false);
    else setPayButtonIsDisabled(true);
  }, [chosenPreferredContact])

  useEffect(() => {
    if (shoppingCartWithData.length > 0) {
      return;
    }

    if (shoppingCart.length === 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const allIds = shoppingCart.map(i => i.code);
        const [creaturesData, terrainsData, whCreaturesData, monstersData] = await Promise.all([
          fetchDataFromURINew('creatures', { codes: allIds }),
          fetchDataFromURINew('terrains', { codes: allIds }),
          fetchDataFromURINew('creatures', { codes: allIds, wh: true }),
          fetchDataFromURINew('monsters', { codes: allIds, wh: true })
        ]);

        const newObject = shoppingCart.map(item => {
          const data = creaturesData.data.find(d => d.attributes.code === item.code) ||
            terrainsData.data.find(d => d.attributes.code === item.code) || 
            whCreaturesData.data.find(d => d.attributes.code === item.code) || 
            monstersData.data.find(d => d.attributes.code === item.code) 

          if (data) {
            return {
              ...item,
              info: data.attributes
            };
          }

          return item;
        });

        setCartIsLoading(false);
        setShoppingCartWithData(newObject);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCartIsLoading(false);
      }
    };

    fetchData()
      .catch(console.error);  
  }, [shoppingCart]);

  const getTotal = () => {
    let total = 0;
    shoppingCartWithData.forEach(item => {
      let price = 9999;
      if (item.type === 'stl') price = item.info.priceSTL
      if (item.type === 'physical') price = item.info.pricePhysical
      total += price * item.amount;
    })
    return total;
  }

  function removeAllInstances(itemCode, type) {
    setShoppingCartWithData(prevCart => {
      const copy = prevCart.filter(item => item.code !== itemCode || item.type !== type);
      return copy;
    });
    setShoppingCart(prevCart => {
      const copy = prevCart.filter(item => item.code !== itemCode || item.type !== type);
      return copy;
    });
  }

  function getTotalByType(type) {
    let counter = 0;
    shoppingCartWithData.forEach(item => {
      if (item.type === type) {
        let price = 9999;
        if (type === 'stl') price = item.info.priceSTL
        if (type === 'physical') price = item.info.pricePhysical
        counter += price * item.amount;
      }
    })
    return counter;
  }

  function getAmountByType(type) {
    let counter = 0;
    shoppingCart.forEach(item => {
      if (item.type === type) counter += item.amount;
    })
    return counter;
  }

  const getWord = (amount) => {
    let lastDigit = amount % 10;
    if (lastDigit == 1) return 'товар'
    if (lastDigit > 1 && lastDigit <= 4) return 'товара'
    if (lastDigit == 0 || lastDigit > 4) return 'товаров'

    return ('товаров')
  }

  useEffect(() => {
    const total = getTotalByType('physical');
    if (total >= 1300 || total == 0) {
      setTooLowTotal(false)
    } else {
      setTooLowTotal(true)
    }
  }, [shoppingCartWithData])

  return (
    <>
      <Head />
      <CustomAppShell>
        <main style={{ padding: '25px' }}>
          <Title order={1}>Твоя корзина</Title>
          <Grid>
            <Grid.Col span={{ sm: 12, md: 8 }}>
              <Paper shadow="xs" p="md">
                {
                  shoppingCartWithData.length > 0 &&
                  <>
                    <ScrollArea w={'100%'}>
                      <Table fontSize="md" highlightOnHover>
                        <thead>
                          <tr>
                            <th>Изображение</th>
                            <th>Тип</th>
                            <th>Код</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Итого</th>
                            <th>Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shoppingCartWithData.length > 0 && shoppingCartWithData.map((item, id) => {
                            return (<ItemRow loading={cartIsLoading} itemCartInfo={item} key={`item-row-${item.info.code}-${id}`} removeAllInstances={removeAllInstances} />)
                          })}
                        </tbody>
                      </Table>
                    </ScrollArea>
                  </>
                }
                {
                  shoppingCartWithData.length == 0 && shoppingCart.length == 0 && !cartIsLoading &&
                  <>
                    <Text>Корзина пока что пустая!</Text>
                    Самое время выбрать себе несколько <Anchor href='/'>героев</Anchor> ;)
                  </>
                }
                {
                  shoppingCartWithData.length == 0 && shoppingCart.length > 0 && !cartIsLoading &&
                  <>
                    <Text>Ой-ёй...</Text>
                    Что-то пошло не так. Попробуй обновить страницу!
                  </>
                }
              </Paper>
            </Grid.Col>
            <Grid.Col span={{ sm: 12, md: 4 }}>
              <Paper shadow="xs" p="md" style={{ position: 'sticky', top: '15px' }}>
                <Button fullWidth size='lg' color='green' radius='md' onClick={() => { modalHandlers.open() }} disabled={tooLowTotal && true}>
                  Оформить заказ
                </Button>
                <Text size='sm' style={{ color: '#707070', margin: '25px 10px' }}>Оплатить заказ можно будет после того, как мы свяжемся для подтверждения.</Text>
                <Divider />
                <Group position="apart" style={{ margin: '15px 10px' }}>
                  <Title order={3}>Ваша корзина</Title>
                  <Text size='sm'>{getAmountByType('stl') + getAmountByType('physical')} {getWord(getAmountByType('stl') + getAmountByType('physical'))}</Text>
                </Group>
                <Group position="apart" style={{ margin: '25px 10px 0' }}>
                  <Text size='md'>STL ({getAmountByType('stl')})</Text>
                  <Text size='md'>{getTotalByType('stl')}₽ </Text>
                </Group>
                {getAmountByType('stl') > 0 && <div style={{ border: '2px solid #7a53ed', borderRadius: '10px', padding: '10px', margin: '5px' }}>
                  <Text size='sm'>Вы приобретаете электронный товар! STL файл предназначен для 3д печати, без принтера вы не сможете напечатать фигурку.</Text>
                </div>}
                <Group position="apart" style={{ margin: '5px 10px 0' }}>
                  <Text size='md' style={{ color: tooLowTotal && 'rgb(227, 69, 69)', fontWeight: tooLowTotal && 'bold' }}>Фигурки ({getAmountByType('physical')})</Text>
                  <Text size='md' style={{ color: tooLowTotal && 'rgb(227, 69, 69)', fontWeight: tooLowTotal && 'bold' }}>{getTotalByType('physical')}₽ </Text>
                </Group>
                {
                  tooLowTotal && <Text size='sm' style={{ color: 'rgb(227, 69, 69)', margin: '0px 10px 10px' }}>Мы отправляем фигурки только при заказах больше 1300 рублей.</Text>
                }
                <Group position="apart" style={{ margin: '5px 10px 0' }}>
                  <Text size='md'>Доставка</Text>
                  <Text size='md'>{getTotalByType('physical') > 0 ? '???' : '0'}₽ </Text>
                </Group>
                {
                  getAmountByType('physical') > 0 && <Text size='sm' style={{ color: '#707070', margin: '0px 10px 10px' }}>Стоимость доставки рассчитывается дополнительно.</Text>
                }
                <Group position="apart" style={{ margin: '5px 10px 15px' }}>
                  <Text size='md'>Скидка</Text>
                  <Text size='md'>-{discount}₽</Text>
                </Group>
                <Divider />
                <Group position="apart" style={{ margin: '15px 10px' }}>
                  <Title order={3}>Общая стоимость</Title>
                  <Title order={3}>{getTotal()}₽</Title>
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
          <Modal fullScreen={isMobile} opened={modalOpened} onClose={modalHandlers.close} title="Оплата и информация" centered size="lg">
            <Group position='center'>
              <Stack>
                <Text>
                  После оплаты заказ попадёт к нам, и мы начнём работу. В течение трёх дней (обычно - двух часов) с тобой свяжутся по предпочитаемому каналу связи.
                </Text>
                <Text>
                  Достаточно указать один любой контакт, но лучше указать все на всякий случай!
                </Text>
                <Divider />
                <TextInput
                  icon={<IconBrandTelegram />}
                  placeholder="Telegram"
                  value={tg}
                  onChange={(e) => setTg(e.currentTarget.value)}
                />
                <TextInput
                  icon={<IconBrandVk />}
                  placeholder="VK"
                  value={vk}
                  onChange={(e) => setVK(e.currentTarget.value)}
                />
                <TextInput
                  icon={<IconAt />}
                  placeholder="Почта"
                  value={mail}
                  onChange={(e) => setMail(e.currentTarget.value)}
                />
                <Select
                  label="Лучше, если со мной свяжутся через"
                  placeholder="Выбрать..."
                  data={optionsContacts}
                  value={chosenPreferredContact}
                  onChange={setChosenPreferredContact}
                />
                <Divider />
                <Text style={{ fontWeight: 'bold', color: '#a13838' }}>
                  Для того, чтобы потом ты мог отследить заказ на сайте, запиши следующие данные:
                </Text>
                <List>
                  <List.Item>Уникальный идентификатор: <b>{identificator}</b></List.Item>
                  <List.Item>Стоимость заказа: <b>{getTotal()}</b></List.Item>
                  <List.Item>Свои контакты</List.Item>
                </List>
                <Button size="xl" disabled={payButtonIsDisabled} onClick={() => placeOrder()} loading={paymentIsInProgress}>Разместить заказ на {getTotal()} рублей</Button>
                {/* <Group position="center">
                  <Image src='/tinkoff-logo.png' height={'15px'} width={'auto'} fit="contain" />
                  <Image src='/mir-logo.png' height={'15px'} width={'auto'} fit="contain" />
                  <Image src='/visa-logo.png' height={'15px'} width={'auto'} fit="contain" />
                  <Image src='/mastercard-logo.png' height={'15px'} width={'auto'} fit="contain" />
                </Group> */}
              </Stack>
            </Group>
          </Modal>
        </main >
      </CustomAppShell >
    </>
  )
}