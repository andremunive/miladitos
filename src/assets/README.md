# Assets — Miladitos

Estructura de carpetas para imágenes y recursos estáticos.

## Estructura

| Carpeta        | Uso |
|----------------|-----|
| **backgrounds/** | Fondos de pantalla (home, menú, checkout). Ej: `home-bg.jpg`, `menu-bg.png`. |
| **logo/**        | Logo del negocio (principal, variantes para claro/oscuro). Ej: `logo.png`, `logo.svg`. |
| **products/**    | Fotos de productos del menú (deditos, empanaditas, combos). Ej: `deditos-queso.jpg`, `empanaditas-jamon.png`. |

## Uso en la app

Rutas desde el root de la app (en build se sirven desde `/assets/`):

- Fondo: `assets/backgrounds/home-bg.jpg`
- Logo: `assets/logo/logo.png`
- Producto: `assets/products/deditos-queso.jpg`

Convención sugerida para productos: `{producto}-{sabor}.{ext}` o `{categoria}/{producto}-{sabor}.{ext}` si se quieren subcarpetas por categoría (fritos, congelados, combos).
