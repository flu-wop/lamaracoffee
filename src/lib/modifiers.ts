export type ModifierChoice = {
  id: string;
  label: string;
  price?: number; // extra cost, omit or 0 for free
  soldOut?: boolean;
  defaultSelected?: boolean;
};

export type ModifierGroup = {
  id: string;
  name: string;
  required: boolean; // must pick at least one
  multiSelect: boolean; // can pick more than one
  choices: ModifierChoice[];
};

// Reusable groups — sourced from the live Square catalog's modifier API.
// These map onto the "modifier set" patterns Lamara reuses across most items.
export const MODIFIER_GROUPS: Record<string, ModifierGroup> = {
  "hot-or-iced": {
    id: "hot-or-iced",
    name: "Hot or Iced",
    required: true,
    multiSelect: false,
    choices: [
      { id: "hot", label: "I like it Hot", defaultSelected: true },
      { id: "iced", label: "On the rocks!" },
    ],
  },
  "no-caffeine": {
    id: "no-caffeine",
    name: "No Caffeine For Me!",
    required: false,
    multiSelect: false,
    choices: [{ id: "decaf", label: "No Caffeine For Me!", price: 1, soldOut: true }],
  },
  "milk-options": {
    id: "milk-options",
    name: "milk options",
    required: true,
    multiSelect: false,
    choices: [
      { id: "oat", label: "oat (gf+ olive oil unsweetened)", defaultSelected: true },
      { id: "almond", label: "almond (maple + sea salt)" },
      { id: "macadamia", label: "macadamia (lightly sweetened w cane)", price: 1 },
      { id: "grass-fed-dairy", label: "organic grass fed dairy" },
      { id: "extra-hot", label: "extra hot please" },
      { id: "short", label: "make mine short (5oz)" },
      { id: "light-ice", label: "light ice please" },
    ],
  },
  "smoothie-boosters": {
    id: "smoothie-boosters",
    name: "smoothie boosters",
    required: false,
    multiSelect: true,
    choices: [
      { id: "almond-butter", label: "Raw almond butter", price: 2 },
      { id: "ginger", label: "Ginger", price: 0.5 },
      { id: "matcha", label: "Matcha", price: 3 },
      { id: "protein-boost", label: "10g protein boost", price: 2 },
      { id: "spinach", label: "Spinach", price: 1 },
      { id: "spirulina", label: "Blue Spirulina", price: 1 },
      { id: "cacao-nibs", label: "Cacao Nibs", price: 1 },
      { id: "espresso-shot", label: "Espresso", price: 2 },
      { id: "coconut-butter", label: "Raw Coconut Butter", price: 2 },
      { id: "mushroom-powder", label: "Mushroom Powder", price: 2 },
      { id: "peanut-butter", label: "Peanut Butter", price: 2 },
      { id: "extra-fruit", label: "extra fruit", price: 1 },
    ],
  },
  "allergy-alert": {
    id: "allergy-alert",
    name: "ALLERGY ALERT!",
    required: false,
    multiSelect: true,
    choices: [
      { id: "tree-nuts", label: "ALLERGY ALERT! TREE NUTS" },
      { id: "gluten", label: "ALLERGY ALERT! GLUTEN" },
      { id: "ask-barista", label: "ALLERGY ALERT! Ask Barista" },
    ],
  },
  // Item-specific groups
  "la-brea-burrito-custom": {
    id: "la-brea-burrito-custom",
    name: "La Brea Burrito",
    required: false,
    multiSelect: true,
    choices: [
      { id: "wedges-inside", label: "baked potato wedges inside please!", price: 1 },
      { id: "raw-hot-sauce", label: "raw hot sauce please", price: 1 },
      { id: "avocado-mash", label: "add avocado mash", price: 1 },
      { id: "vegan-cheese", label: "add vegan cheese", price: 1 },
      { id: "extra-chipotle-mayo", label: "Extra Side Of Chipotle Mayo", price: 1 },
      { id: "no-cabbage", label: "no cabbage" },
      { id: "no-mayo", label: "no mayo" },
      { id: "no-spinach", label: "no spinach" },
      { id: "egg-whites-only", label: "egg whites only" },
    ],
  },
  "lamara-burger-egg": {
    id: "lamara-burger-egg",
    name: "Add a pan fried egg to sandwich",
    required: false,
    multiSelect: false,
    choices: [{ id: "add-egg", label: "add pan fried egg", price: 2.5 }],
  },
  "lamara-burger-custom": {
    id: "lamara-burger-custom",
    name: "Lamara Veggie Burger",
    required: false,
    multiSelect: true,
    choices: [
      { id: "avo-mash", label: "Add Avo Mash", price: 1 },
      { id: "hot-sauce", label: "Add hot sauce", price: 1 },
      { id: "no-mayo", label: "No Mayo" },
      { id: "no-onion", label: "No Onion" },
      { id: "sriracha-side", label: "Sriracha Side", price: 0.5 },
      { id: "no-pickles", label: "no pickles" },
      { id: "no-tomato", label: "no tomato" },
      { id: "avocado-slices", label: "add avocado slices", price: 2.5 },
    ],
  },
  "lamara-burger-wedges": {
    id: "lamara-burger-wedges",
    name: "Side Of Baked Potato Wedges (2)",
    required: false,
    multiSelect: false,
    choices: [{ id: "wedges-side", label: "Side Of Baked Potato Wedges", price: 1 }],
  },
  "lamara-burger-bowl": {
    id: "lamara-burger-bowl",
    name: "Make it a bowl",
    required: false,
    multiSelect: false,
    choices: [{ id: "make-bowl", label: "Make it a bowl" }],
  },
  "acai-bowl-custom": {
    id: "acai-bowl-custom",
    name: "Açaí Bowl",
    required: false,
    multiSelect: true,
    choices: [
      { id: "no-granola", label: "No Granola" },
      { id: "no-chia", label: "No Chia" },
      { id: "no-nibs", label: "No Nibs" },
      { id: "no-shreds", label: "No Shreds" },
      { id: "no-honey", label: "No Honey" },
    ],
  },
};

export function getModifierGroups(ids: string[] = []): ModifierGroup[] {
  return ids.map((id) => MODIFIER_GROUPS[id]).filter((g): g is ModifierGroup => Boolean(g));
}

export type SelectedModifier = {
  groupId: string;
  groupName: string;
  choiceId: string;
  label: string;
  price: number;
};
