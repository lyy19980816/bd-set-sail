import React, { useState } from '@alipay/bigfish/react';
import { Button, Input, Modal, Popover, Tree } from '@alipay/bigfish/antd';
import { noteType } from '../type';
import styles from '../index.less';
import { useModel } from '@alipay/bigfish';
import type { DataNode, TreeProps } from 'antd/es/tree';
const LeftNoteCentent: React.FC = () => {
  // 公共变量
  const {
    checkNoteKey,
    storageNoteList,
    noteContentList,
    setCheckNoteKey,
    setEditNoteKey,
    setStorageNoteList,
    setNoteContentList,
  } = useModel('global');
  const [modalOpen, setModalOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);
  const [name, setName] = useState('');
  // // menu 选择笔记
  // const checkNoteItem = ({ key }: { key: string }) => {
  //   setCheckNoteKey(key);
  //   setEditNoteKey(key);
  // };
  //
  // tree 选择笔记
  const checkNoteItem: TreeProps['onSelect'] = (_, { node }) => {
    if (String(node.key).startsWith('note')) {
      setCheckNoteKey(String(node.key));
      setEditNoteKey(String(node.key));
    } else {
      setCheckNoteKey(String(node.key));
      setName(node.title as string);
      setModalOpen(true);
    }
  };
  // 新增空白菜单目录+笔记
  const addNoteList = () => {
    const catalogDate = String(Date.now());
    const menuDate = 'menu' + String(Date.now());
    const noteDate = 'note' + String(Date.now());

    const noteList: DataNode[] = [
      {
        key: catalogDate,
        title: '新建菜单',
        children: [
          {
            key: menuDate,
            title: '新增目录',
            children: [
              {
                key: noteDate,
                title: '笔记',
              },
            ],
          },
        ],
      },
    ];
    setStorageNoteList([...storageNoteList, ...noteList] as noteType[]);
    setNoteContentList([
      ...noteContentList,
      { key: noteDate, desc: '', title: '笔记' },
    ]);
  };
  const addMenu = () => {
    const menuDate = 'menu' + String(Date.now());
    const newNoteList = storageNoteList.filter((catalog: noteType) => {
      if (catalog.key === checkNoteKey && catalog.children) {
        catalog.children.push({
          key: menuDate,
          title: '新增目录',
          children: [],
        });
      }
      return catalog;
    });
    setStorageNoteList(newNoteList);
    setModalOpen(false);
    setCheckNoteKey('');
  };
  const addNoteItem = () => {
    const noteDate = 'note' + String(Date.now());
    const newNoteList = storageNoteList.map((catalog) => {
      const newMenu = catalog.children?.filter((menu) => {
        if (menu.key === checkNoteKey && menu.children) {
          menu.children.push({
            key: noteDate,
            title: '新增笔记',
          });
        }
        return menu;
      });
      return { ...catalog, children: newMenu };
    });
    setStorageNoteList(newNoteList);
    setNoteContentList([
      ...noteContentList,
      { key: noteDate, desc: '', title: '新增笔记' },
    ]);
    setModalOpen(false);
    setCheckNoteKey('');
  };
  const openPop = () => {
    setPopOpen(true);
  };
  const resetCatalogName = () => {
    const newNoteList = storageNoteList.filter((catalog) => {
      if (catalog.key === checkNoteKey) {
        catalog.title = name;
      }
      return catalog;
    });
    setStorageNoteList(newNoteList);
    setPopOpen(false);
    setCheckNoteKey('');
  };
  const delCatalog = () => {
    let delNoteKeys: string[] = [];
    // 删除后的菜单列表
    const delCatalogList = storageNoteList.filter((item) => {
      if (item.key === checkNoteKey) {
        item.children?.map((menu) => {
          menu.children?.map((note) => {
            delNoteKeys.push(note.key);
            return note;
          });
          return menu;
        });
        item.children = [];
      }
      return item.key !== checkNoteKey;
    });
    const delNoteList = noteContentList.filter((note) => {
      return !delNoteKeys.includes(note.key);
    });
    setStorageNoteList(delCatalogList);
    setNoteContentList(delNoteList);
    setCheckNoteKey('');
    setModalOpen(false);
  };
  const resetMenuName = () => {
    const newNoteList = storageNoteList.map((catalog) => {
      const newMenu = catalog.children?.filter((menu) => {
        if (menu.key === checkNoteKey) {
          menu.title = name;
        }
        return menu;
      });
      return { ...catalog, children: newMenu };
    });
    setStorageNoteList(newNoteList);
    setPopOpen(false);
    setCheckNoteKey('');
  };
  const delMenu = () => {
    let delNoteKeys: string[] = [];
    // 删除后的菜单列表
    const delCatalogList = storageNoteList.map((item) => {
      const delMenuList = item.children?.filter((menu) => {
        if (menu.key === checkNoteKey) {
          menu.children?.map((note) => {
            delNoteKeys.push(note.key);
            return note;
          });
        }
        return menu.key !== checkNoteKey;
      });
      return { ...item, children: delMenuList };
    });
    const delNoteList = noteContentList.filter((note) => {
      return !delNoteKeys.includes(note.key);
    });
    setStorageNoteList(delCatalogList);
    setNoteContentList(delNoteList);
    setCheckNoteKey('');
    setModalOpen(false);
  };
  return (
    <div className={styles.leftNoteList}>
      <Button className={styles.addNote} onClick={addNoteList}>
        新建笔记
      </Button>
      <Tree treeData={storageNoteList} onSelect={checkNoteItem} />
      <Modal
        visible={modalOpen}
        footer={null}
        closable={false}
        onCancel={() => {
          setPopOpen(false);
          setModalOpen(false);
          setCheckNoteKey('');
        }}
      >
        <div className={styles.btnGroup}>
          {checkNoteKey.startsWith('menu') ? (
            <>
              <Button
                onClick={() => {
                  addNoteItem();
                }}
              >
                新建笔记
              </Button>
              <Popover
                content={
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onPressEnter={() => {
                      resetMenuName();
                    }}
                  />
                }
                trigger="click"
                visible={popOpen}
              >
                {' '}
                <Button
                  onClick={() => {
                    openPop();
                  }}
                >
                  重命名
                </Button>
              </Popover>
              <Button
                onClick={() => {
                  delMenu();
                }}
              >
                删除
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  addMenu();
                }}
              >
                新建目录
              </Button>
              <Popover
                content={
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    onPressEnter={() => {
                      resetCatalogName();
                    }}
                  />
                }
                trigger="click"
                visible={popOpen}
              >
                {' '}
                <Button
                  onClick={() => {
                    openPop();
                  }}
                >
                  重命名
                </Button>
              </Popover>
              <Button
                onClick={() => {
                  delCatalog();
                }}
              >
                删除
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default LeftNoteCentent;
