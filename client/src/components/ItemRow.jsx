import { ActionIcon, Badge, Code, Skeleton } from '@mantine/core';
import React from 'react';
import CreatureImageWithModal from './CreatureImageWithModal';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';


const ItemRow = ({ itemCartInfo, removeAllInstances, loading }) => {
    return (
        <>
            {loading ?
                <tr>
                    <td><Skeleton height={100} width={100} radius='sm' /></td>
                    <td><Skeleton height={12} width="100%" radius='xl' /></td>
                    <td><Skeleton height={12} width="100%" radius='xl' /></td>
                    <td><Skeleton height={12} width="100%" radius='xl' /></td>
                    <td><Skeleton height={12} width="100%" radius='xl' /></td>
                    <td><Skeleton height={12} width="100%" radius='xl' /></td>
                    <td><ActionIcon size="lg" disabled><IconTrash size="1.625rem" /></ActionIcon></td>
                </tr>
                :
                <tr>
                    <td>
                        <CreatureImageWithModal
                            imageSource={`https://api.stl-emporium.ru${itemCartInfo.info.mainPicture.data.attributes.url}`}
                            miniName={itemCartInfo.info.name}
                            gallery={itemCartInfo.info.gallery}
                            code={itemCartInfo.info.code}
                        />
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