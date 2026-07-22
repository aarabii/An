interface Name {
  full: string;
  first: string;
  last: string;
}

interface Work {
  title: string;
  company: string;
}

interface Location {
  city: string;
  state: string;
}

interface Education {
  uni: string;
  degree: string;
  major: string;
  batch: string;
  location: Location;
}

interface DOB {
  dd: number;
  mm: number;
  yyyy: number;
}

interface Titles {
  constant_word: string;
  rotating_words: string[];
}

interface Profile {
  name: Name;
  email: string;
  work: Work;
  education: Education;
  DOB: DOB;
  curr_location: Location;
  about: string[];
  hero_titles: Titles;
  quote: string;
}

export const profile: Profile = {
  name: {
    full: "Aarab Nishchal",
    first: "Aarab",
    last: "Nishchal",
  },

  email: "aarab.nishchal@gmail.com",

  work: {
    title: "AI Engineer Intern",
    company: "Ascend HSI",
  },

  education: {
    uni: "Kalinga Institute of Industrial Technology - KIIT",
    degree: "B. Tech",
    major: "Computer Science and Engineering",
    batch: "2022 - 2026",
    location: {
      city: "Bhubaneswar",
      state: "Odisha",
    },
  },

  DOB: {
    dd: 8,
    mm: 9,
    yyyy: 2004,
  },

  curr_location: {
    city: "Katihar",
    state: "Bihar",
  },

  about: [
    "I build things, break things, and occasionally fix things that weren't broken in the first place. Somewhere between bad ideas and too much curiosity, good software tends to happen.",
    "I have a dangerous amount of confidence for someone whose first solution is usually 'fuck it, let's see what happens.' Surprisingly, this has worked more often than it should.",
    "I don't have everything figured out, and that's kind of the point. I chase whatever looks interesting, disappear down unnecessary rabbit holes, and somehow come back with either something cool or a very specific lesson on what never to do again.",
    "Still learning. Still shipping. Still pretending console.log was part of the debugging strategy all along.",
  ],

  hero_titles: {
    constant_word: "Stay",
    rotating_words: [
      "Goated 🐐",
      "Unbothered",
      "Unmatched",
      "Unhinged",
      "Unfuckwithable",
    ],
  },

  quote: "Stay GOATED 🐐",
};
