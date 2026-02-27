export interface Product {
  id: string;
  categoryId: 'fritos' | 'congelados' | 'combos';
  subcategoryId: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'deditos-queso',
    categoryId: 'fritos',
    subcategoryId: 'deditos',
    name: 'Deditos de queso',
    description: '24 deliciosos deditos de queso fritos, ya listos para disfrutar',
    price: '$23.000',
    image: 'assets/products/dqueso.jpg'
  },
  {
    id: 'deditos-bocadillo',
    categoryId: 'fritos',
    subcategoryId: 'deditos',
    name: 'Deditos de bocadillo',
    description: '24 deliciosos deditos de bocadillo fritos, ya listos para disfrutar',
    price: '$23.000',
    image: 'assets/products/dbocadillo.jpg'
  },
  {
    id: 'deditos-combinados',
    categoryId: 'fritos',
    subcategoryId: 'deditos',
    name: 'Deditos combinados',
    description: '24 deliciosos deditos mitad queso y mitad bocadillo fritos, ya listos para disfrutar',
    price: '$23.000',
    image: 'assets/products/dcombinados.jpg'
  },
  {
    id: 'deditos-mixtos',
    categoryId: 'fritos',
    subcategoryId: 'deditos',
    name: 'Deditos mixtos',
    description: '12 deliciosos deditos de queso y 12 deliciosos deditos de bocadillo fritos, ya listos para disfrutar',
    price: '$23.000',
    image: 'assets/products/dmixtos.jpg'
  },
  {
    id: 'empanaditas-pollo',
    categoryId: 'fritos',
    subcategoryId: 'empanaditas',
    name: 'Empanaditas de pollo',
    description: '24 deliciosas empanaditas de pollo fritas, ya listas para disfrutar',
    price: '$23.000',
    image: 'assets/products/epollo.jpg'
  },
  {
    id: 'empanaditas-hawaianas',
    categoryId: 'fritos',
    subcategoryId: 'empanaditas',
    name: 'Empanaditas hawaianas',
    description: '24 deliciosas empanaditas hawaianas fritas, ya listas para disfrutar',
    price: '$23.000',
    image: 'assets/products/ehawaiana.jpg'
  },
  {
    id: 'empanaditas-rancheras',
    categoryId: 'fritos',
    subcategoryId: 'empanaditas',
    name: 'Empanaditas rancheras',
    description: '24 deliciosas empanaditas rancheras fritas, ya listas para disfrutar',
    price: '$23.000',
    image: 'assets/products/eranchera.jpg'
  },
  // Congelados - Deditos
  {
    id: 'congelados-deditos-queso',
    categoryId: 'congelados',
    subcategoryId: 'deditos',
    name: 'Deditos de queso',
    description: 'Bandeja con 24 deditos congelados full de queso',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  {
    id: 'congelados-deditos-bocadillo',
    categoryId: 'congelados',
    subcategoryId: 'deditos',
    name: 'Deditos de bocadillo',
    description: 'Bandeja con 24 deditos congelados full de bocadillo',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  {
    id: 'congelados-deditos-combinados',
    categoryId: 'congelados',
    subcategoryId: 'deditos',
    name: 'Deditos combinados',
    description: 'Bandeja con 24 deditos congelados full de queso y bocadillo',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  {
    id: 'congelados-deditos-mixtos',
    categoryId: 'congelados',
    subcategoryId: 'deditos',
    name: 'Deditos mixtos',
    description: 'Bandeja con 12 deditos congelados de queso y 12 deditos congelados de bocadillo',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  // Congelados - Empanaditas
  {
    id: 'congelados-empanaditas-pollo',
    categoryId: 'congelados',
    subcategoryId: 'empanaditas',
    name: 'Empanaditas de pollo',
    description: 'Bandeja con 24 empanaditas congeladas full de pollo',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  {
    id: 'congelados-empanaditas-hawaianas',
    categoryId: 'congelados',
    subcategoryId: 'empanaditas',
    name: 'Empanaditas hawaianas',
    description: 'Bandeja con 24 empanaditas congeladas hawaianas',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  {
    id: 'congelados-empanaditas-rancheras',
    categoryId: 'congelados',
    subcategoryId: 'empanaditas',
    name: 'Empanaditas rancheras',
    description: 'Bandeja con 24 empanaditas congeladas rancheras',
    price: '$20.000',
    image: 'assets/products/congelados.PNG'
  },
  // Combos - Fritos
  {
    id: 'combo-fritos-60',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 60',
    description: '30 deditos fritos variados y 30 empanaditas fritas variadas',
    price: '$52.000',
    image: 'assets/products/cfrito.jpg'
  },
  {
    id: 'combo-fritos-90',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 90',
    description: '45 deditos fritos variados y 45 empanaditas fritas variadas',
    price: '$78.000',
    image: 'assets/products/cfrito.jpg'
  },
  {
    id: 'combo-fritos-120',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 120',
    description: '60 deditos fritos variados y 60 empanaditas fritas variadas',
    price: '$100.000',
    image: 'assets/products/cfrito.jpg'
  },
  {
    id: 'combo-fritos-150',
    categoryId: 'combos',
    subcategoryId: 'fritos',
    name: 'Combo de 150',
    description: '75 deditos fritos variados y 75 empanaditas fritas variadas',
    price: '$120.000',
    image: 'assets/products/cfrito.jpg'
  },
  // Combos - Congelados
  {
    id: 'combo-congelados-60',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 60',
    description: '30 deditos congelados variados y 30 empanaditas congeladas variadas',
    price: '$46.000',
    image: 'assets/products/cfrito.jpg'
  },
  {
    id: 'combo-congelados-90',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 90',
    description: '45 deditos congelados variados y 45 empanaditas congeladas variadas',
    price: '$68.000',
    image: 'assets/products/cfrito.jpg'
  },
  {
    id: 'combo-congelados-120',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 120',
    description: '60 deditos congelados variados y 60 empanaditas congeladas variadas',
    price: '$87.000',
    image: 'assets/products/cfrito.jpg'
  },
  {
    id: 'combo-congelados-150',
    categoryId: 'combos',
    subcategoryId: 'congelados',
    name: 'Combo de 150',
    description: '75 deditos congelados variados y 75 empanaditas congeladas variadas',
    price: '$105.000',
    image: 'assets/products/cfrito.jpg'
  }
];

export const CATEGORY_NAMES: Record<string, string> = {
  fritos: 'Fritos',
  congelados: 'Congelados',
  combos: 'Combos'
};

export interface Subcategory {
  id: string;
  title: string;
}

export const SUBCATEGORIES_BY_CATEGORY: Record<string, Subcategory[]> = {
  fritos: [
    { id: 'deditos', title: 'Deditos' },
    { id: 'empanaditas', title: 'Empanaditas' }
  ],
  congelados: [
    { id: 'deditos', title: 'Deditos' },
    { id: 'empanaditas', title: 'Empanaditas' }
  ],
  combos: [
    { id: 'fritos', title: 'Fritos' },
    { id: 'congelados', title: 'Congelados' }
  ]
};
