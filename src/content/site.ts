export const site = {
  name: "Golden Restaurant & Catering",
  city: "Fujairah",
  country: "UAE",
  tagline: "Where Tradition Meets Luxury",
  arabicTagline: "حيث يلتقي التراث بالفخامة",
};

export const business = {
  category: "Kerala Restaurant",
  rating: 4.5,
  reviewsCount: 13,
  plusCode: "59G2+3C9",
  area: "Ishwais",
  addressLine:
    "59G2+3C9 – Ishwais – Fujairah – United Arab Emirates",
  phone: "+971 9 223 0875",
  phoneTel: "+97192230875",
  // Approximate coordinates for Ishwais, Fujairah (update anytime with exact pin)
  position: [25.1288, 56.3265] as [number, number],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Signature", href: "#signature" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Catering", href: "#events" },
  { label: "Location", href: "#location" },
];

export const dishes = [
  { id: "biryani", name: "Kerala Malabar Biryani", note: "Fragrant kaima rice, whole spices & raita" },
  { id: "pollichathu", name: "Karimeen Pollichathu", note: "Pearl-spot fish in spiced banana leaf" },
  { id: "seafood", name: "Chemmeen Moilee", note: "King prawns in golden coconut milk" },
  { id: "chicken", name: "Kerala Chicken Curry", note: "Roasted coconut, curry leaves, pearl onions" },
  { id: "appam", name: "Appam & Ishtu", note: "Lacy rice hoppers with creamy coconut stew" },
  { id: "payasam", name: "Ada Pradhaman", note: "Rice ada in jaggery & coconut milk" },
  { id: "sulaimani", name: "Kerala Sulaimani", note: "Spiced black lime tea with cardamom" },
  { id: "puttu", name: "Puttu Kadala Curry", note: "Steamed rice cake with black chickpea curry" },
];

export const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Golden Restaurant – exterior view 1" },
  { src: "/images/gallery-2.jpg", alt: "Golden Restaurant – exterior view 2" },
  { src: "/images/gallery-3.jpg", alt: "Golden Restaurant – exterior view 3" },
];

export const testimonials = [
  {
    name: "Google Reviewer",
    role: "Verified Customer",
    time: "Recent",
    quote:
      "First time here and it was great. The biryani was super yum and tasted different. Good quantity and price for the same.. Paratha & beef fry was a great combination too.. also good service. Price is little bit high compare to other restaurants.. Kerala people must like this restaurant.",
    rating: 4,
  },
  {
    name: "Rohith Soman",
    role: "Local Guide · 361 reviews · 4,943 photos",
    time: "4 years ago",
    quote:
      "Loved the food we had. Hopefully they are maintaing the same quality. So do visit this hotel to have a very good food experience 👍🏻😊",
    rating: 5,
  },
  {
    name: "aalvi's the man",
    role: "Local Guide · 396 reviews · 2,060 photos",
    time: "4 years ago",
    quote:
      "Here we get kerala special foods. I had kizhi porota here that is amazing. I had shawarma also from here that was spicy and delicious 😋🥰",
    rating: 5,
  },
  {
    name: "Naser Saeed",
    role: "Local Guide · 73 reviews · 146 photos",
    time: "a year ago",
    quote: "Very good taste of fresh milk karak chai.",
    rating: 5,
  },
];
