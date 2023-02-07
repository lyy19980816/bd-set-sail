import React from '@alipay/bigfish/react';
import { PageContainer } from '@alipay/tech-ui';

import { connect } from '@alipay/bigfish';

import styles from './index.less';
import DvaOtherWrapper from './other';

const DvaLearn = (props: { learnTest: any; dispatch: any }) => {
  const { learnTest, dispatch } = props;
  return (
    <PageContainer ghost>
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
    </PageContainer>
  );
};

const DvaLearnWrapper = connect(({ dvaLearn }: any) => {
  return dvaLearn;
})(DvaLearn);

export default DvaLearnWrapper;
