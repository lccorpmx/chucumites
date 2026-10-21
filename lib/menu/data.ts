import aguachileImage from "@/assets/dishes/aguachile.webp";
import fileteImage from "@/assets/dishes/filete.webp";
import langostinosImage from "@/assets/dishes/langostinos.webp";

import type { Category, Dish, Menu } from "./types";

const categories: Category[] = [
  { id: "favoritos", label: "Favoritos", icon: "shrimp" },
  { id: "filetes", label: "Filetes", icon: "fish" },
  { id: "mariscos", label: "Mariscos", icon: "shell" },
  { id: "tacos", label: "Tacos", icon: "taco" },
  { id: "bebidas", label: "Bebidas", icon: "drink" },
];

const dishes: Dish[] = [
  {
    id: "filete-empanizado",
    name: "Filete empanizado",
    tagline: "Crujiente y recién preparado",
    description:
      "Filete de pescado empanizado al momento, con papas a la francesa, ensalada fresca, limones y nuestra salsa de la casa.",
    price: 189,
    categories: ["favoritos", "filetes"],
    feature: {
      image: fileteImage,
      width: 0.84,
      titleLines: ["Filete", "empanizado"],
      label: { top: 25, bottom: 21, left: 62 },
    },
  },
  {
    id: "langostinos-mojo-de-ajo",
    name: "Langostinos al mojo de ajo",
    tagline: "Todo el sabor del mar",
    description:
      "Langostinos a la plancha bañados en mantequilla con ajo dorado, acompañados de arroz blanco, ensalada y limón.",
    price: 329,
    categories: ["favoritos", "mariscos"],
    tags: ["para-compartir"],
    feature: {
      image: langostinosImage,
      width: 0.835,
      titleLines: ["Langostinos", "al mojo de ajo"],
      label: { top: 31, bottom: 16, left: 62.5 },
    },
  },
  {
    id: "aguachile-camaron",
    name: "Aguachile de camarón",
    description:
      "Camarón fresco curado en limón con chile serrano, pepino, cebolla morada y aguacate. Servido bien frío.",
    price: 229,
    categories: ["favoritos", "mariscos"],
    tags: ["picante"],
    feature: {
      image: aguachileImage,
      width: 0.74,
      titleLines: ["Aguachile", "de camarón"],
      label: { top: 40, bottom: 13, left: 65.5 },
    },
  },
  {
    id: "filete-a-la-diabla",
    name: "Filete a la diabla",
    description: "Filete de pescado en salsa diabla de chiles secos, con arroz y ensalada.",
    price: 199,
    categories: ["filetes"],
    tags: ["picante"],
  },
  {
    id: "filete-al-mojo",
    name: "Filete al mojo de ajo",
    description: "Filete a la plancha con ajo dorado en mantequilla, arroz y verduras.",
    price: 195,
    categories: ["filetes"],
  },
  {
    id: "pescado-zarandeado",
    name: "Pescado zarandeado",
    description: "Pescado entero adobado y asado al carbón, con tortillas, cebolla y salsa.",
    price: 289,
    categories: ["filetes"],
    tags: ["para-compartir"],
  },
  {
    id: "camarones-diabla",
    name: "Camarones a la diabla",
    description: "Camarones salteados en salsa diabla, con arroz, ensalada y tortillas.",
    price: 239,
    categories: ["mariscos"],
    tags: ["picante"],
  },
  {
    id: "coctel-camaron",
    name: "Coctel de camarón",
    description: "Camarón en salsa coctelera con aguacate, cebolla, cilantro y galletas saladas.",
    price: 189,
    categories: ["mariscos"],
  },
  {
    id: "tostada-ceviche",
    name: "Tostada de ceviche",
    description: "Ceviche de pescado con pepino, jitomate y cebolla sobre tostada crujiente.",
    price: 69,
    categories: ["mariscos"],
  },
  {
    id: "tostada-mixta",
    name: "Tostada mixta",
    description: "Camarón, pulpo y pescado curados en limón con aguacate y salsa negra.",
    price: 95,
    categories: ["mariscos"],
    tags: ["nuevo"],
  },
  {
    id: "taco-gobernador",
    name: "Taco gobernador",
    description: "Camarón guisado con queso gratinado, chile poblano y cebolla en tortilla de maíz.",
    price: 59,
    categories: ["tacos"],
  },
  {
    id: "taco-pescado",
    name: "Taco de pescado capeado",
    description: "Pescado capeado con col morada, crema de chipotle y pico de gallo.",
    price: 49,
    categories: ["tacos"],
  },
  {
    id: "taco-camaron",
    name: "Taco de camarón",
    description: "Camarón capeado con aderezo de la casa, col y salsa de mango habanero.",
    price: 55,
    categories: ["tacos"],
    tags: ["picante"],
  },
  {
    id: "taco-marlin",
    name: "Taco de marlin",
    description: "Marlin ahumado guisado con jitomate y aceituna, con queso fundido.",
    price: 55,
    categories: ["tacos"],
  },
  {
    id: "michelada",
    name: "Michelada",
    description: "Cerveza a elegir con limón, salsas y escarchado de chile.",
    price: 85,
    categories: ["bebidas"],
  },
  {
    id: "clamato-preparado",
    name: "Clamato preparado",
    description: "Clamato con camarón, pepino, salsas y limón. Con o sin cerveza.",
    price: 110,
    categories: ["bebidas"],
    tags: ["nuevo"],
  },
  {
    id: "agua-fresca",
    name: "Agua fresca",
    description: "Jamaica u horchata, preparada en casa. Jarra de 1 litro.",
    price: 45,
    categories: ["bebidas"],
  },
  {
    id: "cerveza",
    name: "Cerveza nacional",
    description: "Corona, Victoria, Pacífico o Modelo, bien helada.",
    price: 45,
    categories: ["bebidas"],
  },
  {
    id: "refresco",
    name: "Refresco",
    description: "Refrescos de vidrio de 355 ml.",
    price: 35,
    categories: ["bebidas"],
  },
];

/**
 * Single source for the menu. Swap the body for a CMS/API call when the
 * restaurant manages its menu elsewhere; callers already treat it as async.
 */
export async function getMenu(): Promise<Menu> {
  return { categories, dishes };
}
