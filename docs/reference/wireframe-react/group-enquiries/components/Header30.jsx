"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header30() {
  return (
    <section id="relume" className="relative px-[5%]">
      <div className="container relative z-10">
        <div className="flex max-h-[60rem] min-h-svh items-center justify-center py-16 text-center md:py-24 lg:py-28">
          <div className="w-full max-w-lg">
            <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
              Bring your whole crew to the farm
            </h1>
            <p className="text-text-alternative md:text-md">
              Abhishta Agri Farm Stay welcomes corporate teams, school groups,
              and families for a day of honest work and good food. Book your
              group outing and let the land do the talking.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              <Button title="Book">Book</Button>
              <Button title="Explore" variant="secondary-alt">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
          className="size-full object-cover"
          alt="Relume placeholder image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
