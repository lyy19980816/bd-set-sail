import React from 'react';

import { connect } from '@umijs/max';

import styles from './index.less';

const DvaOther = (props: { learnTest: any; dispatch: any }) => {
  const { learnTest, dispatch } = props;
  return (
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
      DvaOther --------- {learnTest}
    </div>
  );
};

const DvaOtherWrapper = connect(({ dvaLearn }: any) => {
  return dvaLearn;
})(DvaOther);

export default DvaOtherWrapper;
