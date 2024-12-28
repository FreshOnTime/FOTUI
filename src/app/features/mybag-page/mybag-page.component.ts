import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

interface Cart {
  name: string;
  items: { name: string; quantity: number; price: number }[];
  isScheduled: boolean; // True for recurring carts
  scheduleDate?: Date; // Optional for scheduled carts
  picture: string; // URL for the cart picture
}

interface Item {
  name: string;
  price: number;
  picture: string;
}

@Component({
  selector: 'app-mybag-page',
  templateUrl: './mybag-page.component.html',
  styleUrls: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ScrollPanelModule, ButtonModule, DialogModule, DropdownModule, ToastModule, ProgressBarModule],
  providers: [MessageService],
  standalone: true
})
export class MyBagPageComponent implements OnInit {
  carts: Cart[] = [
    { name: 'Cart 1', isScheduled: false, items: [{ name: 'Item 1', quantity: 1, price: 10 }], picture: 'assets/cart1.jpg' },
    { name: 'Cart 2', isScheduled: true, scheduleDate: new Date(), items: [{ name: 'Item 2', quantity: 2, price: 20 }], picture: 'assets/cart2.jpg' }
  ];
  selectedCart: Cart | null = null;
  searchTerm: string = '';
  displayDeleteModal: boolean = false;
  editItemIndex: number | null = null;
  cartToDelete: any;
  isLoading: boolean = false;
  sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Date', value: 'date' }
  ];
  selectedSortOption: string = '';
  wishlist: Item[] = [
    { name: 'Wishlist Item 1', price: 15, picture: 'assets/wishlist1.jpg' },
    { name: 'Wishlist Item 2', price: 25, picture: 'assets/wishlist2.jpg' }
  ];
  recentlyViewedItems: Item[] = [
    { name: 'Recently Viewed Item 1', price: 30, picture: 'assets/recent1.jpg' },
    { name: 'Recently Viewed Item 2', price: 40, picture: 'assets/recent2.jpg' }
  ];
  loyaltyPoints: number = 100;

  constructor(private messageService: MessageService) {}

  get scheduledCarts(): Cart[] {
    return this.carts.filter(cart => cart.isScheduled);
  }

  get oneTimeCarts(): Cart[] {
    return this.carts.filter(cart => !cart.isScheduled);
  }

  get filteredScheduledCarts(): Cart[] {
    return this.scheduledCarts.filter(cart => cart.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  get filteredOneTimeCarts(): Cart[] {
    return this.oneTimeCarts.filter(cart => cart.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  ngOnInit(): void {
    // Example carts for demonstration
    this.carts = [
      {
        name: 'Groceries',
        items: [
          { name: 'Apples', quantity: 5, price: 1 },
          { name: 'Bread', quantity: 2, price: 2 }
        ],
        isScheduled: true,
        scheduleDate: new Date('2024-12-30'),
        picture: 'assets/groceries.jpg'
      },
      {
        name: 'Party Supplies',
        items: [
          { name: 'Cups', quantity: 20, price: 0.5 },
          { name: 'Plates', quantity: 30, price: 0.3 }
        ],
        isScheduled: false,
        picture: 'assets/party_supplies.jpg'
      },
      {
        name: 'Office Supplies',
        items: [
          { name: 'Pens', quantity: 10, price: 1 },
          { name: 'Notebooks', quantity: 5, price: 2 }
        ],
        isScheduled: true,
        scheduleDate: new Date('2024-11-15'),
        picture: 'assets/office_supplies.jpg'
      },
      {
        name: 'Electronics',
        items: [
          { name: 'USB Cable', quantity: 3, price: 5 },
          { name: 'Mouse', quantity: 1, price: 10 }
        ],
        isScheduled: false,
        picture: 'assets/electronics.jpg'
      }
    ];
  }

  selectCart(cart: Cart): void {
    this.selectedCart = cart;
    this.editItemIndex = null;
  }

  toggleSchedule(cart: Cart): void {
    cart.isScheduled = !cart.isScheduled;
    if (!cart.isScheduled) {
      cart.scheduleDate = undefined;
    }
    this.messageService.add({ severity: 'info', summary: 'Cart Updated', detail: 'Cart schedule has been updated.' });
  }

  editCart(cart: Cart): void {
    this.selectedCart = cart;
    this.editItemIndex = null;
  }

  editItem(index: number): void {
    this.editItemIndex = index;
  }

  saveItemEdits(): void {
    if (this.selectedCart && this.editItemIndex !== null) {
      this.messageService.add({ severity: 'success', summary: 'Item Updated', detail: 'Item has been updated.' });
      this.editItemIndex = null;
    }
  }

  confirmItemEdits(): void {
    if (this.selectedCart && this.editItemIndex !== null) {
      this.messageService.add({ severity: 'success', summary: 'Item Confirmed', detail: 'Item edits have been confirmed.' });
      this.editItemIndex = null;
      if (this.selectedCart.isScheduled) {
        this.selectedCart.scheduleDate = undefined;
      }
    }
  }

  cancelEditItem(): void {
    this.editItemIndex = null;
  }

  deleteCart(cart: Cart): void {
    this.carts = this.carts.filter(c => c !== cart);
    if (this.selectedCart === cart) {
      this.selectedCart = null;
    }
    this.messageService.add({ severity: 'success', summary: 'Cart Deleted', detail: 'Cart has been deleted.' });
  }

  confirmDeleteCart(cart: any) {
    this.cartToDelete = cart;
    this.displayDeleteModal = true;
  }

  deleteCartConfirmed() {
    if (this.cartToDelete) {
      // Add your deletion logic here
      this.carts = this.carts.filter(c => c !== this.cartToDelete);
      this.cartToDelete = null;
      this.displayDeleteModal = false;
      this.messageService.add({ severity: 'success', summary: 'Cart Deleted', detail: 'Cart has been deleted.' });
    }
  }

  getTotalItems(): number {
    return this.carts.reduce((total, cart) => total + cart.items.reduce((sum, item) => sum + item.quantity, 0), 0);
  }

  getTotalPrice(): number {
    return this.carts.reduce((total, cart) => total + cart.items.reduce((sum, item) => sum + (item.quantity * item.price), 0), 0);
  }

  getCartCompletion(): number {
    const totalItems = this.getTotalItems();
    const completedItems = this.carts.reduce((total, cart) => total + cart.items.filter(item => item.quantity > 0).length, 0);
    return (completedItems / totalItems) * 100;
  }

  getTotalScheduledItems(): number {
    return this.scheduledCarts.reduce((total, cart) => total + cart.items.reduce((sum, item) => sum + item.quantity, 0), 0);
  }

  getTotalOneTimeItems(): number {
    return this.oneTimeCarts.reduce((total, cart) => total + cart.items.reduce((sum, item) => sum + item.quantity, 0), 0);
  }

  getTotalScheduledPrice(): number {
    return this.scheduledCarts.reduce((total, cart) => total + cart.items.reduce((sum, item) => sum + (item.quantity * item.price), 0), 0);
  }

  getTotalOneTimePrice(): number {
    return this.oneTimeCarts.reduce((total, cart) => total + cart.items.reduce((sum, item) => sum + (item.quantity * item.price), 0), 0);
  }

  getScheduledCartCompletion(): number {
    const totalItems = this.getTotalScheduledItems();
    const completedItems = this.scheduledCarts.reduce((total, cart) => total + cart.items.filter(item => item.quantity > 0).length, 0);
    return (completedItems / totalItems) * 100;
  }

  getOneTimeCartCompletion(): number {
    const totalItems = this.getTotalOneTimeItems();
    const completedItems = this.oneTimeCarts.reduce((total, cart) => total + cart.items.filter(item => item.quantity > 0).length, 0);
    return (completedItems / totalItems) * 100;
  }

  addToCart(item: Item): void {
    const newCart: Cart = {
      name: `Cart ${this.carts.length + 1}`,
      items: [{ name: item.name, quantity: 1, price: item.price }],
      isScheduled: false,
      picture: item.picture
    };
    this.carts.push(newCart);
    this.messageService.add({ severity: 'success', summary: 'Item Added', detail: 'Item has been added to the cart.' });
  }

  redeemPoints(): void {
    if (this.loyaltyPoints >= 50) {
      this.loyaltyPoints -= 50;
      this.messageService.add({ severity: 'success', summary: 'Points Redeemed', detail: '50 loyalty points have been redeemed.' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Insufficient Points', detail: 'You do not have enough loyalty points to redeem.' });
    }
  }
}
