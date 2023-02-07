const jsx = (
  <div id="a1">
    <div id="b1">
      <div id="c1"></div>
      <div id="c2"></div>
    </div>
    <div id="b2"></div>
  </div>
);

// vdom 要渲染的对象, container 要渲染到的位置
function render(vdom, container) {
  // 1.创建元素
  const element = document.createElement(vdom.type);
  // 2.为元素添加属性
  //   属性在props里面，但是需要把里面的'children'排除掉，它不是属性
  //  .1我们先拿到对象中的属性，把其添加到数组当中
  //  .2再把数组当中的'children'过滤掉
  //  .3遍历剩余的属性，并为元素添加
  Object.keys(vdom.props)
    .filter((propName) => propName !== 'children')
    .forEach((propName) => (element[propName] = vdom.props[propName]));
  // 3.递归创建子元素
  //   React15 性能开销就在此处
  //  .1不是所有的元素都有子元素，因此遍历前需要先进行判断
  //  .2遍历子元素并递归调用render创建元素
  if (Array.isArray(vdom.props.children)) {
    vdom.props.children.forEach((child) => render(child, element));
  }
  // 4.将元素添加到页面中
  container.appendChild(element);
}

render(jsx, document.getElementById('root'));
