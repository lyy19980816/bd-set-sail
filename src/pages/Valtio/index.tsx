import { useSnapshot } from '@umijs/max';
import React, { useEffect } from 'react';

import { store } from '@/stores/valtio/index';
import InputTemplate from '@/components/InputTemplate';

import styles from './index.less';
import ValtioOtherWrapper from './other';

const ValtioLearn = () => {
  const { learnTest, double } = useSnapshot(store);
  const inputTemplateProps = {
    type: 'text',
  };
  const status = (a = 0, b = 1) => {
    if (a === 0) {
      if (b === 1) {
        console.log('1');
        return;
      }
      console.log('2');
      return;
    }
    console.log('3');
  };
  useEffect(() => {
    status(learnTest, double);
  }, []);
  return (
    <>
      <div className={styles.container} onClick={() => {}}>
        ValtioLearn --------- {learnTest} {double}
      </div>
      <InputTemplate {...inputTemplateProps} />
      <ValtioOtherWrapper />
    </>
  );
};

export default ValtioLearn;
