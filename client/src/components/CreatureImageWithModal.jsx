import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Image, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import STLCarouselItems from './STLCarouselItems';

const CreatureImageWithModal = ({ imageSource, miniName, gallery, code }) => {
  const [modalOpenedImage, handlersModalImage] = useDisclosure(false);
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <>
      <Image maw={100} mx="auto" radius="md" src={imageSource} alt={`Превьюшка модельки ${miniName}`} onClick={(e) => { handlersModalImage.open(); }} style={{ cursor: 'pointer' }} />
      <Modal opened={modalOpenedImage} onClose={() => handlersModalImage.close()} title='Превью' centered size='lg' style={{ padding: '45px' }}>
        {gallery?.data?.length > 0 ?
          <Carousel
            mx="auto"
            withIndicators
            slideSize="80%"
            slideGap="md"
            getEmblaApi={setEmbla}
          >
            {gallery.data.map((imageData) => <STLCarouselItems imageUrl={imageData.attributes.url} id={`carousel-item-${code}-${imageData.id}`} miniCode={code} />)}
          </Carousel>
          :
          <Image
            mx="auto"
            radius="md"
            src={imageSource}
            alt={`Превьюшка миньки ${miniName}`} />
        }
      </Modal>
    </>
  );
};

export default CreatureImageWithModal;