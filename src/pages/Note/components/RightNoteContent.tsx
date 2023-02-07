import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useModel } from '@umijs/max';

import styles from '../index.less';
import { noteContent } from '../type';
const RightNoteContent: React.FC = () => {
  // 公共变量
  const {
    editNoteKey,
    storageNoteList,
    noteContentList,
    setEditNoteKey,
    setCheckNoteKey,
    setStorageNoteList,
    setNoteContentList,
  } = useModel('global');

  const [value, setValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  // 根据需要编辑的笔记key,set笔记内容
  useEffect(() => {
    if (!editNoteKey) return setValue('');
    const chooseNote = noteContentList.filter((item: noteContent) => {
      return item.key === editNoteKey;
    });
    setValue(chooseNote[0].desc);
    setName(chooseNote[0].title);
  }, [editNoteKey]);
  // 保存编辑的内容
  const saveNoteContent = () => {
    if (!editNoteKey) return;
    const saveNote = noteContentList.map((item: noteContent) => {
      if (item.key === editNoteKey) {
        item.desc = value;
      }
      return item;
    });
    setNoteContentList(saveNote);
  };
  // 删除笔记，同时清空选择
  const delNoteContent = () => {
    if (!editNoteKey) return;
    const delAfterNoteContent = noteContentList.filter((item: noteContent) => {
      return item.key !== editNoteKey;
    });
    setNoteContentList(delAfterNoteContent);
    const delAfterNote = storageNoteList.map((item) => {
      const newItem = item.children?.map((menu) => {
        const newMenu = menu.children?.filter((note) => {
          return note.key !== editNoteKey;
        });
        return { ...menu, children: newMenu };
      });

      return { ...item, children: newItem };
    });
    setStorageNoteList(delAfterNote);
    setEditNoteKey('');
    setCheckNoteKey('');
  };
  const saveResetName = () => {
    const resetNameNote = noteContentList.filter((item: noteContent) => {
      if (item.key === editNoteKey) {
        item.title = name;
      }
      return item;
    });
    setNoteContentList(resetNameNote);
    const saveCatalogList = storageNoteList.map((item) => {
      const newItem = item.children?.map((menu) => {
        const newMenu = menu.children?.filter((note) => {
          if (note.key === editNoteKey) {
            note.title = name;
          }
          return note;
        });
        return { ...menu, children: newMenu };
      });
      return { ...item, children: newItem };
    });
    setStorageNoteList(saveCatalogList);
  };
  return (
    <div className={styles.rightNoteContent}>
      <Input
        value={name}
        placeholder="笔记名称。。。按enter键确认"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onPressEnter={() => {
          saveResetName();
        }}
      />
      <Input.TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="编辑笔记。。。"
        style={{
          width: '100%',
          height: '500px',
        }}
      />
      <div className={styles.btnGroup}>
        <Button className={styles.delBtn} onClick={() => delNoteContent()}>
          删除笔记
        </Button>
        <Button className={styles.addBtn} onClick={() => saveNoteContent()}>
          保存笔记
        </Button>
      </div>
    </div>
  );
};
export default RightNoteContent;
