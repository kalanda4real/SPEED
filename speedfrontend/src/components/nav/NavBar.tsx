import React from "react";
import styles from "./Nav.module.scss";
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => {
  const router = useRouter();
  const noNavbarRoutes = ['/login', '/signup','/admin/adminhome', '/admin/adminUser','/admin/adminarticles'];

  if (noNavbarRoutes.includes(router.pathname)) {
    return null;
  }
  return <nav className={styles.navbar}>{children}</nav>;
};

export default NavBar;

