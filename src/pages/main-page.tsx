import { Layout } from 'antd';
import { useState } from 'react';
import { articlesAPI } from '../services/articles-api';
import AppPagination from '../components/pagination';
import DetailedCardList from '../components/detailed-card-list';
import TagList from '../components/tag-list';
import { CURRENT_PAGE, CURRENT_PAGE_SIZE } from '../shared/constants';

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);
  const [currentPageSize, setCurrentPageSize] =
    useState<number>(CURRENT_PAGE_SIZE);

  const { data, isLoading } = articlesAPI.useGetAllArticlesQuery({
    limit: currentPageSize,
    offset: (currentPage - 1) * currentPageSize,
  });

  return (
    <Layout
      style={{
        width: '80%',
        margin: '0 auto',
        padding: '50px 0',
      }}
    >
      <TagList />
      <DetailedCardList data={data} isLoading={isLoading} />
      <AppPagination
        page={currentPage}
        pageSize={currentPageSize}
        articlesCount={data?.articlesCount}
        onChangeCurrentPage={setCurrentPage}
        onChangeCurrentPageSize={setCurrentPageSize}
      />
    </Layout>
  );
};

export default MainPage;
