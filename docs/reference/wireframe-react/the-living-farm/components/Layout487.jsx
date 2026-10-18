"use client";

import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { useScroll, useTransform } from "framer-motion";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { RxChevronRight } from "react-icons/rx";

const ContentBlock = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const blockRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.5, 0.66, 0.83],
    [0, 0, 1, 1, 0],
  );
  const handleVisibilityChange = (index, isVisible) => {
    if (isVisible) {
      setCurrentIndex(index);
    }
  };
  useEffect(() => {
    const unsubscribe = opacity.on("change", (v) => {
      handleVisibilityChange(index, v > 0.5);
      setCurrentImageIndex(currentIndex);
    });
    return () => unsubscribe();
  }, [opacity, handleVisibilityChange]);
  return (
    <div className="md:h-svh">
      <motion.div
        ref={blockRef}
        animate={isMobile ? { opacity: 1 } : undefined}
        style={!isMobile ? { opacity } : undefined}
        className="flex flex-col items-start justify-center md:justify-start"
      >
        {children}
      </motion.div>
    </div>
  );
};

const CurrentImage = () => {
  return (
    <img
      src={contentBlocks[currentImageIndex].image.src}
      alt={contentBlocks[currentImageIndex].image.alt}
      className="object-cover size-full"
    />
  );
};

const useRelume = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return { currentImageIndex, setCurrentImageIndex };
};

