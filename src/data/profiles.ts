import type { Profile } from '../types/truths';

export const profiles: Profile[] = [
  {
    id: 1,
    name: "Alex",
    statements: [
      { text: "I've been skydiving three times", isLie: false },
      { text: "I speak fluent Mandarin", isLie: true },
      { text: "I've lived in 5 different countries", isLie: false },
    ],
  },
  {
    id: 2,
    name: "Jordan",
    statements: [
      { text: "I once met a famous celebrity at a coffee shop", isLie: false },
      { text: "I can play the violin and piano", isLie: false },
      { text: "I competed in the Olympics", isLie: true },
    ],
  },
  {
    id: 3,
    name: "Sam",
    statements: [
      { text: "I have a pet snake named Monty", isLie: true },
      { text: "I've run a marathon", isLie: false },
      { text: "I'm a certified scuba diver", isLie: false },
    ],
  },
  {
    id: 4,
    name: "Taylor",
    statements: [
      { text: "I've never broken a bone", isLie: false },
      { text: "I can juggle five balls at once", isLie: true },
      { text: "I've traveled to over 20 countries", isLie: false },
    ],
  },
  {
    id: 5,
    name: "Casey",
    statements: [
      { text: "I worked as a professional chef for 2 years", isLie: false },
      { text: "I've climbed Mount Kilimanjaro", isLie: true },
      { text: "I speak three languages fluently", isLie: false },
    ],
  },
  {
    id: 6,
    name: "Morgan",
    statements: [
      { text: "I've been on national television", isLie: false },
      { text: "I have a twin sibling", isLie: false },
      { text: "I've written a published novel", isLie: true },
    ],
  },
  {
    id: 7,
    name: "Riley",
    statements: [
      { text: "I can solve a Rubik's cube in under a minute", isLie: true },
      { text: "I've lived in the same house my entire life", isLie: false },
      { text: "I have a collection of over 500 comic books", isLie: false },
    ],
  },
  {
    id: 8,
    name: "Avery",
    statements: [
      { text: "I've volunteered in 3 different countries", isLie: false },
      { text: "I can do a backflip", isLie: false },
      { text: "I've met all five living US presidents", isLie: true },
    ],
  },
];
