export interface RestaurantInfo {
  name: string;
  slogan: string;
  address: string;
  mapsUrl: string;
  phone: string;
  hours: { days: string; time: string }[];
  reviewUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  wifi: { network: string; password: string };
}

// TODO: reemplazar con los datos reales del restaurante.
export const restaurant: RestaurantInfo = {
  name: "Los Chucumites",
  slogan: "Mariscos & Tostadas",
  address: "Av. del Mar 123, Col. Centro",
  mapsUrl: "https://maps.google.com/?q=Los+Chucumites+Mariscos",
  phone: "+52 55 1234 5678",
  hours: [
    { days: "Lunes a jueves", time: "11:00 – 19:00" },
    { days: "Viernes a domingo", time: "10:00 – 21:00" },
  ],
  reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJy3fQmBrlxIURQdSIH66gGJU",
  facebookUrl: "https://www.facebook.com/TU_PAGINA",
  whatsappUrl: "https://wa.me/525512345678",
  wifi: { network: "Chucumites_Clientes", password: "mariscos2026" },
};
