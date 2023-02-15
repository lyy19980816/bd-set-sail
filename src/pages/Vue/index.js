let effect = [];

// 响应式定义变量方法
const lyy = (value) => {
  const lyyValue = {
    get value() {
      return value;
    },
    set value(newValue) {
      effect.forEach((fn) => {
        return fn();
      });
      // eslint-disable-next-line no-param-reassign
      value = newValue;
    },
  };
  return lyyValue;
};

// 副作用
const updateEffect = (callback) => {
  effect.push(callback);
  const lyyValue = {
    get value() {
      return callback();
    },
  };
  return lyyValue;
};

let A01 = lyy(0);
let A02 = lyy(1);
let A03 = updateEffect(() => {
  return A01.value + A02.value;
});

console.log('aaa', A01.value, A02.value, A03.value);
A01.value = 2;
console.log('bbb', A01.value, A02.value, A03.value);
A02.value = 0;
console.log('ccc', A01.value, A02.value, A03.value);

export default () => <>Vue3 响应式绑定</>;
