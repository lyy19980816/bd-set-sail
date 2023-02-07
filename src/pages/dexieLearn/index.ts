import Dexie from 'dexie';

const db: any = new Dexie('TestDexie');
const table = 'todo';
(() => {
  if (db[table]) {
    console.log('DB initialized.');
    return;
  }
  db.version(1).stores({
    [table]: '++id,content,done',
  });
})();

export function list() {
  return db[table].toArray();
}

export function addList(data: any) {
  return db[table].add(data);
}

export function updateList(key: any, changes: any) {
  return db[table].update(key, changes);
}

export function removeList(key: any) {
  return db[table].delete(key);
}
