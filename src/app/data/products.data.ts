export interface ProductSize {
  id: string;
  label: string;
  detail: string;
  price: string;
}

export interface Product {
  id: string;
  categoryId: 'deditos' | 'empanaditas' | 'combos';
  subcategoryId: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  sizes?: ProductSize[];
}

export interface Subcategory {
  id: string;
  title: string;
  subtitle: string;
}

// — Tamaños reutilizables por preparación y tipo de producto —

const DEDITOS_FRITOS_SIZES: ProductSize[] = [
  {
    id: 'grande',
    label: 'Bandeja grande',
    detail: '24 deditos grandes',
    price: '$28.000',
  },
  {
    id: 'mediana',
    label: 'Bandeja mediana',
    detail: '24 deditos medianos',
    price: '$19.000',
  },
];

const DEDITOS_CONGELADOS_SIZES: ProductSize[] = [
  {
    id: 'grande',
    label: 'Bandeja grande',
    detail: '24 deditos grandes',
    price: '$25.000',
  },
  {
    id: 'mediana',
    label: 'Bandeja mediana',
    detail: '24 deditos medianos',
    price: '$17.000',
  },
];

const EMPANADITAS_FRITOS_SIZES: ProductSize[] = [
  {
    id: 'grande',
    label: 'Bandeja grande',
    detail: '24 empanaditas',
    price: '$28.000',
  },
  {
    id: 'mediana',
    label: 'Bandeja mediana',
    detail: '12 empanaditas',
    price: '$19.000',
  },
];

const EMPANADITAS_CONGELADOS_SIZES: ProductSize[] = [
  {
    id: 'grande',
    label: 'Bandeja grande',
    detail: '24 empanaditas',
    price: '$25.000',
  },
  {
    id: 'mediana',
    label: 'Bandeja mediana',
    detail: '12 empanaditas',
    price: '$17.000',
  },
];

// — Productos —

