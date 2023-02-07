// import React, {
//   memo,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   useContext,
// } from 'react';
// import { Button, Form, Input } from '@alipay/bigfish/antd';
// import { PageContainer, useDebounceFn } from '@alipay/tech-ui';
// import styles from './index.less';
// import { useRequest } from '@alipay/bigfish';

// // type Props = {
// //   count: number;
// //   changeCount: () => void;
// // };
// // const B: React.FC<Props> = (props) => {
// //   const { count, changeCount } = props;
// //   console.log('优化');
// //   return <Button onClick={changeCount}>{count}</Button>;
// // };
// // const C = memo<Props>(B);
// // export default () => {
// //   const [name, setName] = useState<string>('白店');
// //   const [count, setCount] = useState<number>(0);
// //   const mCount = useMemo(() => count, [count]);
// //   const cChangeCount = useCallback(() => {
// //     setCount(count + 1);
// //   }, [count]);
// //   return (
// //     <PageContainer>
// //       {name}
// //       <Form>
// //         <Form.Item>
// //           <Input
// //             type="text"
// //             onChange={(e) => {
// //               setName(e.target.value);
// //             }}
// //           />
// //         </Form.Item>
// //         <Form.Item
// //           name="age"
// //           rules={[
// //             {
// //               required: true,
// //               message: '输入内容试试！',
// //             },
// //             ({ getFieldValue }) => {
// //               console.log('getFieldValue', getFieldValue('age'));
// //               return {
// //                 validator(_, value) {
// //                   return Promise.reject(new Error('输入内容试试！'));
// //                 },
// //               };
// //             },
// //           ]}
// //         >
// //           <Input type="text" />
// //         </Form.Item>
// //       </Form>
// //       <C count={mCount} changeCount={cChangeCount}></C>
// //     </PageContainer>
// //   );
// // };

// type noteType = {
//   id: string;
//   title: string;
//   children: noteType[];
// };
// type noteCentent = {
//   id: string;
//   title: string;
//   desc: string;
//   children: noteType[];
// };
// let storageNoteList: noteType[] = [];
// const ChooseNoteId = React.createContext({});
// const RightNoteCentent: React.FC = () => {
//   const [noteListContent, setNoteListContent] = useState<noteCentent[]>([]);
//   const [noteCentent, setNoteContent] = useState<string>('');
//   let { chooseNoteId, setChooseNoteId } = useContext(ChooseNoteId);

//   useEffect(() => {
//     setNoteListContent(
//       JSON.parse(window.localStorage.getItem('noteListContent') || '[]'),
//     );
//   }, []);
//   useEffect(() => {
//     let chooseNote: noteCentent[] = noteListContent.filter((item) => {
//       return item.id === chooseNoteId;
//     });
//     console.log(chooseNote, 'chooseNote');
//     setNoteContent(chooseNote[0]?.desc);
//   }, [chooseNoteId]);
//   console.log('noteCentent', noteCentent);
//   return (
//     <div className={styles.rightNoteCentent}>
//       {}
//       <Input.TextArea value={noteCentent}></Input.TextArea>
//     </div>
//   );
// };
// const ConterNoteInfo: React.FC<{
//   noteList: noteType[];
// }> = (Props) => {
//   const { noteList } = Props;
//   const [searchList, setSearchList] = useState<noteType[]>([]);
//   const [noteListContent, setNoteListContent] = useState<noteCentent[]>([]);
//   const { run: searchNote } = useDebounceFn(async (val: string) => {
//     const newSearchList = noteList.filter((item) => {
//       return item.title.indexOf(val) !== -1;
//     });

//     setSearchList([...newSearchList]);
//   }, 500);
//   let { chooseNoteId, setChooseNoteId } = useContext(ChooseNoteId);
//   // let [chooseNoteId, setChooseNoteId] = useState(ChooseNoteId);
//   useEffect(() => {
//     window.localStorage.setItem(
//       'noteListContent',
//       JSON.stringify([
//         {
//           id: 'note1664529200323',
//           title: '白店的第一篇',
//           desc: '开始使用react',
//         },
//       ]),
//     );
//     setNoteListContent(
//       JSON.parse(window.localStorage.getItem('noteListContent') || '[]'),
//     );
//   }, []);
//   useEffect(() => {
//     let chooseNote: noteCentent[] = noteListContent.filter((item) => {
//       return item.id === chooseNoteId;
//     });
//     setSearchList(chooseNote);
//   }, [chooseNoteId]);
//   const editNote = (id: string) => {
//     setChooseNoteId(id);
//   };
//   return (
//     <div className={styles.conterNoteInfo}>
//       <Input
//         type={'text'}
//         onChange={(e) => {
//           searchNote(e.target.value);
//         }}
//         placeholder="搜索。。。"
//       ></Input>
//       {/* 搜索返回列表 */}
//       <div className={styles.searchList}>
//         {searchList.map((item) => (
//           <div
//             className={styles.noteItem}
//             key={item.id}
//             onClick={() => {
//               editNote(item.id);
//             }}
//           >
//             <span title={item.title + '--' + item.id}>{item.title}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Menu: React.FC<{ showMenu: boolean; item: noteType[] }> = (Props) => {
//   const { showMenu, item } = Props;
//   const [showNote, setShowNote] = useState(false);
//   let { chooseNoteId, setChooseNoteId } = useContext(ChooseNoteId);
//   return (
//     <div className={styles.menuItem}>
//       <div style={{ display: showMenu ? 'block' : 'none' }} key={item.id}>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'flex-start',
//             alignItems: 'center',
//             height: '38px',
//             width: '180px',
//           }}
//           onClick={() => {
//             !showNote ? setShowNote(true) : setShowNote(false);
//           }}
//         >
//           <span style={{ display: item.children.length ? 'block' : 'none' }}>
//             {'>'}
//           </span>
//           <span
//             style={{ marginLeft: item.children.length ? '0' : '16px' }}
//             onClick={() => {
//               !item.children.length && setChooseNoteId(item.id);
//             }}
//           >
//             {item.title}
//           </span>
//         </div>
//         {item.children.length
//           ? item.children.map((nItem) => {
//               return (
//                 <Menu showMenu={showNote} key={nItem.id} item={nItem}></Menu>
//               );
//             })
//           : null}
//       </div>
//       {/* 循环菜单 */}
//     </div>
//   );
// };

