import React from 'react';
import { connect } from '@umijs/max';

import styles from './index.less';
import DvaOtherWrapper from './other';

const DvaLearn = (props: { learnTest: any; dispatch: any }) => {
  const { learnTest, dispatch } = props;
  return (
    <>
      <div
        className={styles.container}
        onClick={() => {
          dispatch({
            type: 'dvaLearn/addTest',
            payload: {
              num: 1,
            },
          });
        }}
      >
        DvaLearn --------- {learnTest}
      </div>
      <DvaOtherWrapper />
    </>
  );
};

const DvaLearnWrapper = connect(({ dvaLearn }: any) => {
  return dvaLearn;
})(DvaLearn);

export default DvaLearnWrapper;
