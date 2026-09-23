export const ASSET_ROOT = "/personalization/";
export const items = [
  {
    id: "hat",
    category: "wear",
    name: "hat",
    image: "hat",
    tone: "gold",
    description: "hatDescription",
    zones: [],
  },
  {
    id: "bag",
    category: "wear",
    name: "bag",
    image: "bag",
    tone: "red",
    description: "bagDescription",
    zones: [],
  },
  {
    id: "lantern",
    category: "decorate",
    name: "lantern",
    image: "lantern",
    tone: "red",
    description: "lanternDescription",
    zones: ["floorLeft", "floorRight", "table", "shelfLeft", "shelfRight"],
  },
  {
    id: "plant",
    category: "decorate",
    name: "plant",
    image: "plant",
    tone: "green",
    description: "plantDescription",
    zones: ["floorLeft", "floorRight", "table"],
  },
  {
    id: "spark",
    category: "memories",
    name: "spark",
    image: "spark",
    tone: "gold",
    description: "sparkDescription",
    zones: ["table", "shelfLeft", "shelfRight"],
  },
];
export const zones = [
  "floorLeft",
  "floorRight",
  "table",
  "shelfLeft",
  "shelfRight",
];
export const initialLook = { hat: false, bag: false, mood: "day" };
export const initialSpace = {
  floorLeft: "plant",
  floorRight: "lantern",
  table: null,
  shelfLeft: "spark",
  shelfRight: null,
};
export const getItem = (id) => items.find((item) => item.id === id);
export function placeItem(scene, zone, itemId) {
  if (!zones.includes(zone)) return scene;
  if (itemId !== null && !getItem(itemId)?.zones.includes(zone)) return scene;
  // Each demo object has a single instance. Moving it returns its former zone to empty.
  const next = Object.fromEntries(
    Object.entries(scene).map(([key, value]) => [
      key,
      itemId && value === itemId ? null : value,
    ]),
  );
  return { ...next, [zone]: itemId };
}
export const chapters = [
  {
    id: "outside",
    number: "01",
    title: "outside",
    detail: "outsideDetail",
    invitation: "outsideInvitation",
    reward: "outsideReward",
    icon: "compass",
  },
  {
    id: "connect",
    number: "02",
    title: "connect",
    detail: "connectDetail",
    invitation: "connectInvitation",
    reward: "connectReward",
    icon: "people",
  },
  {
    id: "contribute",
    number: "03",
    title: "contribute",
    detail: "contributeDetail",
    invitation: "contributeInvitation",
    reward: "contributeReward",
    icon: "heart",
  },
  {
    id: "create",
    number: "04",
    title: "create",
    detail: "createDetail",
    invitation: "createInvitation",
    reward: "createReward",
    icon: "spark",
  },
];
