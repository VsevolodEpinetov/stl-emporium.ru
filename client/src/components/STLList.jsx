import { Group, Image, SimpleGrid, Skeleton } from '@mantine/core';
import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { STLCard } from './STLCard';

const STLList = ( {loading, miniatures, type, filters} ) => {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })

  function getAmountInCart(itemCode) {
    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === chosenMode) {
        index = i;
        break;
      }
    }
    if (index > -1) { return shoppingCart[index].amount; }
    else { return 0; }
  }
  
  function removeItem(itemCode) {
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === chosenMode) {
        if (shoppingCart[i].amount > 1) {
          let newAmount = shoppingCart[i].amount - 1;
          setShoppingCart(shoppingCart.map((item, id) => {
            if (id !== i) {
              // This isn't the item we care about - keep it as-is
              return item
            }
  
            // Otherwise, this is the one we want - return an updated value
            return {
              ...item,
              amount: newAmount
            }
          }))
        } else {
          setShoppingCart([...shoppingCart.slice(0, i), ...shoppingCart.slice(i + 1)])
        }
      }
    }
  }

  function addToACart(itemCode) {
    const itemObject = {
      code: itemCode,
      type: chosenMode,
      amount: 1
    }

    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === chosenMode) {
        index = i
      }
    }

    if (index > -1) {
      if (chosenMode === 'stl') { return; }
      else {
        let newAmount = shoppingCart[index].amount + 1;
        setShoppingCart(shoppingCart.map((item, id) => {
          if (id !== index) {
            // This isn't the item we care about - keep it as-is
            return item
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            amount: newAmount
          }
        }))
      }
    } else {
      setShoppingCart([
        ...shoppingCart,
        itemObject
      ])
    }
  }

  function addToACart(itemCode) {
    const itemObject = {
      code: itemCode,
      type: chosenMode,
      amount: 1
    }

    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === chosenMode) {
        index = i
      }
    }

    if (index > -1) {
      if (chosenMode === 'stl') { return; }
      else {
        let newAmount = shoppingCart[index].amount + 1;
        setShoppingCart(shoppingCart.map((item, id) => {
          if (id !== index) {
            // This isn't the item we care about - keep it as-is
            return item
          }

          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            amount: newAmount
          }
        }))
      }
    } else {
      setShoppingCart([
        ...shoppingCart,
        itemObject
      ])
    }
  }
  
  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'lg', cols: 4, spacing: 'md' },
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 3, spacing: 'sm' },
        { maxWidth: 'xs', cols: 2, spacing: 'sm' },
      ]}
    >
      {
        loading ?
          Array(25).fill('1').map((skeleton, id) => <Skeleton height={380} mb="xl" key={`skeleton-${id}`} />)
          : miniatures?.length > 0 ?
            miniatures.map(creature => 
            <STLCard
              item={creature}
              key={`card-${creature.id}`}
              amountInCart={getAmountInCart(creature.attributes.code)}
              addToACart={addToACart}
              removeItem={removeItem}
              chosenMode={chosenMode}
              filters={filters}
              type={type}
            />)
            :
            <Group>
              Нет фигурок по таким фильтрам!
              <Image
                src="dude.svg"
                alt="Shrug dude"
                style={{ filter: "invert(95%) sepia(1%) saturate(0%) hue-rotate(139deg) brightness(82%) contrast(90%)" }}
              />
            </Group>
      }
    </SimpleGrid>
  );
};

export default STLList;