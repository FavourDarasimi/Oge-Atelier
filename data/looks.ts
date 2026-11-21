export type LookColor = [name: string, hex: string];

export type Look = {
  name: string;
  category: string;
  tone: string;
  textColor: string;
  image: string;
  description: string;
  fabric: string;
  colors: LookColor[];
  turnaround: string;
  price: string;
};

export const LOOKS: Look[] = [
  {
    name: "Terracotta satin midi",
    category: "Women · Traditional",
    tone: "#C0785A",
    textColor: "#181A17",
    image: "/lookbook/terracotta-satin.jpeg",
    description:
      "Terracotta satin midi dress with draped waist detail, hand-finished in Lagos.",
    fabric: "Terracotta satin",
    colors: [
      ["Terracotta", "#C0785A"],
      ["Cream", "#F6F2E8"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
  {
    name: "Ivory pearl-back bridal gown",
    category: "Bridal",
    tone: "#EDE3D2",
    textColor: "#181A17",
    image: "/lookbook/bridal-pearl-train.jpeg",
    description:
      "Ivory satin bridal gown with pearl-buttoned back, floor-length train, and matching veil.",
    fabric: "Silk satin over crepe",
    colors: [
      ["Warm ivory", "#EDE3D2"],
      ["Ivory", "#F6F2E8"],
    ],
    turnaround: "6–8 weeks",
    price: "From ₦—",
  },
  {
    name: "Kids' Ankara pair",
    category: "Kids",
    tone: "#B4643F",
    textColor: "#F6F2E8",
    image: "/lookbook/kids-ankara.jpeg",
    description:
      "Matching rust and green Ankara dress and shirt set for children, cotton wax print.",
    fabric: "Wax print cotton",
    colors: [
      ["Rust", "#B4643F"],
      ["Green", "#1F3D33"],
    ],
    turnaround: "Ships in 3 working days",
    price: "From ₦—",
  },
  {
    name: "Forest kaftan set",
    category: "Men · Traditional",
    tone: "#1F3D33",
    textColor: "#F6F2E8",
    image: "/lookbook/kaftan-forest.jpeg",
    description:
      "Tailored forest-green kaftan and trouser set, pintucked placket, worn full for traditional occasions.",
    fabric: "Silk kaftan blend",
    colors: [
      ["Forest", "#1F3D33"],
      ["Ivory", "#F6F2E8"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
  {
    name: "Cream Aso Oke with Gele",
    category: "Women · Traditional",
    tone: "#E6DFCF",
    textColor: "#181A17",
    image: "/lookbook/aso-oke-gele.jpeg",
    description:
      "Handwoven cream Aso Oke iro and buba set with a matching Gele head wrap, woven with subtle gold pinstripes.",
    fabric: "Handwoven Aso Oke",
    colors: [
      ["Oatmeal", "#E6DFCF"],
      ["Rust", "#B4643F"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
  {
    name: "Black three-piece suit",
    category: "Men · Tailoring",
    tone: "#181A17",
    textColor: "#F6F2E8",
    image: "/lookbook/three-piece-black.jpeg",
    description:
      "Single-breasted three-piece wool suit with matching trousers and waistcoat, ivory dress shirt.",
    fabric: "Lightweight wool blend",
    colors: [
      ["Charcoal", "#181A17"],
      ["White", "#F6F2E8"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
  {
    name: "Forest corset gown",
    category: "Women · Evening",
    tone: "#1F3D33",
    textColor: "#F6F2E8",
    image: "/lookbook/corset-gown.jpeg",
    description:
      "Forest satin corset bodice with square neck and full skirt, gathered at back, floor-length.",
    fabric: "Satin",
    colors: [
      ["Forest", "#1F3D33"],
      ["Ivory", "#F6F2E8"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
  {
    name: "Girls' cream dress with clay sash",
    category: "Kids",
    tone: "#E8DCC6",
    textColor: "#181A17",
    image: "/lookbook/girls-cream-dress.jpeg",
    description:
      "Cream tiered dress with a clay-coloured sash, ruffled hem, short sleeves, knee-length.",
    fabric: "Linen blend",
    colors: [
      ["Cream", "#E8DCC6"],
      ["Clay", "#B4643F"],
    ],
    turnaround: "Ships in 3 working days",
    price: "From ₦—",
  },
  {
    name: "Emerald cape gown",
    category: "Women · Evening",
    tone: "#1F3D33",
    textColor: "#F6F2E8",
    image: "/lookbook/cape-gown.jpeg",
    description:
      "Emerald green gown with draped cape sleeves, floor-length, fitted bodice, side zip.",
    fabric: "Satin",
    colors: [
      ["Emerald", "#1F3D33"],
      ["Ivory", "#F6F2E8"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
  {
    name: "Ivory kaftan with embroidery",
    category: "Men · Traditional",
    tone: "#EDE3D2",
    textColor: "#181A17",
    image: "/lookbook/kaftan-ivory.jpeg",
    description:
      "Ivory kaftan with tonal chest embroidery and matching wide-leg trousers, Mandarin collar.",
    fabric: "Silk kaftan blend",
    colors: [
      ["Ivory", "#EDE3D2"],
      ["Gold", "#C0785A"],
    ],
    turnaround: "3–4 weeks",
    price: "From ₦—",
  },
];
