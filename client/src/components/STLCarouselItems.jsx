import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import React from 'react';

const STLCarouselItems = ({imageUrl, miniCode}) => {
  return (
    <Carousel.Slide>
      <Image
        mx="auto"
        radius="md"
        src={`https://api.stl-emporium.ru${imageUrl}`}
        alt={`Превьюшка миньки ${miniCode}`}
      />
    </Carousel.Slide>
  );
};

export default STLCarouselItems;