"use client";

import {
  Button,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@relume_io/relume-ui";
import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";

export function Contact12() {
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-8 max-w-lg md:mb-12">
          <p className="mb-3 font-semibold md:mb-4">Enquire</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Ask us
          </h2>
          <p className="md:text-md">Send a note. We answer fast.</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[1fr_1fr] md:gap-y-16 lg:gap-x-20">
          <form className="grid grid-cols-1 grid-rows-[auto_auto] gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="grid w-full items-center">
                <Label htmlFor="firstName" className="mb-2">
                  First name
                </Label>
                <Input type="text" id="firstName" />
              </div>
              <div className="grid w-full items-center">
                <Label htmlFor="lastName" className="mb-2">
                  Last name
                </Label>
                <Input type="text" id="lastName" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid w-full items-center">
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input type="email" id="email" />
              </div>
              <div className="grid w-full items-center">
                <Label htmlFor="phone" className="mb-2">
                  Phone number
                </Label>
                <Input type="text" id="phone" />
              </div>
            </div>
            <div className="grid w-full items-center">
              <Label className="mb-2">Choose a topic</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select one..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-choice">First Choice</SelectItem>
                  <SelectItem value="second-choice">Second Choice</SelectItem>
                  <SelectItem value="third-choice">Third Choice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center py-3 md:py-4">
              <Label className="mb-3 md:mb-4">Which best describes you?</Label>
              <RadioGroup className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="first-choice" id="first-choice" />
                  <Label htmlFor="first-choice">Traveler</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="second-choice" id="second-choice" />
                  <Label htmlFor="second-choice">Family</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="third-choice" id="third-choice" />
                  <Label htmlFor="third-choice">Group</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fourth-choice" id="fourth-choice" />
                  <Label htmlFor="fourth-choice">Company</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fifth-choice" id="fifth-choice" />
                  <Label htmlFor="fifth-choice">Neighbor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid w-full items-center">
              <Label htmlFor="message" className="mb-2">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message..."
                className="min-h-[12.25rem] overflow-auto"
              />
            </div>
            <div className="mb-3 flex items-center space-x-2 text-sm md:mb-4">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="cursor-pointer">
                I accept the Terms
              </Label>
            </div>
            <div>
              <Button title="Submit">Submit</Button>
            </div>
          </form>
          <div className="mb-auto grid gap-x-4 gap-y-10 py-2 sm:grid-cols-2">
            <div>
              <div className="mb-3 md:mb-4">
                <BiEnvelope className="size-8" />
              </div>
              <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Email
              </h3>
              <p className="mb-2">Write to us anytime</p>
              <a className="underline" href="#">
                hello@relume.io
              </a>
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <BiPhone className="size-8" />
              </div>
              <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Phone
              </h3>
              <p className="mb-2">Call or WhatsApp us</p>
              <a className="underline" href="#">
                +91 9945 7949 25
              </a>
            </div>
            <div>
              <div className="mb-3 md:mb-4">
                <BiMap className="size-8" />
              </div>
              <h3 className="mb-2 text-md font-bold leading-[1.4] md:text-xl">
                Office
              </h3>
              <p className="mb-2">
                Jiddigere Village, Kunigal Taluk, Tumkur, Karnataka 572134
              </p>
              <div className="mt-5 md:mt-6">
                <Button
                  title="Get Directions"
                  variant="link"
                  size="link"
                  iconRight={<RxChevronRight />}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