// const Note: React.FC<{
//   noteItem: noteType[];
//   noteList: noteType[];
//   noteSetNoteList: (list: noteType[]) => void;
// }> = (Props) => {
//   const { noteItem, noteList, noteSetNoteList } = Props;
//   let [showMenu, setShowMenu] = useState(false);
//   const delNote = (id: string) => {
//     event?.stopPropagation();
//     if (noteList.length === 1) {
//       noteSetNoteList([]);
//     }
//     const newNoteList = noteList.filter((item) => {
//       return item.id !== id;
//     });
//     noteSetNoteList([...newNoteList]);
//   };
//   return (
//     <div className={styles.noteItem} key={noteItem.id}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'flex-start',
//           alignItems: 'center',
//           height: '38px',
//           width: '200px',
//         }}
//         onClick={() => {
//           !showMenu ? setShowMenu(true) : setShowMenu(false);
//         }}
//       >
//         <span>{'>'}</span>
//         <span
//           className={styles.noteName}
//           title={noteItem.title + '--' + noteItem.id}
//         >
//           {noteItem.title}
//         </span>
//         <div className={styles.delNote} onClick={() => delNote(noteItem.id)}>
//           删除
//         </div>
//         <div
//           className={styles.addNote}
//           onClick={() => addNote(noteItem.id)}
//         ></div>
//       </div>
//       {noteItem.children &&
//         noteItem.children.map((lItem) => (
//           <Menu showMenu={showMenu} key={lItem.id} item={lItem}></Menu>
//         ))}
//     </div>
//   );
// };

// const notePage: React.FC = () => {
//   const [noteList, setNoteList] = useState<noteType[]>([]);
//   const [chooseNoteId, setChooseNoteId] = useState('');
//   const giveNoteList = useMemo((): noteType[] => {
//     return noteList;
//   }, [noteList]);
//   useEffect(() => {
//     let getStorageNoteList: noteType[] = JSON.parse(
//       window.localStorage.getItem('noteList') || '[]',
//     );
//     getStorageNoteList.length && setNoteList([...getStorageNoteList]);
//   }, []);
//   useEffect(() => {
//     noteList.length &&
//       window.localStorage.setItem('noteList', JSON.stringify(noteList));
//   }, [storageNoteList]);
//   const addNote = () => {
//     setNoteList([
//       ...noteList,
//       {
//         id: String(Date.now()),
//         title: '新建笔记',
//         children: [
//           {
//             id: 'menu' + String(Date.now()),
//             title: '新建目录',
//             children: [
//               {
//                 id: 'note' + String(Date.now()),
//                 title: '笔记',
//                 children: [],
//               },
//             ],
//           },
//         ],
//       },
//     ]);
//     storageNoteList = noteList;
//   };
//   const noteSetNoteList = (newNoteList: noteType[]) => {
//     setNoteList([...newNoteList]);
//     // debugger;
//     if (!newNoteList.length) {
//       window.localStorage.setItem('noteList', JSON.stringify([]));
//     }
//     storageNoteList = newNoteList;
//   };
//   return (
//     <PageContainer>
//       <ChooseNoteId.Provider value={{ chooseNoteId, setChooseNoteId }}>
//         <div className={styles.pageSet}>
//           <div className={styles.leftNoteList}>
//             <Button className={styles.addNote} onClick={addNote}>
//               新建笔记
//             </Button>
//             {/* 循环菜单 */}
//             {noteList.map((item) => {
//               return (
//                 <Note
//                   key={item.id}
//                   noteItem={item}
//                   noteList={giveNoteList}
//                   noteSetNoteList={noteSetNoteList}
//                 ></Note>
//               );
//             })}
//           </div>
//           <ConterNoteInfo noteList={giveNoteList}></ConterNoteInfo>
//           <RightNoteCentent></RightNoteCentent>
//         </div>
//       </ChooseNoteId.Provider>
//     </PageContainer>
//   );
// };
// export default notePage;
