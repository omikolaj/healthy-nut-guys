import { environment as env } from '../../../environments/environment';
import { ShopItem } from 'app/core/models/shop-item.model';

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

export const features: ShopItem[] = [
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
