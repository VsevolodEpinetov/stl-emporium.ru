import { ActionIcon, Badge, Code, Image, Modal, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import CreatureImageWithModal from './CreatureImageWithModal';
import { useState } from 'react';
import { useEffect } from 'react';
import { IconTrash } from '@tabler/icons-react';

const API_URL = 'https://api.stl-emporium.ru/api/creatures?populate=*'
async function fetchDataFromURI(URI) {
    const rawData = await fetch(URI)
    const data = await rawData.json();

    return data?.data;
}

const ItemRow = ({ itemCartInfo, removeAllInstances }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading ?
                <tr>
                    <td><Skeleton height={100} width={100} radius='sm'/></td>
                    <td><Skeleton height={12} width="100%" radius='xl'/></td>
                    <td><Skeleton height={12} width="100%" radius='xl'/></td>
                    <td><Skeleton height={12} width="100%" radius='xl'/></td>
                    <td><Skeleton height={12} width="100%" radius='xl'/></td>
                    <td><Skeleton height={12} width="100%" radius='xl'/></td>
                    <td><ActionIcon size="lg" disabled><IconTrash size="1.625rem" /></ActionIcon></td>
                </tr>
                :
                <tr>
                    <td>
                        <CreatureImageWithModal imageSource={`https://api.stl-emporium.ru${itemCartInfo.info.mainPicture.data.attributes.url}`} miniName={itemCartInfo.info.name} />
                    </td>
                    <td>{itemCartInfo.type === 'stl' ? <Badge variant="filled">STL</Badge> : <Badge color='green' variant="filled">Фигурка</Badge>}</td>
                    <td><Code>{itemCartInfo.code}</Code></td>
                    <td>{itemCartInfo.amount}</td>
                    <td>{itemCartInfo.type === 'stl' ? itemCartInfo.info.priceSTL : itemCartInfo.info.pricePhysical}</td>
                    <td>{itemCartInfo.type === 'stl' ? itemCartInfo.info.priceSTL * itemCartInfo.amount : itemCartInfo.info.pricePhysical * itemCartInfo.amount}</td>
                    <td><ActionIcon size="lg" onClick={() => removeAllInstances(itemCartInfo.code, itemCartInfo.type)}><IconTrash size="1.625rem" /></ActionIcon></td>
                </tr>
            }
        </>
    );
};

export default ItemRow;