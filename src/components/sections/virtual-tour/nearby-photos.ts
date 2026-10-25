import type { StaticImageData } from "next/image";
import markonahalli from "@public/images/nearby/markonahalli-dam.jpg";
import yediyur from "@public/images/nearby/yediyur-temple.jpg";
import adichunchanagiri from "@public/images/nearby/adichunchanagiri-mutt.jpg";
import shravanabelagola from "@public/images/nearby/shravanabelagola.jpg";

/**
 * Real photos of the nearby places, from Wikimedia Commons (resized to 900 px),
 * shown on the place card in "Around the farm" with their credit. Places with
 * no good free photo (the smaller hills and temples, Kalur weaving) keep their
 * icon. Keyed by the place's name in NEARBY.
 */
export type NearbyPhoto = {
  image: StaticImageData;
  alt: string;
  /** CSS object-position, to keep the subject in the short strip */
  focus?: string;
  credit: string;
  license: string;
  source: string;
};

export const NEARBY_PHOTOS: Record<string, NearbyPhoto> = {
  "Markonahalli Dam": {
    image: markonahalli,
    alt: "The Markonahalli reservoir, wide and still, with the dam wall running along its left edge",
    focus: "50% 60%",
    credit: "Mike Prince",
    license: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Markonahalli_Reservoir_(50935105042).jpg",
  },
  "Yediyur Siddalingeshwara Temple": {
    image: yediyur,
    alt: "The tall painted gopuram of the Yediyur Siddalingeshwara temple against a blue sky",
    focus: "50% 35%",
    credit: "Akshatha Inamdar",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Yediyuru_siddhalingeshwara_swamy_temple_34.jpg",
  },
  "Adichunchanagiri Mutt": {
    image: adichunchanagiri,
    alt: "Adichunchanagiri: a statue in a garden circle in front of the temple and its white gopuram",
    focus: "50% 45%",
    credit: "Prof tpms",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Adichunchanagiri.3.jpg",
  },
  Shravanabelagola: {
    image: shravanabelagola,
    alt: "Vindhyagiri hill at Shravanabelagola seen from Chandragiri, with a big boulder in front",
    focus: "50% 55%",
    credit: "Vinayaraj",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Views_at_Chandragiri_hills,_Shravanabelagola_(10).jpg",
  },
};
