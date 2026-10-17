"use client";

import { Button } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { Fragment, useRef } from "react";
import { RxChevronRight } from "react-icons/rx";

const Circle = () => {
  const circleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: circleRef,
    offset: ["end end", "end center"],
  });
  const backgroundColor = {
    backgroundColor: useTransform(scrollYProgress, [0.85, 1], ["#ccc", "#000"]),
  };
  return (
    <motion.div
      ref={circleRef}
      style={backgroundColor}
      className="z-20 mt-8 size-[0.9375rem] rounded-full shadow-[0_0_0_8px_white]"
    />
  );
};

export function Timeline11() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="relative z-10 w-full max-w-lg">
              <p className="mb-3 font-semibold md:mb-4">Day</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                A day on the farm runs long
              </h2>
              <p className="md:text-md">
                The sun moves and the work changes. You move with it or you sit
                still and watch. Either way the day is full.
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                <Button title="Plan" variant="secondary">
                  Plan
                </Button>
                <Button
                  title="360"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  360
                </Button>
              </div>
            </div>
          </div>
          <div className="relative grid grid-cols-1 justify-items-center gap-20">
            <div className="absolute flex h-full w-8 flex-col items-center justify-self-start md:justify-self-auto">
              <div className="absolute z-10 h-16 w-1 bg-gradient-to-b from-background-primary to-transparent" />
              <div className="sticky top-0 mt-[-50vh] h-[50vh] w-[3px] bg-neutral-black" />
              <div className="h-full w-[3px] bg-neutral-lighter" />
              <div className="absolute bottom-0 z-0 h-16 w-1 bg-gradient-to-b from-transparent to-background-primary" />
              <div className="absolute top-[-50vh] h-[50vh] w-full bg-background-primary" />
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="hidden w-full md:block" />
                <div className="flex h-full w-8 justify-center">
                  <Circle />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-8 md:gap-12">
                  <div>
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      Dawn
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      Walk and cuddle
                    </h4>
                    <p>
                      Take a nature walk on the red earth. Spend time with the
                      cows at Gau Seva and feel the day begin.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
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
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 1"
                      className="w-full"
                    />
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="mt-4 grid grid-cols-1 items-start gap-8 text-left md:items-end md:gap-12 md:text-right">
                  <div>
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      Morning
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      Pick and harvest
                    </h4>
                    <p>
                      Join the agri-tours through the orchards. Pick fruit and
                      pull vegetables straight from the living field.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8 md:justify-end">
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
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 2"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="order-first flex h-full w-8 justify-center md:order-none">
                  <Circle />
                </div>
                <div className="hidden w-full md:block" />
              </Fragment>
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="hidden w-full md:block" />
                <div className="flex h-full w-8 justify-center">
                  <Circle />
                </div>
                <div className="mt-4 grid grid-cols-1 gap-8 md:gap-12">
                  <div>
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      Midday
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      Eat and swim
                    </h4>
                    <p>
                      Sit down to a farm-to-table meal made from what the land
                      gave that morning. Then cool off in the pool.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
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
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 3"
                      className="w-full"
                    />
                  </div>
                </div>
              </Fragment>
            </div>
            <div className="grid grid-cols-[max-content_1fr] items-start justify-items-center gap-4 md:grid-cols-[1fr_max-content_1fr] md:gap-8 lg:gap-12">
              <Fragment>
                <div className="mt-4 grid grid-cols-1 items-start gap-8 text-left md:items-end md:gap-12 md:text-right">
                  <div>
                    <h3 className="mb-5 text-4xl font-bold leading-[1.2] md:mb-6 md:text-5xl lg:text-6xl">
                      Dusk
                    </h3>
                    <h4 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
                      Play and burn
                    </h4>
                    <p>
                      Play lagori and gilli-danda or hopscotch in the fading
                      light. End the day around a bonfire.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8 md:justify-end">
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
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                      alt="Relume placeholder image 4"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="order-first flex h-full w-8 justify-center md:order-none">
                  <Circle />
                </div>
                <div className="hidden w-full md:block" />
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
