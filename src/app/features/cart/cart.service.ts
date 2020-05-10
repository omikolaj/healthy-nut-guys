import { Injectable } from '@angular/core';
import { CartItem } from 'app/core/models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() {}

  getDistinctCartItems(cartItems: CartItem[]): CartItem[] {
    return cartItems.reduce((acc, cartItem) => {
      if (acc.some((i: CartItem) => i.productId === cartItem.productId)) {
        const existingProduct: CartItem = acc.find(i => i.productId === cartItem.productId);
        // if option doesnt exist then its the same product but different quantity
        if (existingProduct.selectOption.option !== cartItem.selectOption.option) {
          const itemQuantity = cartItems.filter(i => i.productId === cartItem.productId && i.selectOption.option === cartItem.selectOption.option)
            .length;
          const cartItemWithQuantity = {
            ...cartItem,
            selectOption: { ...cartItem.selectOption },
            quantity: itemQuantity,
            totalPrice: this.getItemTotalPrice(cartItem.itemPrice, itemQuantity)
          } as CartItem;
          acc.push(cartItemWithQuantity);
        }
      } else {
        // this product doesnt not exist in the list yet
        const quantity = cartItems.filter(i => i.productId === cartItem.productId && i.selectOption.option === cartItem.selectOption.option).length;
        const cartItemWithQuantity = {
          ...cartItem,
          selectOption: { ...cartItem.selectOption },
          quantity: quantity,
          totalPrice: this.getItemTotalPrice(cartItem.itemPrice, quantity)
        } as CartItem;
        acc.push(cartItemWithQuantity);
      }
      return acc;
    }, new Array<CartItem>());
  }

  getItemTotalPrice(itemPrice: number, quantity: number): string {
    return (itemPrice * quantity).toFixed(2);
  }

  setTotalPriceOnEachItem(cartItems: CartItem[]): CartItem[] {
    return cartItems.map(c => {
      return {
        ...c,
        selectOption: { ...c.selectOption },
        totalPrice: (c.itemPrice * c.quantity).toFixed(2)
      } as CartItem;
    });
  }

  setSubtotalPrice(cartItems: CartItem[]): { subtotal: string; items: CartItem[] } {
    let subtotal: number = 0;
    cartItems.forEach(cartItem => {
      subtotal += parseFloat(cartItem.totalPrice);
    });

    return { subtotal: subtotal.toFixed(2), items: cartItems };
  }
}
