import {
  Icon,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";

interface SubItemsTypes {
  title: string;
  href: string;
  mode: string | null;
}

interface FooterItemsTypes {
  title: string;
  children: SubItemsTypes[];
}

interface SocialIconsTypes {
  title: string;
  icon: React.ReactElement<Icon>;
  href: string;
}

export const footerItems: FooterItemsTypes[] = [
  {
    title: "Resources",
    children: [
      {
        title: "Docs",
        href: "https://docs.penify.dev/",
        mode: "external",
      },
      {
        title: "Blogs",
        href: "https://blogs.penify.dev",
        mode: "external",
      },
    ],
  },
  {
    title: "Quick Links",
    children: [
      {
        title: "About Us",
        href: "/about-us",
        mode: null,
      },
      {
        title: "SignIn",
        href: "https://dashboard.penify.dev/auth/login",
        mode: "external",
      },
      {
        title: "Register",
        href: "https://dashboard.penify.dev/auth/sign-up",
        mode: "external",
      },
    ],
  },
  {
    title: "Support",
    children: [
      {
        title: "Help center",
        href: "/contact-us",
        mode: null,
      },
      {
        title: "Terms & Conditions",
        href: "https://production-gateway.snorkell.ai/api/toc",
        mode: "external",
      },
      {
        title: "Privacy Policy",
        href: "https://production-gateway.snorkell.ai/api/privacy-policy",
        mode: "external",
      },
      {
        title: "Pricing Policy",
        href: "https://production-gateway.snorkell.ai/api/toc#fees-and-pricing",
        mode: "external",
      },
      {
        title: "Refund & Cancellation",
        href: "https://production-gateway.snorkell.ai/api/refund-policy",
        mode: "external",
      },
    ],
  },
];

export const socialIcons: SocialIconsTypes[] = [
  {
    title: "GitHub",
    icon: <IconBrandGithub width={24} />,
    href: "https://github.com/Penify-dev",
  },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin width={24} />,
    href: "https://www.linkedin.com/company/penify-dev/",
  },
  {
    title: "Twitter",
    icon: <IconBrandTwitter width={24} />,
    href: "https://twitter.com/Snorkell_ai",
  },
  {
    title: "Youtube",
    icon: <IconBrandYoutube width={24} />,
    href: "https://www.youtube.com/@penify-dev",
  },
  {
    title: "Reddit",
    icon: <IconBrandReddit width={24} />,
    href: "https://www.reddit.com/user/snorkell_/",
  },
];
