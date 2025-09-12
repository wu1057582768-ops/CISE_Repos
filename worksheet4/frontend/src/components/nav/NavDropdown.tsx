// NavDropdown.tsx 文件应该包含类似以下的导出代码
import React, { ReactNode } from 'react';

interface NavDropdownProps {
  children: ReactNode;
}

const NavDropdown = ({ children }: NavDropdownProps) => {
  return (
    <div className="nav-dropdown">
      {children}
    </div>
  );
};

export default NavDropdown;