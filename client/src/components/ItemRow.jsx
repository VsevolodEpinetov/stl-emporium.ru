import { ActionIcon, Code, Image, Modal, Skeleton } from '@mantine/core';
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

const ItemRow = ({ itemCartInfo, priceForItems, setPriceForItems  }) => {
    const [itemData, setItemData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchDataFromURI(`${API_URL}&filters[code][$eq]=${itemCartInfo.code}`).then(data => {
            setItemData(data[0].attributes);
            setPriceForItems(priceForItems + data[0].attributes.price * itemCartInfo.count)
            setLoading(false);
        })
    }, [itemCartInfo])

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
                        <CreatureImageWithModal imageSource={`https://api.stl-emporium.ru${itemData?.mainPicture.data.attributes.url}`} miniName={itemData?.name} />
                    </td>
                    <td>{itemCartInfo.type}</td>
                    <td><Code>{itemData?.code}</Code></td>
                    <td>{itemCartInfo.count}</td>
                    <td>{itemData?.price}</td>
                    <td>{itemData?.price * itemCartInfo.count}</td>
                    <td><ActionIcon size="lg" onClick={() => removeAllInstances(itemCartInfo.code)}><IconTrash size="1.625rem" /></ActionIcon></td>
                </tr>
            }
        </>
    );
};

export default ItemRow;