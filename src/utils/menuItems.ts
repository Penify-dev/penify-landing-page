interface SubMenuTypes {
  title: string;
  href: string;
}

interface MenuTypes {
  title: string;
  href: string | null;
  scroller: boolean;
  children: null | SubMenuTypes[];
  id: string;
  type: 'link' | 'button';
  label: string;
}

export const menus: MenuTypes[] = [
  {
    title: "Features",
    href: "/features",
    scroller: true,
    children: null,
    id: "features",
    type: 'button',
    label: "Features",

  },
  {
    title: "Pricing",
    href: "/pricing",
    scroller: true,
    children: null,
    id: "pricing",
    type: 'button',
    label: "Pricing",
  },
  {
    title: "How it works?",
    href: "/how-it-works",
    scroller: true,
    children: null,
    id: "how-it-works",
    type: 'link',
    label: "How it works?",
  },
  {
    title: "Resources",
    href: null,
    scroller: false,
    id: "resources",
    type: 'button',
    label: "Resources",
    children: [
      {
        title: "Docs",
        href: "https://docs.penify.dev/",
      },
      {
        title: "Blogs",
        href: "https://blogs.penify.dev",
      },
    ],
  },
  {
    title: "About Us",
    href: "/about-us",
    scroller: false,
    children: null,
    id: "about-us",
    type: 'link',
    label: "About Us",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    scroller: false,
    children: null,
    id: "contact-us",
    type: 'link',
    label: "Contact Us",
  },
];
