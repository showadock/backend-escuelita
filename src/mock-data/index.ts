import crypto from "crypto";

/** Hardcoded post for now, will use a orm and DB in a future */
const allProduct = [
  {
    id: crypto.randomUUID(),
    title: "Explorando las maravillas del mundo",
    author: "Alice Johnson",
    date: "2023-09-11",
    category: "Viajes",
    content:
      "Hoy tuve la increíble oportunidad de explorar las pirámides de Egipto. Estas antiguas estructuras son verdaderamente asombrosas y llenas de historia.",
  },
  {
    id: crypto.randomUUID(),
    title: "Receta del día: Tacos de pescado",
    author: "Carlos Rodríguez",
    date: "2023-09-10",
    category: "Comida",
    content:
      "Los tacos de pescado son una deliciosa opción para la cena. Mezcla pescado fresco con limón, cilantro y salsa picante para obtener un sabor explosivo.",
  },
  {
    id: crypto.randomUUID(),
    title: "Desarrollando una aplicación web con Node.js",
    author: "David Smith",
    date: "2023-09-09",
    category: "Desarrollo Web",
    content:
      "En este tutorial, aprenderemos a desarrollar una aplicación web completa utilizando Node.js, Express y MongoDB. ¡Espero que te sea útil!",
  },
  {
    id: crypto.randomUUID(),
    title: "Descubriendo la vida marina",
    author: "Emily Turner",
    date: "2023-09-08",
    category: "Naturaleza",
    content:
      "Hoy hice una excursión de buceo y tuve la oportunidad de ver tortugas marinas, delfines y corales coloridos. ¡La vida marina es asombrosa!",
  },
];

export default allProduct;
