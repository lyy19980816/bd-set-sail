import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useModel } from '@umijs/max';

import styles from '../index.less';
import { noteContent } from '../type';

const CenterNoteInfo: React.FC = () => {
  const { storageNoteList, checkNoteKey, noteContentList, setEditNoteKey } =
    useModel('global');
  const [noteContentItem, setNoteContentItem] = useState<noteContent[]>([]);
  const searchNote = (val: string) => {
    const newSearchList = noteContentList.filter((item: noteContent) => {
      return item.title.indexOf(val) !== -1;
    });
    setNoteContentItem([...newSearchList]);
  };
  useEffect(() => {
    setNoteContentItem([...noteContentList]);
  }, [storageNoteList]);
  useEffect(() => {
    if (!checkNoteKey) return;
    const chooseNote = noteContentList.filter((item: noteContent) => {
      return item.key === checkNoteKey;
    });
    setNoteContentItem(chooseNote);
  }, [checkNoteKey]);
  const editNoteFn = (key: string) => {
    setEditNoteKey(key);
  };
  return (
    <div className={styles.centerNoteInfo}>
      <Input
        style={{ height: '38px' }}
        type={'text'}
        onChange={(e) => {
          searchNote(e.target.value);
        }}
        placeholder="搜索。。。"
      ></Input>
      <div className={styles.searchList}>
        {noteContentItem.map((item) => {
          return (
            <div
              className={styles.noteItem}
              key={item.key}
              onClick={() => {
                editNoteFn(item.key);
              }}
            >
              <span title={item.title + '--' + item.key}>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CenterNoteInfo;
