import { useSnapshot } from '@umijs/max';
import React, { useEffect } from 'react';

import { store } from '@/stores/valtio/index';
import styles from './index.less';
import ValtioOtherWrapper from './other';

const ValtioLearn = () => {
  const { learnTest, double } = useSnapshot(store);
  const status = (a = 0, b = 1) => {
    if (a === 0) {
      if (b === 1) {
        console.log('1');
        return;
      }
      console.log('2');
    }
  };
  useEffect(() => {
    status();
  }, []);
  return (
    <>
      <div className={styles.container} onClick={() => {}}>
        ValtioLearn --------- {learnTest} {double}
      </div>
      <ValtioOtherWrapper />
    </>
  );
};

export default ValtioLearn;
