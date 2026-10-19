"use client";

import { Button } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const useRelume = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const animateMenu = isMenuOpen
    ? { menu: "open", menu2: "openSecond" }
    : { menu: "close", menu2: "closeSecond" };
  return {
    toggleMenu,
    animateMenu,
    isMenuOpen,
  };
};

export function Navbar17() {
  const useActive = useRelume();
  return (
    <section
      id="relume"
      className="relative z-[999] flex min-h-16 w-full items-center border-b border-b-border-primary bg-background-primary px-[5%] md:min-h-18"
    >
      <div className="mx-auto flex size-full items-center justify-between">
        <a href="#">
          <img
            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
            alt="Relume placeholder logo"
          />
        </a>
        <div className="flex items-center justify-center gap-2 lg:gap-4">
          <Button title="Book" size="sm" className="px-4 py-1 md:px-6 md:py-2">
            Book
          </Button>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center justify-self-end lg:mr-0"
            onClick={useActive.toggleMenu}
          >
            <span className="relative flex size-6 flex-col items-center justify-center">
              <motion.span
                className="absolute top-[3px] h-0.5 w-full bg-black"
                animate={useActive.animateMenu.menu}
                variants={{
                  open: {
                    width: 0,
                    transition: { duration: 0.1, ease: "easeIn" },
                  },
                  close: {
                    width: "100%",
                    transition: { duration: 0.1, delay: 0.3, ease: "linear" },
                  },
                }}
              />
              <motion.span
                className="absolute h-0.5 w-full bg-black"
                animate={useActive.animateMenu.menu}
                variants={{
                  open: {
                    rotate: 135,
                    transition: {
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeInOut",
                    },
                  },
                  close: {
                    rotate: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                  openSecond: {
                    rotate: 45,
                    transition: {
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeInOut",
                    },
                  },
                  closeSecond: {
                    rotate: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                }}
              />
              <motion.span
                className="absolute h-0.5 w-full bg-black"
                animate={useActive.animateMenu.menu2}
                variants={{
                  open: {
                    rotate: 135,
                    transition: {
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeInOut",
                    },
                  },
                  close: {
                    rotate: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                  openSecond: {
                    rotate: 45,
                    transition: {
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeInOut",
                    },
                  },
                  closeSecond: {
                    rotate: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  },
                }}
              />
              <motion.span
                className="absolute bottom-[3px] h-0.5 w-full bg-black"
                animate={useActive.animateMenu.menu}
                variants={{
                  open: {
                    width: 0,
                    transition: { duration: 0.1, ease: "easeIn" },
                  },
                  close: {
                    width: "100%",
                    transition: { duration: 0.1, delay: 0.3, ease: "linear" },
                  },
                }}
              />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        <ConditionalRender condition={useActive.isMenuOpen}>
          <div className="absolute inset-x-0 top-full h-[calc(100vh-4rem)] w-full overflow-hidden md:h-[calc(100vh-4.5rem)]">
            <motion.div
              variants={{ open: { opacity: 1 }, close: { opacity: 0 } }}
              animate={useActive.animateMenu.menu}
              initial="close"
              exit="close"
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col overflow-auto bg-background-primary"
            >
              <div className="mt-px flex grow flex-col">
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Our nests
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Living farm
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Field notes
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Group enquiries
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Our nests
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Living farm
                </a>
                <a
                  href="#"
                  className="flex grow items-center justify-end border-t border-border-primary px-[5%] py-4 text-4xl font-bold leading-[1.2] last:border-b last:border-b-black md:py-2 md:text-6xl"
                >
                  Field notes
                </a>
              </div>
              <div className="flex min-h-18 items-center justify-between gap-x-4 px-[5%]">
                <a
                  className="text-md underline md:text-xl focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0"
                  href="#"
                >
                  Contact
                </a>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <BiLogoFacebookCircle className="size-6" />
                  </a>
                  <a href="#">
                    <BiLogoInstagram className="size-6" />
                  </a>
                  <a href="#">
                    <FaXTwitter className="size-6" />
                  </a>
                  <a href="#">
                    <BiLogoLinkedinSquare className="size-6" />
                  </a>
                  <a href="#">
                    <BiLogoYoutube className="size-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </ConditionalRender>
      </AnimatePresence>
    </section>
  );
}
