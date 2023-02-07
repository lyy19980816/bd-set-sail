import React, { useEffect, useState } from '@alipay/bigfish/react';
import { useModel } from '@alipay/bigfish';
import { Input } from '@alipay/bigfish/antd';
import styles from '../index.less';
import { noteCentent } from '../type';

const ConterNoteInfo: React.FC = () => {
  const { storageNoteList, checkNoteKey, noteContentList, setEditNoteKey } =
    useModel('global');
  const [noteCententItem, setNoteContentItem] = useState<noteCentent[]>([]);
  const searchNote = (val: string) => {
    const newSearchList = noteContentList.filter((item: noteCentent) => {
      return item.title.indexOf(val) !== -1;
    });
    setNoteContentItem([...newSearchList]);
  };
  useEffect(() => {
    setNoteContentItem([...noteContentList]);
  }, [storageNoteList]);
  useEffect(() => {
    if (!checkNoteKey) return;
    const chooseNote = noteContentList.filter((item: noteCentent) => {
      return item.key === checkNoteKey;
    });
    setNoteContentItem(chooseNote);
  }, [checkNoteKey]);
  const editNoteFn = (key: string) => {
    setEditNoteKey(key);
  };
  return (
    <div className={styles.conterNoteInfo}>
      <Input
        style={{ height: '38px' }}
        type={'text'}
        onChange={(e) => {
          searchNote(e.target.value);
        }}
        placeholder="搜索。。。"
      ></Input>
      <div className={styles.searchList}>
        {noteCententItem.map((item) => {
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
export default ConterNoteInfo;
