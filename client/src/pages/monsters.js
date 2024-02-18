import Head from 'next/head'
import { useLocalStorage } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import STLGallery from '@/components/STLGallery';
import { fetchDataFromURINew, generateOptionsObject } from '@/utils/api';
import useFilters from '@/hooks/useFilters';

const filters = {
  races: {
    ui: {
      placeholder: "Показываются все расы",
      nothingFound: "Таких рас нет :(",
      label: "Фильтр по расам"
    }
  },
  monsterEnvironments: {
    ui: {
      placeholder: "Показываются все районы обитания",
      nothingFound: "Таких районов нет :(",
      label: "Фильтр по району обитания"
    }
  },
  monsterSizes: {
    ui: {
      placeholder: "Показываются все размеры",
      nothingFound: "Таких размеров нет :(",
      label: "Фильтр по размеру"
    }
  },
  monsterIntelligences: {
    ui: {
      placeholder: "Показываются все разумы",
      nothingFound: "Таких разумов нет :(",
      label: "Фильтр по разумности"
    }
  },
  monsterTypes: {
    ui: {
      placeholder: "Показываются все типы монстров",
      nothingFound: "Не знаем таких типов :(",
      label: "Фильтр по типам"
    }
  },
  monsterKinds: {
    ui: {
      placeholder: "Показываются все виды",
      nothingFound: "Таких видов нет :(",
      label: "Фильтр по виду"
    }
  },
  weapons: {
    ui: {
      placeholder: "Показываются всё оружие",
      nothingFound: "Такого оружия не знаем :(",
      label: "Фильтр по оружию"
    }
  },
  sex: {
    ui: {
      placeholder: "-",
      nothingFound: "-",
      label: "Предполагаемый пол"
    }
  }
}

export default function Home() {
  const [chosenMode, setChosenMode] = useLocalStorage({ key: 'user-setting-mode', defaultValue: 'stl' })

  const params = useSearchParams();
  const router = useRouter();

  const [miniatures, setMiniatures] = useState();
  const [loading, setLoading] = useState(true);
  const [totalFound, setTotalFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filtersLoading, allFilters, selectedFilters] = useFilters(filters)

  useEffect(() => {
    if (params.has('type')) {
      if (params.get('type').length > 0) {
        setChosenMode(params.get('type'))
        router.push('/monsters');
      }
    }
  })

  useEffect(() => {
    getSelectedHeroes();
  }, [chosenMode])

  const getSelectedHeroes = async () => {
    setLoading(true);

    try {
      const data = await fetchDataFromURINew('monsters', { page: currentPage, ...selectedFilters });
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true);

    fetchDataFromURINew('monsters', { page: currentPage, ...selectedFilters }).then(data => {
      setMiniatures(data.data);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setLoading(false);
    })
  }, [currentPage])

  async function nullFilters() {
    setLoading(true);

    try {
      const data = await fetchDataFromURINew('monsters', { });
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setLoading(false);
    } catch (error) {
      //console.log(error)
    }
  }

  return (
    <>
      <Head />
      <CustomAppShell
        setLoading={setLoading}
        getSelectedHeroes={getSelectedHeroes}
        isMonsterFilters
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
        newFilters={allFilters}
        filtersLoading={filtersLoading}
      >
        <STLGallery
          loading={loading}
          totalFound={totalFound}
          chosenMode={chosenMode}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          miniatures={miniatures}
          newFilters={allFilters}
          filtersLoading={filtersLoading}
          type='monster'
        />
      </CustomAppShell>
    </>
  )
}