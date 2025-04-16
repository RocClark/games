export async function GET(req) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  const wordBank = {
    Superheroes: [
      {
        word: "Batman",
        description: "A vigilante superhero from Gotham City.",
      },
      { word: "Wonder Woman", description: "An Amazonian warrior princess." },
      { word: "Superman", description: "The Man of Steel from Krypton." },
      { word: "Nightcrawler", description: "A teleporting mutant superhero." },
      {
        word: "Supergirl",
        description: "Superman’s cousin and a powerful hero.",
      },
      {
        word: "The Punisher",
        description: "A vigilante anti-hero seeking justice.",
      },
      {
        word: "Ghost Rider",
        description: "A fiery supernatural biker with a vengeance.",
      },
      {
        word: "Elektra",
        description: "A deadly assassin and Daredevil’s ally.",
      },
      {
        word: "Zatanna",
        description: "A magician superhero with mystical powers.",
      },
      {
        word: "John Constantine",
        description: "A cynical occult detective and magician.",
      },
      { word: "Red Hood", description: "A former Robin turned anti-hero." },
      {
        word: "Ms. Marvel",
        description: "A teenage superhero with shape-shifting powers.",
      },
    ],

    Mountains: [
      {
        word: "Matterhorn",
        description: "A famous pyramid-shaped mountain in the Alps.",
      },
      { word: "Everest", description: "The tallest mountain on Earth." },
      {
        word: "St. Helens",
        description: "A volcano known for its 1980 eruption.",
      },
      { word: "Erebus", description: "An Antarctic volcano with a lava lake." },
      {
        word: "Olympus",
        description: "The tallest volcano in our solar system, on Mars.",
      },
      { word: "Taranaki", description: "A volcanic peak in New Zealand." },
      {
        word: "Sugarloaf",
        description: "A mountain in Rio de Janeiro, Brazil.",
      },
      { word: "Whitney", description: "The tallest mountain in California." },
      {
        word: "Kinabalu",
        description: "A mountain in Borneo known for biodiversity.",
      },
      {
        word: "Ojos del Salado",
        description: "The highest active volcano on Earth.",
      },
      {
        word: "Shasta",
        description: "A famous stratovolcano in Northern California.",
      },
      {
        word: "Jebel Toubkal",
        description: "The highest peak in North Africa.",
      },
    ],

    Place: [
      {
        word: "Narnia",
        description: "A magical land from 'The Chronicles of Narnia' series.",
      },
      {
        word: "Middle-earth",
        description: "The setting of 'The Lord of the Rings'.",
      },
      {
        word: "Atlantis",
        description: "A legendary sunken island civilization.",
      },
      {
        word: "Wakanda",
        description: "The technologically advanced African nation from Marvel.",
      },
      {
        word: "Westeros",
        description: "A fictional continent in 'Game of Thrones'.",
      },
      { word: "Camelot", description: "The legendary castle of King Arthur." },
      { word: "Pandora", description: "The alien world in 'Avatar'." },
      { word: "El Dorado", description: "The mythical city of gold." },
      {
        word: "Coruscant",
        description: "A planet-wide city in the 'Star Wars' universe.",
      },
      { word: "Gotham City", description: "The home of Batman." },
      {
        word: "The Citadel",
        description: "A key location in 'Mass Effect' and other stories.",
      },
      {
        word: "Valhalla",
        description: "A warrior's paradise from Norse mythology.",
      },
    ],
  };

  const words = wordBank[category] || [];
  return new Response(JSON.stringify(words), { status: 200 });
}
