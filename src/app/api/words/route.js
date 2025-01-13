export async function GET(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  const wordBank = {
    Superheroes: [
      "Batman",
      "Wonder Woman",
      "Superman",
      "Nightcrawler",
      "Supergirl",
      "The Punisher",
      "Ghost Rider",
      "Elektra",
      "Zatanna",
      "John Constantine",
      "Red Hood",
      "Ms. Marvel",
    ],

    Mountains: [
      "Matterhorn",
      "Everest",
      "St. Helens",
      "Erebus",
      "Olympus",
      "Taranaki",
      "Sugarloaf",
      "Whitney",
      "Kinabalu",
      "Ojos del Salado",
      "Shasta",
      "Jebel Toubkal",
    ],

    Place: [
      "Narnia",
      "Middle-earth",
      "Atlantis",
      "Wakanda",
      "Westeros",
      "Camelot",
      "Pandora",
      "El Dorado ",
      "Coruscant.",
      "Gotham City",
      "The Citadel ",
      "Valhalla.",
    ],
  };

  const words = wordBank[category] || [];
  return new Response(JSON.stringify(words), { status: 200 });
}
