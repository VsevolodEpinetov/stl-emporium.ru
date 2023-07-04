//import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Card, Text, Group, Center, createStyles, Modal, Image, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Button, ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { generateDescriptionString } from '@/utils/helpers';

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      position: 'relative',
      height: 400,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

export const STLCard = ({ 
  item, 
  addToACart, 
  removeItem, 
  chosenMode, 
  amountInCart,
  type,
  filters,
  gotRacesAndClasses
}) => {
  const { classes, theme } = useStyles();
  const [opened, handlers] = useDisclosure(false);

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      target="_blank"
      style={{ cursor: 'pointer' }}
      onClick={(e) => { console.log(item.attributes); if (e.target.tagName == 'DIV') handlers.open(); }}
    >
      <div className={classes.image} style={{ backgroundImage: `url(https://api.epinetov.com${item.attributes.mainPicture.data.attributes.url})`, backgroundPosition: 'center' }} />
      <div className={classes.overlay} />

      <div className={classes.content}>
        {
          chosenMode === 'stl'
            ?
            <Badge size="lg" style={{ position: 'absolute', top: '0', right: '0' }}>STL</Badge>
            :
            <Badge size="lg" color='green' style={{ position: 'absolute', top: '0', right: '0' }}>Фигурка</Badge>
        }
        <div>
          <Group position="apart" spacing="xs">
            <Text size="lg" className={classes.title} weight={500}>
              {chosenMode === 'stl' ? item.attributes.priceSTL : item.attributes.pricePhysical}₽
            </Text>
          </Group>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author} style={{ maxWidth: '70%' }}>
              {generateDescriptionString(item.attributes, type, filters)}
            </Text>

            <Group>
              <Center>
                {amountInCart == 0
                  ?
                  <ActionIcon size="lg" variant="light" onClick={() => addToACart(item.attributes.code, chosenMode)}>
                    <IconPlus size={26} />
                  </ActionIcon>
                  :
                  <Group>
                    <ActionIcon size="lg" color={'red'} variant="outline" onClick={() => removeItem(item.attributes.code, chosenMode)}>
                      <IconMinus size={26} />
                    </ActionIcon>
                    <ActionIcon size="lg" color={'green'} variant="outline" onClick={() => addToACart(item.attributes.code, chosenMode)}>
                      {amountInCart}
                    </ActionIcon>
                  </Group>
                }
                { }
              </Center>
            </Group>
          </Group>
        </div>
      </div>

      <Modal opened={opened} onClose={() => handlers.close()} title={gotRacesAndClasses ? `${item.attributes.studioName}, ${item.attributes.releaseName}`: item.attributes.code} centered >
        <Image mx="auto" radius="md" src={`https://api.epinetov.com${item.attributes.mainPicture.data.attributes.url}`} alt={`Превьюшка миньки ${item.attributes.code}`} style={{ marginBottom: '15px' }} />
        <Center>
          {amountInCart == 0 ?
            <Button onClick={() => addToACart(item.attributes.code, chosenMode)}>Добавить в корзину</Button>
            :
            chosenMode == 'stl' ?
              <Button onClick={() => removeItem(item.attributes.code, chosenMode)} color="red">Удалить из корзины</Button>
              :
              <Group>
                <Button onClick={() => removeItem(item.attributes.code, chosenMode)} variant='outline' color='red'>-1</Button>
                <Text size='lg'>{amountInCart}</Text>
                <Button onClick={() => addToACart(item.attributes.code, chosenMode)} variant='outline' color='green'>+1</Button>
              </Group>
          }
        </Center>
      </Modal>
    </Card>
  )
};