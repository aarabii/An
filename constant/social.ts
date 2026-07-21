import type { IconType } from "react-icons";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaTelegram,
  FaXTwitter,
} from "react-icons/fa6";

import { SiLeetcode } from "react-icons/si";

interface Social {
  name: string;
  handle: string;
  url: string;
  icon: IconType;
}

export const socials = [
  {
    name: "GitHub",
    handle: "aarabii",
    url: "https://github.com/aarabii",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    handle: "aarab-nishchal",
    url: "https://linkedin.com/in/aarab-nishchal",
    icon: FaLinkedin,
  },
  {
    name: "Instagram",
    handle: "aarab.ii",
    url: "https://instagram.com/aarab.ii",
    icon: FaInstagram,
  },
  {
    name: "X",
    handle: "aarab_ii",
    url: "https://x.com/aarab_ii",
    icon: FaXTwitter,
  },
  {
    name: "LeetCode",
    handle: "aarabii",
    url: "https://leetcode.com/u/aarabii",
    icon: SiLeetcode,
  },
  {
    name: "Facebook",
    handle: "zzcwc",
    url: "https://facebook.com/zzcwc",
    icon: FaFacebook,
  },
  {
    name: "Snapchat",
    handle: "aarab.ii",
    url: "https://snapchat.com/add/aarab.ii",
    icon: FaSnapchat,
  },
  {
    name: "Telegram",
    handle: "aarab_ii",
    url: "https://t.me/aarab_ii",
    icon: FaTelegram,
  },
] satisfies Social[];
