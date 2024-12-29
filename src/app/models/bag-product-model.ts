export interface BagProductModel {
  id: string;
  name: string;
  baseUnitQuantity: number;
  pricePerUnit: number;
  measurementType: string;
  minQuantity: number;
  maxQuantity: number;
  incrementStep: number;
  discountPercentage?: number;
  buyingQuantity: number;
}
