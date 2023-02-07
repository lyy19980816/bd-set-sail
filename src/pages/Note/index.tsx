import React, { useEffect } from '@alipay/bigfish/react';
import { useModel } from '@alipay/bigfish';
import { PageContainer } from '@alipay/tech-ui';
import LeftNoteCentent from './components/LeftNoteCentent';
import RightNoteCentent from './components/RightNoteCentent';
import ConterNoteInfo from './components/ConterNoteInfo';
import styles from './index.less';

const NotePage: React.FC = () => {
  const { setStorageNoteList, setNoteContentList } = useModel('global');
  useEffect(() => {
    // 缓存所有菜单目录
    setStorageNoteList(
      JSON.parse(window.localStorage.getItem('noteList') || '[]'),
    );
    // 缓存所有笔记列表
    setNoteContentList(
      JSON.parse(window.localStorage.getItem('noteContentList') || '[]'),
    );
  }, []);
  return (
    <PageContainer>
      <div className={styles.pageSet}>
        <LeftNoteCentent></LeftNoteCentent>
        <ConterNoteInfo></ConterNoteInfo>
        <RightNoteCentent></RightNoteCentent>
      </div>
    </PageContainer>
  );
};
export default NotePage;
