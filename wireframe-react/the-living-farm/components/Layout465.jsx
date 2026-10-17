"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout465() {
  return (
    <section id="relume" className="relative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-text-alternative md:mb-4">
              Sanctuary
            </p>
            <h2 className="text-5xl font-bold text-text-alternative md:text-7xl lg:text-8xl">
              The cows know a calm hand
            </h2>
          </div>
          <div className="mx-[7.5%] md:mt-60">
            <p className="mb-6 text-text-alternative md:mb-8 md:text-md">
              The Gau Seva Sanctuary is a quiet place. The cows are gentle and
              they remember kindness.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] text-text-alternative md:mb-4 md:text-xl">
                  Cow cuddling
                </h6>
                <p className="text-text-alternative">
                  Sit with them. Feel the warmth and the slow breath of an
                  animal at peace.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] text-text-alternative md:mb-4 md:text-xl">
                  Animal connection
                </h6>
                <p className="text-text-alternative">
                  There is a truth in their eyes. It asks for nothing but your
                  presence.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button title="Book" variant="secondary-alt">
                Book
              </Button>
              <Button
                title="View"
                variant="link-alt"
                size="link"
                iconRight={<RxChevronRight />}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="absolute inset-0 size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
