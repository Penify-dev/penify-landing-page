import suman from "public/images/teams/suman.webp";
import sunil from "public/images/teams/sunil.webp";
import popin from "public/images/teams/popin.webp";
import mayur from "public/images/teams/mayur.webp";
import { StaticImageData } from "next/image";

interface TeamItemsType {
  img: StaticImageData;
  username: string;
  role: string;
  linkedIn: string;
}

type VendorsTypes = {
  vendor?: "github" | "bitbucket";
  title: string;
  href: string;
}[];

export const teamItems: TeamItemsType[] = [
  {
    img: suman,
    username: "Suman Saurabh",
    role: "Co-Founder, Developer",
    linkedIn: "ssumansaurabh/",
  },
  {
    img: sunil,
    username: "Sunil Agarwal",
    role: "Co-Founder, Developer",
    linkedIn: "sunilagwl5/",
  },
  {
    img: popin,
    username: "Popin Bose Roy",
    role: "Co-Founder",
    linkedIn: "popinboseroy/",
  },
  {
    img: mayur,
    username: "Mayur Dayal",
    role: "Frontend Engineer, Designer",
    linkedIn: "mayur-dayal/",
  },
];


export const vendors: VendorsTypes = [
  {
    vendor: "github",
    title: "Install on GitHub",
    href: "https://github.com/apps/penify-dev/installations/select_target",
  },
  {
    vendor: "bitbucket",
    title: "Install on Bitbucket",
    href: "https://production-gateway.snorkell.ai/api/bitbucket/installation-link",
  },
];

export const vendors2: VendorsTypes = [
  {
    vendor: "github",
    title: "GitHub",
    href: "https://github.com/apps/penify-dev/installations/select_target",
  },
  {
    vendor: "bitbucket",
    title: "Bitbucket",
    href: "https://production-gateway.snorkell.ai/api/bitbucket/installation-link",
  },
];