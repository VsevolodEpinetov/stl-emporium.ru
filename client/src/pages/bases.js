import Head from 'next/head'
import { useLocalStorage } from '@mantine/hooks';
import { useState, useEffect } from 'react'
import CustomAppShell from '@/components/CustomAppShell';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import STLGallery from '@/components/STLGallery';
import { fetchDataFromURINew, generateOptionsObject } from '@/utils/api';
import useFilters from '@/hooks/useFilters';

const filters = {
  tags: {
    ui: {
      placeholder: "Показываются все теги",
      nothingFound: "Таких тегов нет :(",
      label: "Фильтр по тегам"
    }
  },
  size: {
    ui: {
      placeholder: "Показываются все размеры",
      nothingFound: "Таких размеров нет :(",
      label: "Фильтр по размеру"
    }
  },
  form: {
    ui: {
      placeholder: "Показываются все формы",
      nothingFound: "Таких форм нет :(",
      label: "Фильтр по форме"
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
        router.push('/bases');
      }
    }
  })

  useEffect(() => {
    getSelectedHeroes();
  }, [chosenMode])

  const getSelectedHeroes = async () => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    try {
      const data = await fetchDataFromURINew('terrains', { page: currentPage, ...selectedFilters });
      setMiniatures(data.data);
      setTotalFound(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      //console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true);

    fetchDataFromURINew('terrains', { page: currentPage, ...selectedFilters }).then(data => {
      setMiniatures(data.data);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setLoading(false);
    })
  }, [currentPage])

  async function nullFilters() {
    setLoading.open();

    try {
      const data = await fetchDataFromURINew('terrains', {});
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
        basesFilters
        newFilters={allFilters}
        loading={loading}
        nullFilters={nullFilters}
        chosenMode={chosenMode}
        setChosenMode={setChosenMode}
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
          type='terrain'
        />
      </CustomAppShell>
    </>
  )
}