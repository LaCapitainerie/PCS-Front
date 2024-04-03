import React, { ReactNode } from 'react';
import HeaderAdmin from "@/components/Header/HeaderAdmin";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
      <>
          <HeaderAdmin />
          <main>{children}</main>
      </>
    );
}

export default AdminLayout;