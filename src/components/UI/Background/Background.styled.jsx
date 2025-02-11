import styled from 'styled-components';

import DEVICE from 'constants/deviceSize';

export const BackgroundGrey = styled.div`
  width: 100%;
  height: 352px;
  z-index: -1;

  position: absolute;
  top: 0;
  background-color: ${p => p.theme.lightTheme.tableHeadBackgroundColor};
  border-bottom-left-radius: 20%;

  overflow: hidden;

  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

  @media ${DEVICE.tablet} {
    height: 583px;
  }
`;

export const CabbageContainer = styled.div`
  display: none;

  @media ${DEVICE.tablet} {
    position: absolute;
    right: 88px;
    bottom: 58px;

    z-index: -1;
    display: flex;
  }

  @media ${DEVICE.laptop} {
    display: none;
  }
`;