export function Layout487() {
  const useActive = useRelume();
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-3 font-semibold md:mb-4">Harvest</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Work the land
          </h2>
          <p className="md:text-md">
            Pick fruit and gather vegetables from the soil.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 items-start gap-12 md:mt-0 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="relative flex w-full flex-col gap-12 md:hidden md:pt-[60vh]">
            <ContentBlock
              index={0}
              setCurrentImageIndex={useActive.setCurrentImageIndex}
            >
              <div className="mb-8 md:hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-1.svg"
                  alt="Relume placeholder image 1"
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Fruit</p>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Pick fruit in the orchard
              </h2>
              <p className="md:text-md">
                Reach into the branches for sapota, mango, and guava when the
                season is right.
              </p>
              <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                <Button title="Book" variant="secondary">
                  Book
                </Button>
                <Button
                  title="View"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  View
                </Button>
              </div>
            </ContentBlock>
            <ContentBlock
              index={1}
              setCurrentImageIndex={useActive.setCurrentImageIndex}
            >
              <div className="mb-8 md:hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-2.svg"
                  alt="Relume placeholder image 2"
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Fruit</p>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Pick fruit in the orchard
              </h2>
              <p className="md:text-md">
                Reach into the branches for sapota, mango, and guava when the
                season is right.
              </p>
              <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                <Button title="Book" variant="secondary">
                  Book
                </Button>
                <Button
                  title="View"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  View
                </Button>
              </div>
            </ContentBlock>
            <ContentBlock
              index={2}
              setCurrentImageIndex={useActive.setCurrentImageIndex}
            >
              <div className="mb-8 md:hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-3.svg"
                  alt="Relume placeholder image 3"
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Fruit</p>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Pick fruit in the orchard
              </h2>
              <p className="md:text-md">
                Reach into the branches for sapota, mango, and guava when the
                season is right.
              </p>
              <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                <Button title="Book" variant="secondary">
                  Book
                </Button>
                <Button
                  title="View"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  View
                </Button>
              </div>
            </ContentBlock>
            <ContentBlock
              index={3}
              setCurrentImageIndex={useActive.setCurrentImageIndex}
            >
              <div className="mb-8 md:hidden">
                <img
                  src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-4.svg"
                  alt="Relume placeholder image 4"
                />
              </div>
              <p className="mb-3 font-semibold md:mb-4">Fruit</p>
              <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                Pick fruit in the orchard
              </h2>
              <p className="md:text-md">
                Reach into the branches for sapota, mango, and guava when the
                season is right.
              </p>
              <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                <Button title="Book" variant="secondary">
                  Book
                </Button>
                <Button
                  title="View"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  View
                </Button>
              </div>
            </ContentBlock>
          </div>
          <div className="relative hidden w-full flex-col gap-12 md:flex md:pt-[60vh]">
            <Fragment>
              <ContentBlock
                index={0}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <div className="mb-8 md:hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-1.svg"
                    alt="Relume placeholder image 1"
                  />
                </div>
                <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Medium length section heading goes here
                </h2>
                <p className="md:text-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Button" variant="secondary">
                    Button
                  </Button>
                  <Button
                    title="Button"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Button
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
            <Fragment>
              <ContentBlock
                index={2}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <div className="mb-8 md:hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-3.svg"
                    alt="Relume placeholder image 3"
                  />
                </div>
                <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Medium length section heading goes here
                </h2>
                <p className="md:text-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Button" variant="secondary">
                    Button
                  </Button>
                  <Button
                    title="Button"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Button
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
          </div>
          <div className="sticky top-0 hidden h-screen w-full items-center justify-center md:flex">
            <div className="aspect-[2/3]">
              <CurrentImage
                currentImageIndex={useActive.currentImageIndex}
                contentBlocks={[
                  {
                    tagline: "Tagline",
                    heading: "Medium length section heading goes here",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
                    buttons: [
                      { title: "Button", variant: "secondary" },
                      {
                        title: "Button",
                        variant: "link",
                        size: "link",
                        iconRight: <RxChevronRight />,
                      },
                    ],
                    image: {
                      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-1.svg",
                      alt: "Relume placeholder image 1",
                    },
                  },
                  {
                    tagline: "Tagline",
                    heading: "Medium length section heading goes here",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
                    buttons: [
                      { title: "Button", variant: "secondary" },
                      {
                        title: "Button",
                        variant: "link",
                        size: "link",
                        iconRight: <RxChevronRight />,
                      },
                    ],
                    image: {
                      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-2.svg",
                      alt: "Relume placeholder image 2",
                    },
                  },
                  {
                    tagline: "Tagline",
                    heading: "Medium length section heading goes here",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
                    buttons: [
                      { title: "Button", variant: "secondary" },
                      {
                        title: "Button",
                        variant: "link",
                        size: "link",
                        iconRight: <RxChevronRight />,
                      },
                    ],
                    image: {
                      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-3.svg",
                      alt: "Relume placeholder image 3",
                    },
                  },
                  {
                    tagline: "Tagline",
                    heading: "Medium length section heading goes here",
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
                    buttons: [
                      { title: "Button", variant: "secondary" },
                      {
                        title: "Button",
                        variant: "link",
                        size: "link",
                        iconRight: <RxChevronRight />,
                      },
                    ],
                    image: {
                      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image-4.svg",
                      alt: "Relume placeholder image 4",
                    },
                  },
                ]}
              />
            </div>
          </div>
          <div className="relative hidden w-full flex-col gap-12 md:flex md:pt-[110vh]">
            <Fragment>
              <ContentBlock
                index={1}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <div className="mb-8 md:hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-2.svg"
                    alt="Relume placeholder image 2"
                  />
                </div>
                <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Medium length section heading goes here
                </h2>
                <p className="md:text-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Button" variant="secondary">
                    Button
                  </Button>
                  <Button
                    title="Button"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Button
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
            <Fragment>
              <ContentBlock
                index={3}
                setCurrentImageIndex={useActive.setCurrentImageIndex}
              >
                <div className="mb-8 md:hidden">
                  <img
                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-4.svg"
                    alt="Relume placeholder image 4"
                  />
                </div>
                <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                <h2 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Medium length section heading goes here
                </h2>
                <p className="md:text-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>
                <div className="mt-6 flex items-center gap-x-4 md:mt-8">
                  <Button title="Button" variant="secondary">
                    Button
                  </Button>
                  <Button
                    title="Button"
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                  >
                    Button
                  </Button>
                </div>
              </ContentBlock>
            </Fragment>
          </div>
        </div>
      </div>
    </section>
  );
}
