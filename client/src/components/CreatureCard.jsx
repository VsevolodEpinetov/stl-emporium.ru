//import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Card, Text, Group, Center, createStyles, Modal, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Button, ActionIcon } from '@mantine/core';
import { useEffect, useRef, useState } from "react";
import { IconMinus, IconPlus } from '@tabler/icons-react';
const FILTERS = require("../../data/filters.json")

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

function getStringForClassesAndRaces(creature) {
  let str = '';
  let arr = [];

  creature.classes.forEach(cl => {
    FILTERS.classes.forEach(clData => {
      if (clData.value == cl) arr.push(clData.label)
    })
  })


  for (let i = 0; i < FILTERS.races.length; i++) {
    if (FILTERS.races[i].value == creature.race) {
      str += FILTERS.races[i].label + ', ';
      break;
    }
  }

  switch (creature.sex) {
    case 'f':
      str += 'Женщина, '
      break;
    case 'm':
      str += 'Мужчина, '
      break;
    default:
      str += '???, '
      break;
  }

  str += arr.join(', ')

  return str;
}

export const CreatureCard = ({ creatureData, isInCart, addACreatureToACart, removeACreatureFromACart }) => {
  const { classes, theme } = useStyles();
  const [opened, handlers] = useDisclosure(false);
  const [displayMode, setDisplayMode] = useState();
  const [actualOpacity, setActualOpacity] = useState(100);
  const cardElement = useRef(null);

  useEffect(() => {
    if (creatureData.opacity == 100) {
      setActualOpacity(100);
      setDisplayMode('block')
    } else {
      setActualOpacity(0)
      setDisplayMode('none')
    }
  }, [])

  useEffect(() => {
    if (creatureData.opacity == 100) {
      setDisplayMode('block')
      setTimeout(function () {
        setActualOpacity(100)
      }, 50)
    } else {
      setActualOpacity(0)
      setTimeout(function () {
        setDisplayMode('none')
      }, 150)
    }
  }, [creatureData.opacity])

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      target="_blank"
      style={{ opacity: actualOpacity, transition: 'all 150ms ease', display: displayMode, cursor: 'pointer' }}
      ref={cardElement}
      onClick={(e) => { if (e.target.tagName == 'DIV') handlers.open(); }}
    >
      <div className={classes.image} style={{ backgroundImage: `url(https://api.epinetov.com${creatureData.attributes.mainPicture.data.attributes.url})`, backgroundPosition: 'center' }} />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} weight={500}>
            {creatureData.attributes.name}
          </Text>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author} style={{ maxWidth: '70%' }}>
              {getStringForClassesAndRaces(creatureData.attributes)}
            </Text>

            <Group>
              <Center>
                {isInCart == 0
                  ?
                  <ActionIcon size="lg" variant="light" onClick={() => addACreatureToACart(creatureData)}>
                    <IconPlus size={26} />
                  </ActionIcon>
                  :
                  <Group>
                    <ActionIcon size="lg" color={'red'} variant="outline" onClick={() => removeACreatureFromACart(creatureData)}>
                      <IconMinus size={26} />
                    </ActionIcon>
                    <ActionIcon size="lg" color={'green'} variant="outline" onClick={() => addACreatureToACart(creatureData)}>
                      {isInCart}
                    </ActionIcon>
                  </Group>
                }
                { }
              </Center>
            </Group>
          </Group>
        </div>
      </div>

      <Modal opened={opened} onClose={() => handlers.close()} title={creatureData.attributes.name} centered>
        <Image mx="auto" radius="md" src={`https://api.epinetov.com${creatureData.attributes.mainPicture.data.attributes.url}`} alt={`Превьюшка миньки ${creatureData.attributes.name}`} style={{ marginBottom: '15px'}}/>
        <Center>
          {
            isInCart == 0 ?
            <Button onClick={() => addACreatureToACart(creatureData)}>Добавить в корзину</Button>
            :
            <Button onClick={() => removeACreatureFromACart(creatureData)} color="red">Удалить из корзины</Button>
          }
        </Center>
      </Modal>
    </Card>
  )
};