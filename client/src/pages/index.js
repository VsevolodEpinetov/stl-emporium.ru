import Head from 'next/head'
import { useDisclosure, useLocalStorage, useWindowScroll, usePagination } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import { CreatureCard } from '@/components/CreatureCard'
import { CustomHeader } from '@/components/CustomHeader'
import { CustomNavbar } from '@/components/CustomNavbar'
import { SimpleGrid, Image, Group, AppShell, Skeleton, Title, Pagination, Center } from '@mantine/core'
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
  const [chosenCreatures, setChosenCreatures] = useLocalStorage({ key: 'chosen-creatures', defaultValue: [] });
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

  useEffect(async () => {
    fetchDataFromURI(`${API_URL}&pagination[pageSize]=20`).then(data => {
      console.log(data)
      let minis = data?.miniatures.map(cr => {
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

  function addACreatureToACart(creature) {
    // While I sell only STL files
    let found = false;
    for (let i = 0; i < chosenCreatures.length; i++) {
      if (chosenCreatures[i].id === creature.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      setChosenCreatures([
        ...chosenCreatures,
        creature
      ])
    }
  }

  function removeACreatureFromACart(creature) {
    let index = -1;
    for (let i = 0; i < chosenCreatures.length; i++) {
      if (creature.id == chosenCreatures[i].id) {
        index = i;
        break;
      }
    }
    setChosenCreatures([...chosenCreatures.slice(0, index), ...chosenCreatures.slice(index + 1)])
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

  function getAllInstancesOfCreatureInACart(creature) {
    let counter = 0;

    for (let i = 0; i < chosenCreatures.length; i++) {
      if (creature.id === chosenCreatures[i].id) counter++;
    }

    return counter;
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
        navbar={<CustomNavbar opened={opened} setLoading={setLoading} setOpened={setOpened} getSelectedHeroes={getSelectedHeroes} heroFilters={true} filters={filters} cartSize={chosenCreatures.length} currentRoute='/index' loading={loading} nullFilters={nullFilters} />}
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
                  miniatures.map(creature => <CreatureCard creatureData={creature} key={`card-${creature.id}`} isInCart={getAllInstancesOfCreatureInACart(creature)} addACreatureToACart={addACreatureToACart} removeACreatureFromACart={removeACreatureFromACart} opacity={creature.opacity} />)
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