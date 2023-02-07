/**
 *    先做render阶段的事情，再做commit阶段的事情
 *    重点在于render阶段
 */

const jsx = (
  <div id="a1">
    <div id="b1">
      <div id="c1"></div>
      <div id="c2"></div>
    </div>
    <div id="b2"></div>
  </div>
);

/**
 * 构建节点，从public/index.html 从id为root的div开始构建根节点
 */

// 1. 获取到id为root的div对象
const container = document.getElementById('root');

// 2. 构建根元素的 Fiber 对象
//  stateNode存Fiber对象对应的dom对象 container
const workInProgressRoot = {
  stateNode: container,
  props: {
    children: [jsx],
  },
};

/**
 * 构建完根元素的Fiber对象之后，要去构建它的子元素
 *    即a1、b1、c1、c2、b2
 * 由于子元素有多个，通过循环来模拟递归
 * 并在闲时去执行，用浏览器空闲api requestIdleCallback
 *    当浏览器有空闲时间会去调用传递给它的函数 workLoop
 */

// 在浏览器空闲的时候执行任务
requestIdleCallback(workLoop);

/**
 * 要通过循环的方式去构建子元素
 *    循环条件：1.有没有空余时间；2.有没有要执行的任务
 * 在执行任务的过程当中是从根元素（ workInProgressRoot ）开始执行的
 * 它就是下一个要执行的任务，但是下一个要执行的任务很多
 * 要用一个变量来存储下一个要执行的任务
 * 不能再while里直接用，这个变量不能变，它代表根元素的Fiber对象
 * 要声明一个变量 nextUnitOfWork 默认是根元素
 */

/**
 * while内 nextUnitOfWork 存在并且有空余时间
 *    requestIdleCallback 的回调函数会接收到一个名为 IdleDeadline 的参数
 *          这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态
 * 声明一个performUnitOfWork方法执行任务，把任务nextUnitOfWork传递进去
 *    要求这个方法返回下一个要执行的任务
 *    在判断下一个要执行的任务是否存在，再通过该方法执行
 *
 * 当这个循环走完之后来判断 如果nextUnitOfWork不存在
 * 进入到第二阶段 通过 commitRoot() 执行DOM操作
 */

// 下一个要执行的任务
let nextUnitOfWork = workInProgressRoot;

function workLoop(deadline) {
  // 1. 是否有空余时间
  // 2. 是否有要执行的任务
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // 表示所有的任务都已经执行完成了
  if (!nextUnitOfWork) {
    // 进入到第二阶段 执行DOM
    commitRoot();
  }
}

/**
 * performUnitOfWork 接收一个参数 当前要执行的任务 workInProgressFiber
 *    第一 创建DOM对象并将它存储到 stateNode 属性当中
 *    第二 构建当前Fiber对象的子级Fiber
 *      注意：要执行的任务传进来的是一个Fiber
 *      workInProgressFiber 就是一个Fiber
 *
 * 这两件事通过一个方法去做  beginWork
 *    当调用 beginWork() 的时候 把 workInProgressFiber（当前要执行的任务）传递进去
 */

function performUnitOfWork(workInProgressFiber) {
  // 1. 创建 DOM 对象并将它存储在 stateNode 属性
  // 2. 构建当前 Fiber 的子级 Fiber
  // 向下走的过程
  beginWork(workInProgressFiber);
  // 如果当前Fiber有子级
  if (workInProgressFiber.child) {
    // 返回子级 构建子级的子级
    return workInProgressFiber.child;
  }

  // 向上走的过程
  while (workInProgressFiber) {
    // 构建链表
    completeUnitOfWork(workInProgressFiber);

    // 如果有同级
    if (workInProgressFiber.sibling) {
      // 返回同级 构建同级的子级
      return workInProgressFiber.sibling;
    }
    // 更新父级
    // eslint-disable-next-line no-param-reassign
    workInProgressFiber = workInProgressFiber.return;
  }
}

function beginWork(workInProgressFiber) {
  // 1. 创建 DOM 对象并将它存储在 stateNode 属性
  if (!workInProgressFiber.stateNode) {
    // 创建 DOM
    workInProgressFiber.stateNode = document.createElement(
      workInProgressFiber.type,
    );
    // 为 DOM 添加属性
    for (let attr in workInProgressFiber.props) {
      if (attr !== 'children') {
        workInProgressFiber.stateNode[attr] = workInProgressFiber.props[attr];
      }
    }
  }
  // 2. 构建当前 Fiber 的子级 Fiber
  if (Array.isArray(workInProgressFiber.props.children)) {
    // 先跳过这行
    let previousFiber = null; // 兄弟节点 上一个fiber

    workInProgressFiber.props.children.forEach((child, index) => {
      let childFiber = {
        type: child.type,
        props: child.props,
        effectTag: 'PLACEMENT', // 当前fiber要执行的DOM操作 渲染
        return: workInProgressFiber,
      };

      if (index === 0) {
        workInProgressFiber.child = childFiber;
      } else {
        previousFiber.sibling = childFiber; // 浅拷贝  previousFiber.sibling 改变 引起  上次循环 childFiber.sibling 改变
      }
      console.log('previousFiber', previousFiber);
      previousFiber = childFiber;
    });
  }
  console.log('workInProgressFiber', workInProgressFiber);
}

/** 图例1
 *         A1
 *        *  *
 *       *    *
 *      B1    B2
 *     *  *
 *    *    *
 *   C1    C2
 */

function completeUnitOfWork(workInProgressFiber) {
  // 获取当前 Fiber 的父级
  const returnFiber = workInProgressFiber.return;
  // 父级是否存在
  if (returnFiber) {
    // 需要执行 DOM 操作
    if (workInProgressFiber.effectTag) {
      // 03 如果身上没有lastEffect（上移）
      if (!returnFiber.lastEffect) {
        returnFiber.lastEffect = workInProgressFiber.lastEffect;
      }

      // 05 如果身上没有firstEffect（上移）
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = workInProgressFiber.firstEffect;
      }

      // 02 判断非第一次走
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workInProgressFiber;
      }
      // 04 第一次执行 先给父级的属性添加一个firstEffect 指向子级
      else {
        returnFiber.firstEffect = workInProgressFiber;
      }

      // 01 首次 先给父级的属性添加一个lastEffect 指向子级
      returnFiber.lastEffect = workInProgressFiber;
    }
  }
}

function commitRoot() {
  console.log('workInProgressRoot', workInProgressRoot);
  // 获取当前要执行DOM操作的Fiber
  let currentFiber = workInProgressRoot.firstEffect;
  while (currentFiber) {
    // 只考虑追加 父级调用 appendChild 追加子级
    currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
    // 更新
    currentFiber = currentFiber.nextEffect;
  }
}
