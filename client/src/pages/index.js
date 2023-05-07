import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll, usePagination } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import { CreatureCard } from '@/components/CreatureCard'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import { SimpleGrid, Image, Group, AppShell, Skeleton, Title, Pagination, Center, Button } from '@mantine/core'
const FILTERS = require("../../data/filters.json")

const API_URL = 'https://api.stl-emporium.ru/api/creatures?populate=*&sort=createdAt:desc'

async function fetchDataFromURI(URI) {
  const rawData = await fetch(URI)
  const data = await rawData.json();
  
  return {
    miniatures: data?.data,
    meta: data?.meta
  };
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [shoppingCart, setShoppingCart] = useLocalStorage({key: 'shopping-cart', defaultValue: []})

  const [scroll, scrollTo] = useWindowScroll();

  const races = FILTERS.races;
  const classes = FILTERS.classes;

  const [atLeast1Visible, handleAtLeast1Visible] = useDisclosure(true);
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const [miniatures, setMiniatures] = useState();
  const [loading, setLoading] = useDisclosure(true);
  const [totalFound, setTotalFound] = useState(0);
  const [totalFoundIsHidden, setTotalFoundIsHidden] = useDisclosure(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [mode, setMode] = useState('stl');

  useEffect(async () => {
    fetchDataFromURI(`${API_URL}&pagination[pageSize]=20`).then(data => {
      const minis = data?.miniatures;
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    })
  }, [])

  const getSelectedHeroes = async () => {
    setLoading.open();
    setCurrentPage(1);
    scrollTo({ y: 0 })
    let options = '';

    if (selectedRaces.length > 0) {
      selectedRaces.forEach(r => {
        options += `&filters[race][$contains]=${r}`
      })
    }

    if (selectedClasses.length > 0) {
      selectedClasses.forEach(c => {
        options += `&filters[classes][$contains]=${c}`
      })
    }

    if (selectedSexes.length > 0) {
      selectedSexes.forEach(s => {
        options += `&filters[sex][$contains]=${s}`
      })
    }

    fetchDataFromURI(`${API_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`).then(data => {
      let minis = data.miniatures.map(cr => {
        return {
          ...cr,
          opacity: 100
        }
      })
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    })
  }

  useEffect(() => {
    setLoading.open();
    scrollTo({ y: 0 })
    let options = '';

    if (selectedRaces.length > 0) {
      selectedRaces.forEach(r => {
        options += `&filters[race][$contains]=${r}`
      })
    }

    if (selectedClasses.length > 0) {
      selectedClasses.forEach(c => {
        options += `&filters[classes][$contains]=${c}`
      })
    }

    if (selectedSexes.length > 0) {
      selectedSexes.forEach(s => {
        options += `&filters[sex][$contains]=${s}`
      })
    }

    fetchDataFromURI(`${API_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`).then(data => {
      let minis = data.miniatures.map(cr => {
        return {
          ...cr,
          opacity: 100
        }
      })
      setMiniatures(minis);
    })
  }, [currentPage])

  useEffect(() => {
    setLoading.close();
  }, [miniatures])

  function addToACart (itemCode) {
    const itemObject = {
      code: itemCode,
      type: mode,
      amount: 1
    }

    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === mode) {
        index = i
      }
    }

    if (index > -1) {
      if (mode === 'stl') { return; }
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

  function getAmountInCart (itemCode) {
    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === mode) {
        index = i;
        break;
      }
    }
    if (index > -1) { return shoppingCart[index].amount; } 
    else { return 0; }
  }

  function removeItem (itemCode) {
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].code === itemCode && shoppingCart[i].type === mode) {
        if (shoppingCart[i].amount > 1) {
          console.log('amount > 1')
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

  function nullFilters() {
    setLoading.open();
    setSelectedClasses([]);
    setSelectedRaces([]);
    setSelectedSexes([]);
    setCurrentPage(1);
    scrollTo({ y: 0 })
    fetchDataFromURI(`${API_URL}&pagination[pageSize]=${pageSize}`).then(data => {
      let minis = data.miniatures.map(cr => {
        return {
          ...cr,
          opacity: 100
        }
      })
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
    })
  }

  const filters = {
    races: {
      getter: selectedRaces,
      setter: setSelectedRaces,
      data: races,
      placeholder: "Показываются все расы",
      nothingFound: "Таких рас нет :(",
      label: "Фильтр по расам"
    },
    classes: {
      getter: selectedClasses,
      setter: setSelectedClasses,
      data: classes,
      placeholder: "Показываются все классы",
      nothingFound: "Не знаем таких классов :(",
      label: "Фильтр по классам"
    },
    sex: {
      getter: selectedSexes,
      setter: setSelectedSexes,
    }
  }

  return (
    <>
      <Head />
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={<CustomNavbar opened={opened} setLoading={setLoading} setOpened={setOpened} getSelectedHeroes={getSelectedHeroes} heroFilters={true} filters={filters} cartSize={shoppingCart.reduce((partial, item) => partial + item.amount, 0)} currentRoute='/index' loading={loading} nullFilters={nullFilters} mode={mode} setMode={setMode}/>}
        header={<CustomHeader opened={opened} setOpened={setOpened} />}
      >
        <main>
          <Title order={1} style={{marginBottom: '15px'}}>Найдено <Skeleton visible={loading} style={{display: 'inline'}}>{loading ? 22 : totalFound}</Skeleton> миниатюрок</Title>
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
                  miniatures.map(creature => <CreatureCard
                     item={creature}
                     key={`card-${creature.id}`}
                     amountInCart={getAmountInCart(creature.attributes.code)}
                     addToACart={addToACart}
                     removeItem={removeItem}
                     mode={mode}
                     />)
                  :
                  <Group>
                    Нет фигурок по таким фильтрам!
                    <Image
                      src="dude.svg"
                      alt="Shrug dude"
                      style={{filter: "invert(95%) sepia(1%) saturate(0%) hue-rotate(139deg) brightness(82%) contrast(90%)"}}
                    />
                  </Group>
            }
          </SimpleGrid>
          <div style={{ marginTop: '25px' }}>
            <Center>
              <Pagination total={totalPages} siblings={1} value={currentPage} onChange={setCurrentPage} disabled={loading} />
            </Center>
          </div>
        </main>
      </AppShell>
    </>
  )
}