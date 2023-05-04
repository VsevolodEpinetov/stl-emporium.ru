import { Image, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

const CreatureImageWithModal = ( {imageSource, miniName} ) => {
  const [modalOpenedImage, handlersModalImage] = useDisclosure(false);

  return (
    <>
      <Image maw={100} mx="auto" radius="md" src={imageSource} alt={`Превьюшка модельки ${miniName}`} onClick={(e) => { handlersModalImage.open(); }} style={{ cursor: 'pointer' }} />
      <Modal opened={modalOpenedImage} onClose={() => handlersModalImage.close()} title='Превью' centered size='lg' style={{ padding: '45px' }}>
        <Image mx="auto" radius="md" src={imageSource} alt={`Превьюшка миньки ${miniName}`} />
      </Modal>
    </>
  );
};

export default CreatureImageWithModal;