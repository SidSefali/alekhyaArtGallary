let paintings = JSON.parse(sessionStorage.getItem("paintings")) || [
  {
    id: 1,
    title: "Eternal Bloom",
    price: 200,
    image: "assets/images/redHorse.jpeg",
    short: "A celebration of rebirth and hope.",
    long: "Eternal Bloom reflects nature’s ability to heal and renew."
  },
  {
    id: 2,
    title: "Silent Horizon",
    price: 350,
    image: "assets/images/motherLove.jpeg",
    short: "Where sky meets emotion.",
    long: "A calm yet powerful expression of solitude and reflection."
  },
  {
    id: 3,
    title: "Golden Memories",
    price: 280,
    image: "assets/images/greenHorse.jpeg",
    short: "Moments frozen in warmth.",
    long: "Inspired by nostalgia and golden-hour light."
  },
  {
    id: 4,
    title: "Whispers of Blue",
    price: 420,
    image: "assets/images/newYear.jpeg",
    short: "Depths of silence and thought.",
    long: "A meditative journey through layered blues."
  },
  {
    id: 5,
    title: "Crimson Pulse",
    price: 500,
    image: "assets/images/newYear.jpeg",
    short: "Energy captured on canvas.",
    long: "Represents passion, strength, and inner fire."
  },
  {
    id: 6,
    title: "Morning Serenity",
    price: 260,
    image: "assets/images/greenHorse.jpeg",
    short: "A peaceful beginning.",
    long: "Soft tones inspired by quiet mornings."
  },
  {
    id: 7,
    title: "Morning Serenity",
    price: 660,
    image: "assets/images/googlePlay.png",
    short: "A peaceful beginning Test.",
    long: "Soft tones inspired by quiet mornings test."
  }
];
