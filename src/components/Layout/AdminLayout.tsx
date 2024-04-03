import React, { ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
      <>
          <header>Oui</header>
          <main>{children}</main>
      </>
    );
}

export default AdminLayout;