import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll, usePagination } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import { CreatureCard } from '@/components/CreatureCard'
import { SimpleGrid, Image, Group, AppShell, Skeleton, Title, Pagination, Center, Button } from '@mantine/core'
import CustomAppShell from '@/components/CustomAppShell';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
const FILTERS = require("../../data/filters.json")

const API_URL = 'https://api.stl-emporium.ru/api'
const STL_ENDPOINT = 'creatures';
const DEFAULT_SORT = 'sort=createdAt:desc';
const FILL_WITH_DATA = 'populate=*'
const NOT_ONLY_PHYSICAL = "filters[onlyPhysical][$ne]=true"
const IS_NOT_A_MONSTER = "filters[races][$contains]=not-monster"
const SELECTED_FIELDS = [
  "races",
  'sex',
  'classes',
  'code',
  'priceSTL',
  'pricePhysical',
  'onlyPhysical'
]
const FIELDS = (selectedFields) => {
  let string = '';
  selectedFields.forEach((field, id) => {
    if (id > 0) string += `&`;
    string += `fields[${id}]=${field}`
  })
  return string;
}
const REQUEST_URL = `${API_URL}/${STL_ENDPOINT}?${FIELDS(SELECTED_FIELDS)}&${FILL_WITH_DATA}&${DEFAULT_SORT}&${IS_NOT_A_MONSTER}`


async function fetchDataFromURI(URI) {
  const rawData = await fetch(URI)
  const data = await rawData.json();

  return {
    miniatures: data?.data,
    meta: data?.meta
  };
}

export default function Home() {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })
  const [shoppingCart, setShoppingCart] = useLocalStorage({ key: 'shopping-cart', defaultValue: [] })

  const [scroll, scrollTo] = useWindowScroll();

  const races = FILTERS.races;
  const classes = FILTERS.classes;

  const params = useSearchParams();
  const router = useRouter();

  const [atLeast1Visible, handleAtLeast1Visible] = useDisclosure(true);
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const [miniatures, setMiniatures] = useState();
  const [loading, setLoading] = useDisclosure(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let requestString;
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=20`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=20`
    fetchDataFromURI(requestString).then(data => {
      const minis = data?.miniatures;
      setMiniatures(minis);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
    })
  }, [])

  useEffect(() => {
    if (params.has('type')) {
      if (params.get('type').length > 0) {
        setChosenMode(params.get('type'))
        router.push('/');
      }
    }
  })

  useEffect(() => {
    getSelectedHeroes();
  }, [chosenMode])

  const getSelectedHeroes = async () => {
    setLoading.open();
    setCurrentPage(1);
    scrollTo({ y: 0 })
    let options = '';

    if (selectedRaces.length > 0) {
      selectedRaces.forEach(r => {
        options += `&filters[races][$contains]=${r}`
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

    let requestString;
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    fetchDataFromURI(requestString).then(data => {
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
        options += `&filters[races][$contains]=${r}`
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

    let requestString
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${options}`
    fetchDataFromURI(requestString).then(data => {
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

  function nullFilters() {
    setLoading.open();
    setSelectedClasses([]);
    setSelectedRaces([]);
    setSelectedSexes([]);
    setCurrentPage(1);
    scrollTo({ y: 0 })

    let requestString;
    if (chosenMode === 'physical') requestString = `${REQUEST_URL}&pagination[pageSize]=${pageSize}`
    else requestString = `${REQUEST_URL}&${NOT_ONLY_PHYSICAL}&pagination[pageSize]=${pageSize}`
    fetchDataFromURI(requestString).then(data => {
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

  const getWord = (amount) => {
    let lastDigit = amount % 10;
    if (lastDigit == 1) return 'миниатюрка'
    if (lastDigit > 1 && lastDigit <= 4) return 'миниатюрки'
    if (lastDigit == 0 || lastDigit > 4) return 'миниатюрок'

    return ('миниатюр')
  }

  return (
    <>
      <Head />
      <CustomAppShell
        setLoading={setLoading}
        getSelectedHeroes={getSelectedHeroes}
        heroFilters
        filters={filters}
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
      >
        <main>
          <Title order={1} style={{ marginBottom: '15px' }}>Найдено <Skeleton visible={loading} style={{ display: 'inline' }}>{loading ? 22 : totalFound}</Skeleton> {getWord(totalFound)}</Title>
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
                    chosenMode={chosenMode}
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
          <div style={{ marginTop: '25px' }}>
            <Center>
              <Pagination total={totalPages} siblings={1} value={currentPage} onChange={setCurrentPage} disabled={loading} />
            </Center>
          </div>
        </main>
      </CustomAppShell>
    </>
  )
}