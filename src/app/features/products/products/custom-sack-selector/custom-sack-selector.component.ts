import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NotificationService } from 'app/core/core.module';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface IngredientNode {
  name: string;
  children?: IngredientNode[];
}

const TREE_DATA: IngredientNode[] = [
  {
    name: 'Nuts',
    children: [
      { name: 'Almonds' },
      { name: 'Brazil Nuts' },
      { name: 'Cachews' },
      { name: 'Peanuts' },
      { name: 'Pecans' },
      { name: 'Pistachios' },
      { name: 'Walnuts' }
    ]
  },
  {
    name: 'Fruits',
    children: [
      { name: 'Apple Rings' },
      { name: 'Apricots' },
      { name: 'Bananas' },
      { name: 'Cranberries with cane sugar' },
      { name: 'Coconut' },
      { name: 'Dates' },
      { name: 'Mango' },
      { name: 'Peaches' },
      { name: 'Pears' },
      { name: 'Pineapple' },
      { name: 'Raisins' },
      { name: 'Sweet Cherries' }
    ]
  },
  {
    name: 'Seeds',
    children: [{ name: 'Flax' }, { name: 'Hemp' }, { name: 'Pumpkin (hulled)' }, { name: 'Sesame (hulled)' }, { name: 'Sunflower (hulled)' }]
  },
  {
    name: 'Granola',
    children: [{ name: 'Gluten Free Granola' }, { name: 'Honey Cachew Vanila' }, { name: 'Choclate Hazelnut Fig' }]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface CustomSackWeight {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'thng-custom-sack-selector',
  templateUrl: './custom-sack-selector.component.html',
  styleUrls: ['./custom-sack-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSackSelectorComponent implements OnInit {
  private _transformer = (node: IngredientNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  availableWeights: CustomSackWeight[] = [
    { value: '4-oz', viewValue: '4oz' },
    { value: '8-oz', viewValue: '8oz' },
    { value: '12-oz', viewValue: '12oz' },
    { value: '16-oz', viewValue: '16oz' }
  ];

  constructor(private notificationService: NotificationService) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {}

  onRemoveFromMix(): void {}

  onAddToMix(): void {
    this.notificationService.info('5oz / 16oz. Remaining 14oz');
  }
}
