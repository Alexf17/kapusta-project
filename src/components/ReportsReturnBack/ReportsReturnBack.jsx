import Icons from 'images/icons-sprite.svg';

import { BackLink } from './ReportsReturnBack.styled';

const ReportsReturnBack = () => {
  return (
    <BackLink to="/operations">
      <svg width="24" height="24">
        <use href={`${Icons}#icon-arrow-back`}></use>
      </svg>
      <p>Main page</p>
    </BackLink>
  );
};

export default ReportsReturnBack;
