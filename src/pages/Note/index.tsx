import React, { useEffect } from 'react';
import { useModel } from '@umijs/max';

import LeftNoteContent from './components/LeftNoteContent';
import RightNoteContent from './components/RightNoteContent';
import CenterNoteInfo from './components/CenterNoteInfo';
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
    <>
      <div className={styles.pageSet}>
        <LeftNoteContent></LeftNoteContent>
        <CenterNoteInfo></CenterNoteInfo>
        <RightNoteContent></RightNoteContent>
      </div>
    </>
  );
};
export default NotePage;
