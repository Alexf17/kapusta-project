import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import ExitIcon from 'images/icons-sprite.svg';

import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import SettingsMenu from 'components/SettingsMenu/SettingsMenu';

import {
  Container,
  ExitBtn,
  UserName,
  ExitContainer,
  LogoutBtn,
  MenuBtn,
} from './NavBar.styles';
import { logOut } from 'redux/auth/operations';
import { selectEmail, selectName } from 'redux/auth/selectors';

const NavBar = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);

  const toCutName = email => {
    const firstLetter = email.slice(0, 1).toUpperCase();
    return firstLetter;
  };

  const onUserClick = evt => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Container>
        <MenuBtn onClick={onUserClick}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              color: 'rgba(82, 85, 95, 1)',
              backgroundColor: 'rgba(245, 246, 250, 1)',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              lineHeight: 1.17,
            }}
          >
            {name ? toCutName(name) : toCutName(email)}
          </Avatar>
        </MenuBtn>
        <ExitContainer>
          <UserName onClick={onUserClick}>{name ? name : email}</UserName>
          <ExitBtn onClick={() => setModalOpen(true)}>Exit</ExitBtn>
        </ExitContainer>
        <LogoutBtn onClick={() => setModalOpen(true)}>
          <svg alt="exit" width={16} height={16}>
            <use href={`${ExitIcon}#icon-logout`}></use>
          </svg>
        </LogoutBtn>
        {isMenuOpen === true && <SettingsMenu setMenuOpen={onUserClick} />}
      </Container>
      {modalOpen && (
        <ConfirmModal
          setModalOpen={setModalOpen}
          text={'Do you really want to leave?'}
          onClick={() => dispatch(logOut())}
        />
      )}
    </>
  );
};

export default NavBar;
