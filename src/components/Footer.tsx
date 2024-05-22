import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = ({ data, imprint }: any) => {
  const date = new Date()

  return (
    <>
      <motion.footer className="footer">

        <h5>© {date.getFullYear()} Wicked Hand Design</h5>
        <div className="footer-links">
          <div>
            <Link
              data-link-text="Impressum"
              className="btn__alt"
              href={"/datapolicy"}
            >
              {data}
            </Link>
          </div>
          <div>
            <Link
              data-link-text="Datenschutz"
              className="btn__alt"
              href={"/imprint"}
            >
              {imprint}
            </Link>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
