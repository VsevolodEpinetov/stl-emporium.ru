//import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Text, Group, Center, Modal, Image, Badge, Paper, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Button, ActionIcon } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import STLCarouselItems from '../STLCarouselItems';
import { useEffect, useRef, useState } from 'react';
import STLInfoHoverCard from '../STLInfoHoverCard';
import classes from './STLCard.module.css';


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
  const [opened, handlers] = useDisclosure(false);
  const [embla, setEmbla] = useState(null);

  const [cardWidth, setCardWidth] = useState(0)
  const refCard = useRef(null)

  useEffect(() => {
    setCardWidth(refCard.current.clientWidth)
  }, [])

  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <Paper
      p="lg"
      shadow="lg"
      radius="md"
      style={{ cursor: 'pointer', backgroundImage: `url(https://api.stl-emporium.ru${item.attributes.mainPicture.data.attributes.url})` }}
      onClick={(e) => {
        if (e.target.tagName == 'DIV') {
          if (e.target.className.indexOf('Modal-overlay') > -1) return;
          handlers.open()
        }
      }}
      ref={refCard}
      className={classes.card}
    >
      <div className={classes.overlay} />
      <div className={classes.badgeWrapper}>
        <Text fw={700} style={{opacity: '50%'}}>
          {item.attributes.code}
        </Text>
        {
          chosenMode === 'stl'
            ?
            <Badge variant="light" size="lg" >STL</Badge>
            :
            <Badge variant="light" size="lg" color='green' >Фигурка</Badge>
        }
      </div>

      <Group justify="space-between" w='100%' align='flex-end' style={{zIndex: 2}}>
        <Flex direction='column' justify='flex-end' align='center'>
          <Text size="lg" fw={500}>
            {chosenMode === 'stl' ? item.attributes.priceSTL : item.attributes.pricePhysical}₽
          </Text>
          {!filtersLoading && newFilters && <STLInfoHoverCard info={item.attributes} type={type} newFilters={newFilters} cardWidth={cardWidth} />}
          {filtersLoading && <>...</>}
        </Flex>
        {amountInCart == 0
          ?
          <ActionIcon size="lg" variant="light" color="gray" onClick={() => addToACart(item.attributes.code, chosenMode)}>
            <IconPlus size={26} />
          </ActionIcon>
          :
          <Group>
            <ActionIcon size="lg" color='red' variant="outline" onClick={() => removeItem(item.attributes.code, chosenMode)}>
              <IconMinus size={26} />
            </ActionIcon>
            <ActionIcon size="lg" color='green' variant="outline" onClick={() => addToACart(item.attributes.code, chosenMode)}>
              {amountInCart}
            </ActionIcon>
          </Group>
        }
      </Group>

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

    </Paper>
  )
};