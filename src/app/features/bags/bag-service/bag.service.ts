import { Injectable } from '@angular/core';
import { Bag } from '../../../models/bag-model';
import { CustomerProduct } from '../../../models/customer-product-model';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  private bags: Bag[] = [];

  constructor() {
    //TODO: fetch bags from server and store in local storage
    this.bags = [
      {
        name: 'Bag 1',
        id: '13324',
        items: [
          {
            id: '1',
            productID: '12314',
            name: 'Tomatoes',
            baseUnitQuantity: 1000,
            pricePerUnit: 500,
            measurementType: 'g',
            minQuantity: 500,
            maxQuantity: 10000,
            incrementStep: 100,
            buyingQuantity: 800,
          },
          {
            id: '2',
            productID: '12315',
            name: 'Apples',
            baseUnitQuantity: 2000,
            pricePerUnit: 3000,
            measurementType: 'g',
            minQuantity: 500,
            maxQuantity: 5000,
            incrementStep: 100,
            buyingQuantity: 200,
          },
          {
            id: '3',
            productID: '12316',
            name: 'Potatoes',
            baseUnitQuantity: 1,
            pricePerUnit: 50,
            measurementType: 'kg',
            minQuantity: 1,
            maxQuantity: 10,
            incrementStep: 1,
            buyingQuantity: 3,
          },
        ],
      },
      {
        name: 'Bag 2',
        id: '13325',
        items: [
          {
            id: '1',
            productID: '12314',
            name: 'Tomatoes',
            baseUnitQuantity: 1000,
            pricePerUnit: 500,
            measurementType: 'g',
            minQuantity: 500,
            maxQuantity: 10000,
            incrementStep: 100,
            buyingQuantity: 800,
          },
          {
            id: '2',
            productID: '12315',
            name: 'Apples',
            baseUnitQuantity: 2000,
            pricePerUnit: 3000,
            measurementType: 'g',
            minQuantity: 500,
            maxQuantity: 5000,
            incrementStep: 100,
            buyingQuantity: 200,
          },
          {
            id: '3',
            productID: '12316',
            name: 'Potatoes',
            baseUnitQuantity: 1,
            pricePerUnit: 50,
            measurementType: 'kg',
            minQuantity: 1,
            maxQuantity: 10,
            incrementStep: 1,
            buyingQuantity: 3,
          },
        ],
      },
    ];
  }

  public getBagById(id: string | null): Bag | null {
    if (!id) {
      return null;
    }
    const bag = this.bags.find((b) => b.id === id);
    if (bag) {
      return bag;
    }
    //TODO: fetch from server if not found in local storage
    return null;
  }

  public getBags(): Bag[] {
    return this.bags;
  }

  public addBag(bag: Bag): void {
    this.bags.push(bag);
  }

  public addProductToBag(bagId: string, product: CustomerProduct): void {
    const bag = this.getBagById(bagId);
    if (bag) {
      bag.items.push(product);
    }
  }

  public removeProductFromBag(bagId: string, productId: string): void {
    const bag = this.getBagById(bagId);
    if (bag) {
      bag.items = bag.items.filter((p) => p.id !== productId);
    }
  }

  public createOrder(bagId: string): void {
    //TODO: create order from bag
  }
}
