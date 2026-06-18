const productBlack = "/assets/smilo-black-transparent.png";
const productWhite = "/assets/smilo-white-transparent.png";
const productPink = "/assets/smilo-pink-transparent.png";
const productBrown = "/assets/smilo-brown-transparent.png";

export const DEFAULT_CAMERA_STOCK_QUANTITY = 10;

export const CAMERA_COLORS = [
  { id: "black", name: "Svart", fullName: "Smilo retro kamera - svart", image: productBlack },
  { id: "white", name: "Vit", fullName: "Smilo retro kamera - vit", image: productWhite },
  { id: "pink", name: "Rosa", fullName: "Smilo retro kamera - rosa", image: productPink },
  { id: "brown", name: "Brun", fullName: "Smilo retro kamera - brun", image: productBrown },
] as const;

export type CameraColor = (typeof CAMERA_COLORS)[number];
export type CameraColorId = CameraColor["id"];

export type CameraInventoryItem = CameraColor & {
  stockQuantity: number;
  version: number;
  updatedAt?: string | null;
};

export interface CameraStockRequestIssue {
  colorId: CameraColorId;
  message: string;
}

export function getCameraColorById(id: string): CameraColor | undefined {
  return CAMERA_COLORS.find((color) => color.id === id);
}

export function getCameraColorByName(name: string): CameraColor | undefined {
  const normalized = name.trim().toLocaleLowerCase("sv-SE");
  return CAMERA_COLORS.find(
    (color) =>
      color.name.toLocaleLowerCase("sv-SE") === normalized ||
      color.fullName.toLocaleLowerCase("sv-SE") === normalized
  );
}

export function getFallbackCameraInventory(): CameraInventoryItem[] {
  return CAMERA_COLORS.map((color) => ({
    ...color,
    stockQuantity: DEFAULT_CAMERA_STOCK_QUANTITY,
    version: 1,
    updatedAt: null,
  }));
}

export function getUnavailableCameraInventory(): CameraInventoryItem[] {
  return CAMERA_COLORS.map((color) => ({
    ...color,
    stockQuantity: 0,
    version: 1,
    updatedAt: null,
  }));
}

export function getTotalCameraStock(inventory: CameraInventoryItem[]): number {
  return inventory.reduce((sum, item) => sum + Math.max(0, item.stockQuantity), 0);
}

export function getStockRequestIssues(
  colorIds: CameraColorId[],
  inventory: CameraInventoryItem[]
): CameraStockRequestIssue[] {
  const inventoryById = new Map(inventory.map((item) => [item.id, item]));
  const requestedById = colorIds.reduce<Map<CameraColorId, number>>((counts, colorId) => {
    counts.set(colorId, (counts.get(colorId) ?? 0) + 1);
    return counts;
  }, new Map());

  return Array.from(requestedById.entries()).flatMap(([colorId, requestedQuantity]) => {
    const color = getCameraColorById(colorId);
    const stockQuantity = inventoryById.get(colorId)?.stockQuantity ?? 0;

    if (!color) {
      return [{ colorId, message: "En vald färg finns inte längre." }];
    }

    if (stockQuantity <= 0) {
      return [{ colorId, message: `${color.name} är slutsåld.` }];
    }

    if (requestedQuantity > stockQuantity) {
      const cameraLabel = stockQuantity === 1 ? "kamera" : "kameror";
      return [
        {
          colorId,
          message: `Det finns bara ${stockQuantity} ${cameraLabel} kvar i ${color.name.toLocaleLowerCase(
            "sv-SE"
          )}.`,
        },
      ];
    }

    return [];
  });
}
