export type MenuItem = {
  id: string;
  name: string;
  tags?: string[];
  description: string;
  image?: string;
  sizes: { label: string; price: number }[];
  availability?: "low" | "out";
};

export type MenuCategory = {
  id: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
};

const img = (name: string) => `/images/menu/${name}`;

export const foodCategories: MenuCategory[] = [
  {
    id: "eats",
    title: "Eats",
    blurb: "Made to order, plant-forward, built on organic produce and local bread.",
    items: [
      {
        id: "labrea-burrito",
        name: "LA Brea Burrito",
        tags: ["nut free"],
        description:
          "Pasture-raised organic eggs, black beans, organic spinach, purple cabbage, chipotle mayo, grilled organic whole wheat tortilla. Vegan option available.",
        image: img("labrea.webp"),
        sizes: [
          { label: "Half", price: 13 },
          { label: "Full", price: 16 },
        ],
      },
      {
        id: "grain-free-waffle",
        name: "Grain-Free Belgian Waffle",
        tags: ["GF", "nuts", "egg"],
        description:
          "Our grain-free seasonal Belgian-style waffle topped with organic seasonal fruit, coconut crème, and toasted pecans. Served with pure maple syrup.",
        image: img("belgian.webp"),
        sizes: [{ label: "Standard", price: 14 }],
      },
      {
        id: "del-mar",
        name: "Del~Mar",
        tags: ["V", "nuts"],
        description:
          "Monty's cashew cream cheese, seasonal tomatoes, organic English cucumbers, red onion, lemon, and micro greens on an organic high-protein bagel.",
        image: img("del-mar.webp"),
        sizes: [
          { label: "Half", price: 12 },
          { label: "Full", price: 14.5 },
        ],
      },
      {
        id: "west-coast-toast",
        name: "West Coast Toast",
        description:
          "Grilled organic sourdough, smashed avocado, heirloom tomato, microgreens, chili-lime, choice of egg.",
        image: img("west-coast-toast.webp"),
        sizes: [
          { label: "Half", price: 9 },
          { label: "Full", price: 13 },
        ],
      },
      {
        id: "lamara-burger",
        name: "Lamara Burger",
        tags: ["contains walnuts"],
        description:
          "House-made black bean, walnut, mushroom, brown rice & fennel patty, grilled red onion, dill pickles, tomato, leaf lettuce, side of seasoned fries.",
        image: img("lamara-burger.webp"),
        sizes: [
          { label: "Standard", price: 14 },
          { label: "With avocado", price: 15 },
        ],
      },
      {
        id: "sunrise-kingdom",
        name: "Sunrise Kingdom",
        tags: ["nuts"],
        description:
          "Pan-fried egg, pesto, arugula, pickles, tomato on a sprouted bagel. GF bagel available — can be made fully vegan.",
        image: img("sunrise-kingdom.webp"),
        sizes: [
          { label: "Half", price: 12 },
          { label: "Full", price: 15 },
        ],
      },
      {
        id: "rainbow-tostadas",
        name: "Rainbow Tostadas",
        tags: ["V", "2 pc"],
        description:
          "Black bean spread, avocado, purple cabbage, romaine, golden beets, scallions, pumpkin seeds, baked corn tortilla, pico de gallo.",
        image: img("rainbow-tostadas.webp"),
        sizes: [
          { label: "2 pc", price: 14 },
          { label: "4 pc", price: 19 },
        ],
      },
      {
        id: "spring-roll-bowl-custom",
        name: "Spring Roll Bowl, Custom To-Go",
        description:
          "Bed of greens, baked sprouted tofu, brown rice noodles, cucumbers, carrots, herbs, sesame seeds, scallions, toasted peanuts, spicy peanut-ginger sauce.",
        image: img("spring-roll-bowl.webp"),
        sizes: [
          { label: "Half", price: 14.75 },
          { label: "Full", price: 19.5 },
        ],
      },
      {
        id: "blat",
        name: "BLAT Sandwich",
        tags: ["13g protein", "V"],
        description:
          "Housemade adzuki bean bacon, arugula, fresh seasonal tomatoes, avocado, rosemary garlic mayo, red onion, toasted multigrain.",
        image: img("blat.webp"),
        sizes: [{ label: "Standard", price: 14 }],
      },
      {
        id: "protein-greens",
        name: "Protein + Greens",
        tags: ["GF"],
        description:
          "Two-egg omelette, sautéed spinach, scallions, cilantro cashew crème, avocado, microgreens.",
        image: img("protein-greens.webp"),
        sizes: [
          { label: "Half", price: 10 },
          { label: "Full", price: 12 },
        ],
      },
      {
        id: "california-burrito",
        name: "California Burrito",
        tags: ["V"],
        description:
          "Crispy roasted potatoes and onions, black beans, cilantro cashew sauce, vegan cheese, romaine, avocado, grilled whole wheat tortilla.",
        image: img("california-burrito.webp"),
        sizes: [
          { label: "Half", price: 14 },
          { label: "Full", price: 16 },
        ],
      },
    ],
  },
];

