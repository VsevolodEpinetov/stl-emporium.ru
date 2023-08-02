import Head from 'next/head'
import { useLocalStorage } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import STLGallery from '@/components/STLGallery';
import { fetchDataFromURINew, generateOptionsObject } from '@/utils/api';
import useFilters from '@/hooks/useFilters';

const filters = {
  whFactions: {
    ui: {
      placeholder: "Показываются все фракции",
      nothingFound: "Таких фракций нет :(",
      label: "Фильтр по фракциям"
    }
  },
  whTypes: {
    ui: {
      placeholder: "Показываются все типы",
      nothingFound: "Не знаем таких типов :(",
      label: "Фильтр по классам"
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
        router.push('/');
      }
    }
  }, [])

  useEffect(() => {
    getSelectedHeroes();
  }, [chosenMode])

  const getSelectedHeroes = async () => {
    setLoading(true);
    setCurrentPage(1);

    try {
      const data = await fetchDataFromURINew('creatures', { page: currentPage, ...selectedFilters, wh: true });
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
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
    setLoading(true)

    fetchDataFromURINew('creatures', { page: currentPage, ...selectedFilters, wh: true }).then(data => {
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
    setCurrentPage(1);

    try {
      const data = await fetchDataFromURINew('creatures', { wh: true });
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
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
        getSelectedHeroes={getSelectedHeroes}
        isHeroFilters
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
          type='wh'
        />
      </CustomAppShell>
    </>
  )
}