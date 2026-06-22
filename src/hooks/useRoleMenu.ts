import { useState } from 'react';
import { useSelector } from 'react-redux';

const PROVIDER_ROLE_ID = 3;

/**
 * useRoleMenu
 *
 * Returns:
 *  - isMenuOpen  : true when the logged-in user has roleId === 3
 *  - openMenu    : manually open the menu
 *  - closeMenu   : manually close the menu
 *  - isProvider  : convenience flag – true when roleId === 3
 */
const useRoleMenu = () => {
  const reduxRoleId = useSelector((state: any) => state.login.roleId);
  const storageRoleId = localStorage.getItem('role_id') ? Number(localStorage.getItem('role_id')) : null;
  const roleId = reduxRoleId ?? storageRoleId;
  const isProvider = roleId === PROVIDER_ROLE_ID;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(isProvider);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return { isMenuOpen, openMenu, closeMenu, isProvider, roleId };
};

export default useRoleMenu;
