import { schema } from 'normalizr';

const shopItem = new schema.Entity('shopItems');

export const shopItemsSchema = [shopItem];
