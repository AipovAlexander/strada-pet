import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { articlesAPI } from '../services/articles-api';
import AppPagination from '../components/pagination';
import DetailedCardList from '../components/detailed-card-list';
import TagList from '../components/tag-list';
import { CURRENT_PAGE, CURRENT_PAGE_SIZE } from '../shared/constants';
import { useAppDispatch, useAppSelector } from '../store/store-hooks';
import { setCurrentPath } from '../store/reducers/breadcrumbs/breadcrumb-slice';
import updateMetaData from '../utils/create-meta';
import { useSearchParams } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = useState<number>(CURRENT_PAGE_SIZE);

  const tagName = useAppSelector((state) => state.tagName.tagName);
  const page = searchParams.get('page') ?? String(CURRENT_PAGE);

  useEffect(() => {
    dispatch(setCurrentPath([{}]));
    setSearchParams({ page, pageSize: String(pageSize), tag: tagName });
  }, [dispatch, pageSize, tagName]); // eslint-disable-line

  updateMetaData({ title: 'Home | News App', description: 'Main page' });

  const { data, isLoading, error } = articlesAPI.useGetAllArticlesQuery({
    limit: Number(pageSize),
    offset: (Number(page) - 1) * Number(pageSize),
    tag: tagName,
  });

  const onChangePage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      pageSize: String(pageSize),
      tag: tagName,
    });
  };

  return (
    <Layout
      style={{
        width: '80%',
        margin: '0 auto',
        padding: '50px 0',
      }}
    >
      <TagList />
      <DetailedCardList data={data} isLoading={isLoading} error={error} />
      <AppPagination
        page={Number(page)}
        pageSize={Number(pageSize)}
        articlesCount={data?.articlesCount}
        onChangeCurrentPage={onChangePage}
        onChangeCurrentPageSize={setPageSize}
      />
    </Layout>
  );
};

export default MainPage;