export const drinkCategories: MenuCategory[] = [
  {
    id: "coffee-bar",
    title: "Coffee Bar",
    blurb: "Ruby Roaster's Creamery blend, oat milk default — almond, macadamia, or whole milk on request.",
    items: [
      {
        id: "matcha-latte",
        name: "Matcha Latte",
        description:
          "Nekohama organic ceremonial-grade premium A1 matcha from Kyushu. We recommend it made with our house organic almond milk.",
        image: img("matcha-latte.webp"),
        sizes: [
          { label: "16oz", price: 6.5 },
          { label: "20oz", price: 6.75 },
        ],
      },
      {
        id: "latte",
        name: "Latte",
        description: "A double shot of Ruby Roaster's Creamery blend with milk of choice.",
        image: img("latte.webp"),
        sizes: [
          { label: "16oz", price: 5.5 },
          { label: "20oz", price: 5.75 },
        ],
      },
      {
        id: "vanilla-latte",
        name: "Vanilla Latte",
        description: "Ruby's double shot espresso, house organic vanilla syrup, milk of choice.",
        image: img("vanilla-lattee.webp"),
        sizes: [
          { label: "16oz", price: 5.5 },
          { label: "20oz", price: 5.75 },
        ],
      },
      {
        id: "cardamom-vanilla-latte",
        name: "Cardamom Vanilla Latte",
        description: "House-made vanilla syrup, cardamom, double shot espresso, milk of choice.",
        image: img("cardamom-vanilla.webp"),
        sizes: [
          { label: "16oz", price: 5.75 },
          { label: "20oz", price: 6.0 },
        ],
      },
      {
        id: "lavender-vanilla-latte",
        name: "Lavender Vanilla Latte",
        description: "House-made lavender vanilla syrup, double shot espresso, steamed milk of choice.",
        image: img("lavender-vanilla.webp"),
        sizes: [
          { label: "16oz", price: 5.75 },
          { label: "20oz", price: 6.0 },
        ],
      },
      {
        id: "honey-cinnamon-latte",
        name: "Honey-Cinnamon Latte",
        description: "Local 9th Ward raw honey, organic Ceylon cinnamon, double shot espresso, steamed milk of choice.",
        image: img("honey-cinnamon.webp"),
        sizes: [
          { label: "16oz", price: 6.0 },
          { label: "20oz", price: 6.25 },
        ],
      },
      {
        id: "golden-state-latte",
        name: "Golden State Wellness Latte",
        description: "2.5g MUD\\WTR mushroom blend (cacao, ginger, turmeric, chai spices), oat milk, local raw honey. No espresso in this one.",
        image: img("golden-state.webp"),
        sizes: [
          { label: "16oz", price: 6.0 },
          { label: "20oz", price: 6.25 },
        ],
      },
      {
        id: "turmeric-ginger-latte",
        name: "Turmeric Ginger Latte",
        tags: ["fan favorite"],
        description: "Kilogram organic loose-leaf tonic blended with ginger, black licorice, lemon + lime peel, steamed almond milk.",
        image: img("tumeric.webp"),
        sizes: [
          { label: "16oz", price: 5.25 },
          { label: "20oz", price: 5.5 },
        ],
      },
      {
        id: "mocha",
        name: "Mocha",
        description: "San Diego Cafe Moto's signature dark cacao blended with coconut sugar and a double shot of Ruby's Creamery blend, oat milk.",
        image: img("mocha.webp"),
        sizes: [
          { label: "16oz", price: 6.0 },
          { label: "20oz", price: 6.25 },
        ],
      },
      {
        id: "oaxaca-moca",
        name: "Oaxaca Moca",
        tags: ["best seller"],
        description: "Cafe Moto's blend of cinnamon, dark cacao and crushed candied peanuts, blended with oat milk.",
        image: img("oaxaca.webp"),
        sizes: [{ label: "16oz", price: 6.5 }],
      },
      {
        id: "cortado",
        name: "Cortado",
        description: "A double shot of Ruby Roaster's Creamery blend, 6oz, with steamed oat milk.",
        image: img("cortado.webp"),
        sizes: [
          { label: "6oz", price: 4.5 },
          { label: "8oz", price: 4.75 },
        ],
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "A double shot of Ruby Roaster's Creamery blend with oat milk froth.",
        image: img("cappucino.webp"),
        sizes: [
          { label: "6oz", price: 5.0 },
          { label: "8oz", price: 5.25 },
        ],
      },
      {
        id: "espresso",
        name: "Espresso",
        description: "A double shot of Ruby Roaster's Creamery blend.",
        image: img("espresso.webp"),
        sizes: [
          { label: "Single", price: 4.0 },
          { label: "Double", price: 4.25 },
        ],
      },
      {
        id: "hot-chocolate",
        name: "Hot Chocolate",
        description: "Cafe Moto's organic dark chocolate recipe, oat milk, steamed.",
        image: img("hot-chocolate.webp"),
        sizes: [{ label: "12oz", price: 4.0 }],
      },
      {
        id: "loose-leaf-tea",
        name: "Loose Leaf Tea",
        description: "Select from our collection of organic loose leaf teas.",
        image: img("looseleaf.webp"),
        sizes: [{ label: "16oz", price: 4.0 }],
      },
      {
        id: "daily-iced-tea",
        name: "Daily Iced Tea",
        description: "Kilogram organic cold brew tea blend of the day, over ice, unsweetened.",
        image: img("looseleaf.webp"),
        sizes: [
          { label: "16oz", price: 4.0 },
          { label: "20oz", price: 4.25 },
        ],
      },
      {
        id: "americano",
        name: "Americano",
        description: "Double shot of Ruby's Creamery blend over hot water.",
        image: img("espresso.webp"),
        sizes: [
          { label: "12oz", price: 4.0 },
          { label: "16oz", price: 4.25 },
        ],
      },
      {
        id: "cafe-au-lait",
        name: "Cafe Au Lait",
        description: "Half drip, half steamed milk.",
        image: img("espresso.webp"),
        sizes: [{ label: "12oz", price: 4.25 }],
      },
      {
        id: "london-fog",
        name: "London Fog",
        description: "Kilogram organic loose leaf tea and steamed macadamia milk.",
        image: img("looseleaf.webp"),
        sizes: [{ label: "16oz", price: 4.75 }],
      },
      {
        id: "cold-brew",
        name: "Cold Brew",
        description: "Local roaster Hey Coffee's cold brew blend, 16oz.",
        image: img("espresso.webp"),
        sizes: [
          { label: "16oz", price: 5.0 },
          { label: "20oz", price: 5.25 },
        ],
      },
      {
        id: "red-eye",
        name: "Red Eye",
        description: "Drip coffee with a shot of espresso.",
        image: img("espresso.webp"),
        sizes: [{ label: "16oz", price: 4.0 }],
        availability: "out",
      },
      {
        id: "pretty-in-pink",
        name: "Pretty in Pink Latte",
        tags: ["caffeine-free"],
        description: "Beetroot, ginger, cardamom, clove, raw local honey, milk of choice.",
        image: img("pretty-in-pink.webp"),
        sizes: [{ label: "16oz", price: 5.0 }],
      },
      {
        id: "frozen-matcha",
        name: "Frozen Matcha",
        tags: ["seasonal"],
        description: "House-made organic almond crème, 3g matcha, maple syrup, over ice.",
        image: img("frozen.webp"),
        sizes: [{ label: "16oz", price: 9.0 }],
      },
    ],
  },
  {
    id: "smoothies-bowls",
    title: "Smoothies & Bowls",
    blurb: "House-made cashew milk, real fruit, clean protein — blended fresh to order.",
    items: [
      {
        id: "aloha-antioxidant",
        name: "Aloha Antioxidant+",
        description: "Organic pineapple, banana, spinach, house-made cashew milk, coconut butter, vanilla protein, liposomal zinc + vitamin C, baobab.",
        image: img("aloha.webp"),
        sizes: [{ label: "16oz", price: 13 }],
      },
      {
        id: "berry-longevity",
        name: "Berry Longevity+",
        tags: ["best seller"],
        description: "Our best-selling blend of mixed organic berries, banana, plant protein, raw coconut butter, cashew milk.",
        image: img("berry.webp"),
        sizes: [{ label: "16oz", price: 13 }],
      },
      {
        id: "mint-chip",
        name: "Mint Chip",
        description: "Banana, vanilla protein, mint extract, coconut butter, spinach, cacao nibs, maca, housemade cashew milk. 12g protein.",
        image: img("mint.webp"),
        sizes: [{ label: "16oz", price: 12 }],
      },
      {
        id: "pb-protein-cacao",
        name: "PB Protein + Cacao",
        tags: ["25g protein"],
        description: "Peruvian cacao, double chocolate protein, cashew milk, banana, peanut butter.",
        image: img("pb-protein.webp"),
        sizes: [{ label: "16oz", price: 12 }],
      },
      {
        id: "golden-glow",
        name: "Golden Glow",
        description: "Grass-fed, lactose-free kefir, mango, pineapple, banana, coconut.",
        image: img("golden.webp"),
        sizes: [{ label: "16oz", price: 13 }],
      },
      {
        id: "brain-buzz",
        name: "Brain Buzz",
        description: "Double espresso shot, cacao, banana, raw almond butter, protein powder.",
        image: img("brain-buzz.webp"),
        sizes: [{ label: "16oz", price: 13 }],
      },
      {
        id: "acai-bowl",
        name: "Acai Protein Bowl",
        description: "Pure açaí, blueberries, banana, house-made cashew milk, seed + nut granola (GF), chia pudding, cacao nibs, coconut shreds.",
        image: img("acai.webp"),
        sizes: [{ label: "Bowl", price: 15 }],
        availability: "low",
      },
      {
        id: "superfood",
        name: "Superfood",
        description: "Our nutrient-dense rotating blend — ask your barista what's in the blender today.",
        sizes: [{ label: "16oz", price: 13 }],
      },
      {
        id: "dragonfruit-bowl",
        name: "Dragonfruit Bowl",
        description: "Dragonfruit, banana, coconut water base, topped with seasonal fruit and house granola.",
        sizes: [{ label: "Bowl", price: 15 }],
      },
      {
        id: "honolulu-queen",
        name: "Honolulu Queen",
        description: "Pineapple, mango, coconut, banana, topped island-style with toasted coconut and macadamia.",
        sizes: [{ label: "Bowl", price: 15 }],
      },
      {
        id: "fortune-teller",
        name: "Fortune Teller",
        description: "Blue spirulina, banana, pineapple, coconut milk, topped with edible flowers and granola.",
        sizes: [{ label: "Bowl", price: 15 }],
      },
    ],
  },
  {
    id: "grab-and-go",
    title: "Grab + Go Drinks",
    items: [
      {
        id: "dram-hemp",
        name: "DRAM Adaptogen Hemp Drinks",
        description: "25mg hemp + adaptogens, for aging and stress.",
        image: img("dram.webp"),
        sizes: [{ label: "Can", price: 5.5 }],
      },
      {
        id: "dram-waters",
        name: "DRAM Sparkling Herbal Waters",
        description: "Choose between several flavors.",
        image: img("dram-waters.webp"),
        sizes: [{ label: "Can", price: 4.0 }],
      },
      {
        id: "wildwonder",
        name: "WildWonder Pre/Probiotic Sparkling Drinks",
        description: "Mango Gold and rotating flavors.",
        image: img("wildwonder.webp"),
        sizes: [{ label: "Can", price: 5.5 }],
      },
    ],
  },
  {
    id: "chilled",
    title: "Chilled",
    items: [
      {
        id: "pb-c-crunch-bar",
        name: "PB-C Protein Crunch Bar",
        description: "Peanut butter, puffed quinoa, cacao, maple syrup, coconut oil, plant protein. 12g protein per bar.",
        image: img("crunch-bar.webp"),
        sizes: [{ label: "Bar", price: 8 }],
      },
      {
        id: "raw-protein-bites",
        name: "Raw Protein Bites",
        tags: ["V", "GF"],
        description: "All-organic raw snack, hand-rolled — plant protein, hemp seeds, maple syrup.",
        image: img("raw-bite.webp"),
        sizes: [{ label: "3 pc", price: 10 }],
      },
      {
        id: "spring-roll-bowl-chilled",
        name: "Spring Roll Bowl",
        tags: ["V", "GF", "peanuts"],
        description: "Baked sprouted tofu, cucumber, carrots, spring mix, mint, cilantro, scallions, spicy peanut-ginger sauce.",
        image: img("spring-roll-bowl.webp"),
        sizes: [{ label: "Bowl", price: 15 }],
        availability: "out",
      },
      {
        id: "seasonal-raw-bar",
        name: "Seasonal Raw Bar",
        description: "Classic banana crème bar.",
        image: img("raw-bar.webp"),
        sizes: [{ label: "Bar", price: 8 }],
      },
      {
        id: "omega-chia-parfait",
        name: "Omega Chia Parfait",
        description: "Packed with fiber and good omega fats — coconut milk, macadamia milk, chia, agave, organic fruit, coconut shreds.",
        image: img("chia-parfait.webp"),
        sizes: [{ label: "Cup", price: 7 }],
      },
    ],
  },
];

export const allCategories = [...foodCategories, ...drinkCategories];

export function findItem(id: string): MenuItem | undefined {
  for (const cat of allCategories) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return undefined;
}
