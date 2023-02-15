import React, { useEffect, useState } from 'react';
import './index.less';

interface IRoutesList {
  redirect?: string;
  name?: string;
  routes?: IRoutesList[];
}
const routesList: IRoutesList[] = [
  {
    redirect: '',
  },
  {
    routes: [
      {
        name: '工单管控',
        routes: [
          {
            name: '列表页',
          },
          {
            name: '详情页',
          },
        ],
      },
      {
        name: '信息中心',
        routes: [
          {
            name: '信息中心',
            routes: [
              {
                name: '信息安全',
              },
            ],
          },
          {
            name: '通路组网列表',
          },
          {
            name: '通路组网详情',
          },
          {
            name: '报告',
          },
          {
            name: '动态内嵌页面',
          },
        ],
      },
      {
        name: '成员管理',
        routes: [
          {
            name: '成员协议管理',
          },
          {
            name: '成员编辑',
          },
          {
            name: '成员详情',
          },
        ],
      },
    ],
  },
];
let routeNameLists: string[] = [];
const Recursion = () => {
  const [routeNameList, setRouteNameList] = useState<string[]>([]);

  const recursionFn = (routes: IRoutesList[]) => {
    routes.forEach((item) => {
      if (item.name) {
        routeNameLists = [...routeNameLists, item.name];
      }
      if (item.routes) {
        recursionFn(item.routes);
      }
    });
    setRouteNameList(routeNameLists);
  };

  useEffect(() => {
    recursionFn(routesList);
  }, []);
  return (
    <div className="pageSet">
      <div>
        <div className="title">递归路由列表</div>
        {routeNameList.map((routeName, index) => {
          return <div key={index}>{routeName}</div>;
        })}
      </div>
    </div>
  );
};

export default Recursion;
