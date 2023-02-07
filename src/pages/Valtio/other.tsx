import React from 'react';
import { useSnapshot } from '@umijs/max';

import { actions, store } from '@/stores/valtio/index';

import styles from './index.less';

const ValtioOther = () => {
  const { doubleFn } = actions;
  const { learnTest, double } = useSnapshot(store);
  return (
    <div
      className={styles.container}
      onClick={() => {
        doubleFn();
      }}
    >
      ValtioOther --------- {learnTest} {double}
    </div>
  );
};

export default ValtioOther;
