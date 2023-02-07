// import cloneDeep from 'lodash/cloneDeep';

const a = [{ b: 1 }, { b: 2 }];
let c = null;
a.forEach((item, i) => {
  if (i === 0) {
    item.b = 3;
  } else {
    c.b = 4;
  }
  // c = cloneDeep(item);
  c = item;
  // c = { ...item };
});
console.log('a', a);
