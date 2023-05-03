import Head from 'next/head'
import { useLocalStorage, useDisclosure, useClipboard } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import { Navbar, Image, UnstyledButton, Group, ThemeIcon, Text, Divider, Table, ActionIcon, Header, MediaQuery, Burger, AppShell, Title, Button, Modal, Code, CopyButton, List, ScrollArea, Anchor } from '@mantine/core'
import { IconSword, IconShoppingCart, IconTrash } from '@tabler/icons-react'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'


//#region  MenuLink
function MainLink({ icon, color, label, link = '#' }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component="a"
      href={link}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
//#endregion

export default function Home(props) {
  const [opened, setOpened] = useState(false);
  const [chosenCreatures, setChosenCreatures] = useLocalStorage({ key: 'chosen-creatures', defaultValue: [] });
  const [cart, setCart] = useState([]);
  const [modalOpened, handlersModal] = useDisclosure(false);
  const [modalOpenedImage, handlersModalImage] = useDisclosure(false);
  const clipboard = useClipboard({ timeout: 500 });

  useEffect(() => {
    if (chosenCreatures) {
      let newCart = [];
      let dictionary = {};
      chosenCreatures.forEach(creature => {
        if (typeof dictionary[creature.id] == 'undefined') {
          dictionary[creature.id] = newCart.length;
          newCart.push({
            ...creature,
            count: 1
          })
        } else {
          newCart[dictionary[creature.id]].count = newCart[dictionary[creature.id]].count + 1;
        }
      })

      setCart(newCart);
    }
  }, [chosenCreatures])

  const getTotal = () => {
    let total = 0;
    cart.forEach(cr => {
      total += cr.attributes.price * cr.count;
    })
    return total;
  }

  const getStringWithCodes = () => {
    let str = cart.map(cr => cr.attributes.code).join(', ');
    return str;
  }

  const getArrayWithCodes = () => {
    let arr = cart.map(cr => cr.attributes.code);
    return arr;
  }


  function removeAllInstances(creature) {
    let copy = chosenCreatures.slice();
    copy = copy.filter(cr => creature.id !== cr.id)
    setChosenCreatures(copy)
  }

  return (
    <>
      <Head />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<CustomNavbar opened={opened} setOpened={setOpened} cartSize={chosenCreatures.length} currentRoute='/cart' />}
        header={<CustomHeader opened={opened} setOpened={setOpened} />}
      >
        <main>
          <Title order={1}>Твоя корзина</Title>
          {
            cart.length > 0
              ?
              <>
                <ScrollArea w={'100%'} style={{ margin: '25px' }}>
                  <Table fontSize="md" highlightOnHover>
                    <thead>
                      <tr>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Код</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Итого</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart && cart.map(creature => (
                        <tr key={creature.id}>
                          <td><Image maw={50} mx="auto" radius="md" src={`https://api.stl-emporium.ru${creature.attributes.mainPicture.data.attributes.url}`} alt={`Превьюшка модельки ${creature.attributes.name}`} onClick={(e) => { handlersModalImage.open(); }} style={{ cursor: 'pointer' }} /></td>
                          <td>{creature.attributes.name}</td>
                          <td><Code>{creature.attributes.code}</Code></td>
                          <td>{creature.count}</td>
                          <td>{creature.attributes.price}</td>
                          <td>{creature.attributes.price * creature.count}</td>
                          <td><ActionIcon size="lg" onClick={() => removeAllInstances(creature)}><IconTrash size="1.625rem" /></ActionIcon></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </ScrollArea>
                <Text fz='lg'>Итого: <b>{getTotal()}</b> {/*<span style={{ textDecoration: 'underline dotted', cursor: 'help' }} onClick={() => handlersModal.open()}>Как оплатить и получить файлы?</span>*/}</Text>
                <Button>
                  Оплатить {getTotal()} рублей
                </Button>
              </>
              :
              <>
                <Text>Корзина пока что пустая!</Text>
                Самое время выбрать себе несколько <Anchor href='/'>героев</Anchor> ;)
              </>
          }
          <Modal opened={modalOpened} onClose={() => handlersModal.close()} title='Как оплатить и получить файлы?' centered size='lg' style={{ padding: '45px' }}>
            <Group style={{ margin: '25px' }}>
              <Text>На данный момент файлы можно получить одним образом:</Text>
              <List>
                <List.Item>Напиши мне в телегу.</List.Item>
                <List.Item>Приложи артикулы нужных тебе минек: </List.Item>
                <List withPadding unordered>
                  {getArrayWithCodes().map(cr => <List.Item><Code>{cr}</Code></List.Item>)}
                </List>
              </List>
              <CopyButton value="test text btw">
                {({ copied, copy }) => (
                  <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                    {copied ? 'Copied url' : 'Copy url'}
                  </Button>
                )}
              </CopyButton>
            </Group>
          </Modal>
          {cart.map(cr => {
            return (
              <Modal opened={modalOpenedImage} onClose={() => handlersModalImage.close()} title='Превью' centered size='lg' style={{ padding: '45px' }}>
                <Image mx="auto" radius="md" src={`https://api.stl-emporium.ru${cr.attributes.mainPicture.data.attributes.url}`} alt={`Превьюшка миньки ${cr.attributes.name}`} />
              </Modal>
            )
          })}
        </main >
      </AppShell >
    </>
  )
}