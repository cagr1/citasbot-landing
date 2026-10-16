// Ecuador: +593 · strip leading zero from local number
export const WA_NUMBER = "593984420987";
export const WA_MESSAGE = encodeURIComponent(
  "Hola, me interesa saber más sobre CitasBot para mi negocio."
);
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
