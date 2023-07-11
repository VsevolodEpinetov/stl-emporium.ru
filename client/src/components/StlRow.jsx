import { ActionIcon, Badge, Code, Skeleton } from '@mantine/core';
import React from 'react';
import CreatureImageWithModal from './CreatureImageWithModal';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';


const StlRow = ({ stlInfo }) => {
  return (
    <>
      <tr>
        <td>
          <CreatureImageWithModal imageSource={`https://api.stl-emporium.ru${stlInfo.mainPicture.data.attributes.url}`} miniName={stlInfo.name} />
        </td>
        <td><Code>{stlInfo.code}</Code></td>
        <td>{stlInfo.studioName}</td>
        <td>{stlInfo.releaseName}</td>
      </tr>
    </>
  );
};

export default StlRow;