// 全局共享数据示例 useModel
import { useState } from 'react';
import { DEFAULT_NAME } from '@/constants';
import { noteContent, noteType } from '@/pages/Note/type';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [storageNoteList, setStorageNoteList] = useState<noteType[]>([]);
  const [noteContentList, setNoteContentList] = useState<noteContent[]>([]);
  const [checkNoteKey, setCheckNoteKey] = useState<string>('');
  const [editNoteKey, setEditNoteKey] = useState<string>('');
  return {
    name,
    setName,
    storageNoteList,
    setStorageNoteList: (val: noteType[]) => {
      setStorageNoteList(val);
      window.localStorage.setItem('noteList', JSON.stringify(val));
    },
    checkNoteKey,
    setCheckNoteKey,
    editNoteKey,
    setEditNoteKey,
    noteContentList,
    setNoteContentList: (val: noteContent[]) => {
      setNoteContentList(val);
      window.localStorage.setItem('noteContentList', JSON.stringify(val));
    },
  };
};

export default useUser;
