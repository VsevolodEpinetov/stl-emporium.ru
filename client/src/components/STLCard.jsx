//import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Card, Text, Group, Center, createStyles, Modal, Image, Badge, getStylesRef, rem, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Button, ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { generateDescriptionString } from '@/utils/helpers';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import STLCarouselItems from './STLCarouselItems';
import { useState } from 'react';

const useStyles = createStyles((theme) => {
  return {
    card: {
      position: 'relative',
      height: rem(380),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

      [`&:hover .${getStylesRef('image')}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ...theme.fn.cover(),
      ref: getStylesRef('image'),
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
      marginBottom: rem(5),
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: rem(7),
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
  newFilters,
  filtersLoading
}) => {
  const TRANSITION_DURATION = 200;
  const { classes, theme } = useStyles();
  const [opened, handlers] = useDisclosure(false);
  const [embla, setEmbla] = useState(null);

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      target="_blank"
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        if (e.target.tagName == 'DIV') {
          if (e.target.className.indexOf('Modal-overlay') > -1) return;
          handlers.open()
        }
      }}
    >
      <div className={classes.image} style={{ backgroundImage: `url(https://api.stl-emporium.ru${item.attributes.mainPicture.data.attributes.url})`, backgroundPosition: 'center' }} />
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
              {!filtersLoading && newFilters && generateDescriptionString(item.attributes, type, newFilters)}
              {filtersLoading && <>...</>}
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

      <Modal
        closeOnEscape
        closeOnClickOutside
        opened={opened}
        onClose={() => handlers.close()}
        title={item.attributes.code}
        centered
        size='lg'
      >
        {item.attributes.gallery?.data?.length > 0 ?
          <Carousel
            mx="auto"
            withIndicators
            slideSize="80%"
            slideGap="md"
            getEmblaApi={setEmbla}
          >
            {item.attributes.gallery.data.map((imageData) => <STLCarouselItems imageUrl={imageData.attributes.url} id={`carousel-item-${item.attributes.code}-${imageData.id}`} miniCode={item.attributes.code} />)}
          </Carousel>
          :
          <Image
            mx="auto"
            radius="md"
            src={`https://api.stl-emporium.ru${item.attributes.mainPicture.data.attributes.url}`}
            alt={`Превьюшка миньки ${item.attributes.code}`} />
        }
        <Center>
          {amountInCart == 0 ?
            <Button onClick={() => addToACart(item.attributes.code, chosenMode)} style={{ margin: '15px' }}>Добавить в корзину</Button>
            :
            chosenMode == 'stl' ?
              <Button onClick={() => removeItem(item.attributes.code, chosenMode)} color="red" style={{ margin: '15px' }}>Удалить из корзины</Button>
              :
              <Group>
                <Button onClick={() => removeItem(item.attributes.code, chosenMode)} variant='outline' color='red' style={{ margin: '15px' }}>-1</Button>
                <Text size='lg' style={{ margin: '15px' }}>{amountInCart}</Text>
                <Button onClick={() => addToACart(item.attributes.code, chosenMode)} variant='outline' color='green' style={{ margin: '15px' }}>+1</Button>
              </Group>
          }
        </Center>
      </Modal>
    </Card>
  )
};