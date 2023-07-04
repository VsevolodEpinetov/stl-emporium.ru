import { Center, Pagination, Skeleton, Title } from '@mantine/core';
import React from 'react';
import STLList from './STLList';
import { getWord } from '@/utils/helpers';

const STLGallery = ( {
  loading,
  totalFound,
  addToACart,
  totalPages,
  currentPage,
  setCurrentPage,
  miniatures,
  filters,
  type,
  gotRacesAndClasses
} ) => {

  return (
    <div>
      <Title order={1} style={{ marginBottom: '15px' }}>
        Найдено <Skeleton visible={loading} style={{ display: 'inline' }}>{loading ? 22 : totalFound}</Skeleton> {getWord(totalFound, type)}
      </Title>
      <STLList 
        loading={loading}
        miniatures={miniatures}
        addToACart={addToACart}
        filters={filters}
        type={type}
        gotRacesAndClasses={gotRacesAndClasses}
      />
      <div style={{ marginTop: '25px' }}>
        <Center>
          <Pagination total={totalPages} siblings={1} value={currentPage} onChange={setCurrentPage} disabled={loading} />
        </Center>
      </div>
    </div>
  );
};

export default STLGallery;