export const PRODUCTS: Product[] = [
  // ══════════════════════════════════════
  // DEDITOS — Fritos
  // ══════════════════════════════════════
  {
    id: 'deditos-queso-fritos',
    categoryId: 'deditos',
    subcategoryId: 'fritos',
    name: 'Deditos de queso',
    description: 'Rellenos de queso derretido',
    image: 'assets/products/dqueso.jpg',
    sizes: DEDITOS_FRITOS_SIZES,
  },
  {
    id: 'deditos-bocadillo-fritos',
    categoryId: 'deditos',
    subcategoryId: 'fritos',
    name: 'Deditos de bocadillo',
    description: 'Rellenos de dulce bocadillo',
    image: 'assets/products/dbocadillo.jpg',
    sizes: DEDITOS_FRITOS_SIZES,
  },
  {
    id: 'deditos-mixtos-fritos',
    categoryId: 'deditos',
    subcategoryId: 'fritos',
    name: 'Deditos mixtos',
    description: '12 de queso y 12 de bocadillo',
    image: 'assets/products/dmixtos.jpg',
    sizes: DEDITOS_FRITOS_SIZES,
  },
  {
    id: 'deditos-combinados-fritos',
    categoryId: 'deditos',
    subcategoryId: 'fritos',
    name: 'Deditos combinados',
    description: 'Rellenos de queso y bocadillo',
    image: 'assets/products/dcombinados.jpg',
    sizes: DEDITOS_FRITOS_SIZES,
  },

  // ══════════════════════════════════════
  // DEDITOS — Congelados
  // ══════════════════════════════════════
  {
    id: 'deditos-queso-congelados',
    categoryId: 'deditos',
    subcategoryId: 'congelados',
    name: 'Deditos de queso',
    description: 'Rellenos de queso derretido',
    image: 'assets/products/dqueso.jpg',
    sizes: DEDITOS_CONGELADOS_SIZES,
  },
  {
    id: 'deditos-bocadillo-congelados',
    categoryId: 'deditos',
    subcategoryId: 'congelados',
    name: 'Deditos de bocadillo',
    description: 'Rellenos de dulce bocadillo',
    image: 'assets/products/dbocadillo.jpg',
    sizes: DEDITOS_CONGELADOS_SIZES,
  },
  {
    id: 'deditos-mixtos-congelados',
    categoryId: 'deditos',
    subcategoryId: 'congelados',
    name: 'Deditos mixtos',
    description: '12 de queso y 12 de bocadillo',
    image: 'assets/products/dmixtos.jpg',
    sizes: DEDITOS_CONGELADOS_SIZES,
  },
  {
    id: 'deditos-combinados-congelados',
    categoryId: 'deditos',
    subcategoryId: 'congelados',
    name: 'Deditos combinados',
    description: 'Rellenos de queso y bocadillo',
    image: 'assets/products/dcombinados.jpg',
    sizes: DEDITOS_CONGELADOS_SIZES,
  },

  // ══════════════════════════════════════
  // EMPANADITAS — Fritos
  // ══════════════════════════════════════
  {
    id: 'empanaditas-pollo-fritos',
    categoryId: 'empanaditas',
    subcategoryId: 'fritos',
    name: 'Empanaditas de pollo',
    description: 'Rellenas de pollo sazonado',
    image: 'assets/products/epollo.jpg',
    sizes: EMPANADITAS_FRITOS_SIZES,
  },
  {
    id: 'empanaditas-hawaianas-fritos',
    categoryId: 'empanaditas',
    subcategoryId: 'fritos',
    name: 'Empanaditas hawaianas',
    description: 'Con pollo, piña y queso',
    image: 'assets/products/ehawaiana.jpg',
    sizes: EMPANADITAS_FRITOS_SIZES,
  },
  {
    id: 'empanaditas-rancheras-fritos',
    categoryId: 'empanaditas',
    subcategoryId: 'fritos',
    name: 'Empanaditas rancheras',
    description: 'Con queso y salchicha ranchera',
    image: 'assets/products/eranchera.jpg',
    sizes: EMPANADITAS_FRITOS_SIZES,
  },

  // ══════════════════════════════════════
  // EMPANADITAS — Congelados
  // ══════════════════════════════════════
  {
    id: 'empanaditas-pollo-congelados',
    categoryId: 'empanaditas',
    subcategoryId: 'congelados',
    name: 'Empanaditas de pollo',
    description: 'Rellenas de pollo sazonado',
    image: 'assets/products/epollo.jpg',
    sizes: EMPANADITAS_CONGELADOS_SIZES,
  },
  {
    id: 'empanaditas-hawaianas-congelados',
    categoryId: 'empanaditas',
    subcategoryId: 'congelados',
    name: 'Empanaditas hawaianas',
    description: 'Con pollo, piña y queso',
    image: 'assets/products/ehawaiana.jpg',
    sizes: EMPANADITAS_CONGELADOS_SIZES,
  },
  {
    id: 'empanaditas-rancheras-congelados',
    categoryId: 'empanaditas',
    subcategoryId: 'congelados',
    name: 'Empanaditas rancheras',
    description: 'Con queso y salchicha ranchera',
    image: 'assets/products/eranchera.jpg',
    sizes: EMPANADITAS_CONGELADOS_SIZES,
  },

  // ══════════════════════════════════════
  // COMBOS — Fritos
  // ══════════════════════════════════════
  {
    id: 'combo-fritos-60',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 60',
    description: '30 deditos fritos variados y 30 empanaditas fritas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$58.000',
  },
  {
    id: 'combo-fritos-90',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 90',
    description: '45 deditos fritos variados y 45 empanaditas fritas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$87.000',
  },
  {
    id: 'combo-fritos-120',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 120',
    description: '60 deditos fritos variados y 60 empanaditas fritas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$112.000',
  },
  {
    id: 'combo-fritos-150',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 150',
    description: '75 deditos fritos variados y 75 empanaditas fritas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$135.000',
  },

  // ══════════════════════════════════════
  // COMBOS — Congelados
  // ══════════════════════════════════════
  {
    id: 'combo-congelados-60',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 60',
    description:
      '30 deditos congelados variados y 30 empanaditas congeladas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$52.000',
  },
  {
    id: 'combo-congelados-90',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 90',
    description:
      '45 deditos congelados variados y 45 empanaditas congeladas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$78.000',
  },
  {
    id: 'combo-congelados-120',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 120',
    description:
      '60 deditos congelados variados y 60 empanaditas congeladas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$100.000',
  },
  {
    id: 'combo-congelados-150',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 150',
    description:
      '75 deditos congelados variados y 75 empanaditas congeladas variadas',
    image: 'assets/products/cfrito.jpg',
    price: '$120.000',
  },
];

// — Mapeo de categorías —

export const CATEGORY_NAMES: Record<string, string> = {
  deditos: 'Deditos',
  empanaditas: 'Empanaditas',
  combos: 'Combos',
};

export const SUBCATEGORIES_BY_CATEGORY: Record<string, Subcategory[]> = {
  deditos: [
    { id: 'fritos', title: 'Fritos', subtitle: 'Listos para consumir' },
    {
      id: 'congelados',
      title: 'Congelados',
      subtitle: 'Para preparar en casa',
    },
  ],
  empanaditas: [
    { id: 'fritos', title: 'Fritos', subtitle: 'Listos para consumir' },
    {
      id: 'congelados',
      title: 'Congelados',
      subtitle: 'Para preparar en casa',
    },
  ],
  combos: [
    { id: 'fritos', title: 'Fritos', subtitle: 'Listos para consumir' },
    {
      id: 'congelados',
      title: 'Congelados',
      subtitle: 'Para preparar en casa',
    },
  ],
};
