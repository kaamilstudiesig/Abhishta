"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";
import { RxChevronRight } from "react-icons/rx";

export function Layout195() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img
              src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
              className="w-full object-cover"
              alt="Relume placeholder image"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 font-semibold md:mb-4">About</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              A place desired, a land beloved
            </h2>
            <p className="mb-6 md:mb-8 md:text-md">
              Abhishta means the desired one. It is the thing you long for
              without knowing it. Here, the sky is the ceiling and the fields
              are the floor.
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Open skies
                </h6>
                <p>
                  The horizon stretches far and the stars come out sharp and
                  clear at night.
                </p>
              </div>
              <div>
                <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">
                  Living fields
                </h6>
                <p>
                  Walk the orchards, swim the pool, ride the bullock cart
                  through the rows.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              <Button variant="secondary">Watch</Button>
              <Button iconRight={<RxChevronRight />} variant="link" size="link">
                360
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
