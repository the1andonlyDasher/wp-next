import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

const variants = {
  initial: {
    x: 50,
    opacity: 0,

  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 50,
    opacity: 0,
  },
};

type NavItemProps = {
  href?: string;
  name?: string;
  clickLink?: any;
}

export const NavItem = ({ href, name, clickLink }: NavItemProps) => {
  const [isShrunk, setShrunk] = useState(false);
  useEffect(() => {
    const handler = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100)
        ) {
          return true;
        }
        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }
        return isShrunk;
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <>
      <motion.li
        className="navItem"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          type: "tween",
          duration: 0.75
        }}
      >
        <Link aria-label={name} scroll={false} className={isShrunk ? "nav-link black" : "nav-link"} href={`${href}`} onClick={clickLink}>{name}</Link>
      </motion.li>
    </>
  );
};

