import { environment as env } from '../../../environments/environment';
import { ShopItem } from 'app/core/models/shop-item.model';
import { ItemDetails } from 'app/core/models/item-details.model';
import { ActivatedRouteSnapshot } from '@angular/router';

export interface Feature {
  id: string;
  name: string;
  version?: string;
  description: string;
  github?: string;
  documentation?: string;
  medium?: string;
  imageSrc?: string;
}

export function runResolver(from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot): boolean {
  console.log('from', from);
  console.log('to', to);
  return false;
}

export const shopItems: ShopItem[] = [
  {
    id: '1',
    description: 'Healthy Nut Guys',
    name: 'Succulent Nut Sack',
    imageSrc: '../../../assets/succulent_nut_sack.png'
  },
  {
    id: '2',
    description: 'Healthy Nut Guys',
    name: 'Keto Nut Sack',
    imageSrc: '../../../assets/keto_nut_sack.png'
  },
  {
    id: '3',
    description: 'Healthy Nut Guys',
    name: 'Energy Nut Sack',
    imageSrc: '../../../assets/energy_nut_sack.png'
  },
  {
    id: '4',
    description: 'Healthy Nut Guys',
    name: 'Custom Nut Sack',
    imageSrc: '../../../assets/custom_nut_sack.png'
  }
];

export const itemDetails: ItemDetails[] = [
  {
    id: '1',
    imageSrc: '../../../assets/succulent_nut_sack.png',
    price: 17.99,
    inStock: true,
    title: 'Succulent Nut Sack',
    subtitle: 'Healthy Nut Guys',
    description:
      "This savory, Succulent Nut Sack will leave you drooling! A decadent mix of white and milk chocolate chips, raisins, dried cranberries, peanuts, almonds, and cashews. As if that wasn't enough to make you nut...I mean, go nuts...we've topped it off with our delicious honey cashew vanilla granola. This organic Succulent Nut Sack is the thing of your wildest trail mix dreams!",
    labelSrc: '../../../assets/succulent_nut_sack_label.png'
  },
  {
    id: '2',
    imageSrc: '../../../assets/keto_nut_sack.png',
    price: 17.99,
    inStock: true,
    title: 'Keto Nut Sack',
    subtitle: 'Healthy Nut Guys',
    description:
      'This blend of nuts and seeds is perfect for your ketogenic lifestyle! The nut blend of peanuts, Brazil nuts, almonds, and pecans mixed with sesame and sunflower seeds will help keep you in ketosis while providing essential fats, vitamins, and antioxidants. This organic, high-fiber Nut Sack will keep you full, ripped, and craving more of our nuts!',
    labelSrc: '../../../assets/keto_nut_sack_label.png'
  },
  {
    id: '3',
    imageSrc: '../../../assets/energy_nut_sack.png',
    price: 17.99,
    inStock: false,
    title: 'Energy Nut Sack',
    subtitle: 'Healthy Nut Guys',
    description:
      "Energize your Nut Sack with this awesome mix! Almonds, peanuts, and cashews provide long-lasting energy (you're welcome ladies) while the bananas, apple rings, and raisins will provide a quick boost in energy levels! For even more energy, we've topped it off with coconut, dark chocolate chips, and pumpkin seeds. All ingredients are organic so you can enjoy the natural stamina without the crash.",
    labelSrc: '../../../assets/energy_nut_sack_label.png'
  },
  {
    id: '4',
    imageSrc: '../../../assets/custom_nut_sack.png',
    price: 17.99,
    inStock: true,
    title: 'Custom Nut Sack',
    subtitle: 'Healthy Nut Guys',
    description:
      "You tell us how you want our Nut Sack! With the Custom Nut Sack, you get to choose from all of our ingredients to create the Nut Sack you've always wanted! As always, we will fill this Nut Sack with only organic ingredients to provide you with the highest quality, best tasting Nut Sack you have ever had!",
    labelSrc: '../../../assets/custom_nut_sack.png'
  }
];
