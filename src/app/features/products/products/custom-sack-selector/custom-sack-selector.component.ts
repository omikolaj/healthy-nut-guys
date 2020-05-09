import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { NotificationService } from 'app/core/core.module';
import { MixIngredientNode } from 'app/core/models/ingredient.model';
import { SelectOption } from 'app/core/models/select-option.model';
import { FormGroup, FormArray } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import { CustomSelectOption } from 'app/core/models/custom-select-option.model';

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'thng-custom-sack-selector',
  templateUrl: './custom-sack-selector.component.html',
  styleUrls: ['./custom-sack-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSackSelectorComponent implements OnInit {
  @Output() weightSelectionChange: EventEmitter<CustomSelectOption> = new EventEmitter();
  @Input() customSackForm: FormGroup;
  @Input() set selectOptions(value: CustomSelectOption[]) {
    // collator is necessary to sort strings with numbers 4oz, 16oz etc
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    // get the option names in sorted order first
    const sortedOptions = value
      .slice()
      .map(s => s.option)
      .sort(collator.compare);
    // create view options as SelectOption objects with ids
    this.viewSelectOptions = sortedOptions.map(o => {
      return {
        price: value.find(v => v.option.toLocaleLowerCase() === o)?.price,
        option: o
      } as CustomSelectOption;
    });
  }
  // used by the view to display select options once they've been sorted
  viewSelectOptions: CustomSelectOption[] = [];

  @Input() set mixIngredients(value: MixIngredientNode[]) {
    this.dataSource.data = value;
  }

  private _transformer = (node: MixIngredientNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      inStock: node.inStock,
      id: node.id
    };
  };
  treeControl = new FlatTreeControl<FlatNode>(
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
  hasChild = (_: number, node: FlatNode) => node.expandable;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  disableOption(option: CustomSelectOption): boolean {
    const mixOnHandControl = this.customSackForm['controls']['mixOnHand'];
    const optionWeight = +this.stripOzFromSelectOption(option.option);
    if (optionWeight) {
      return optionWeight < mixOnHandControl.value;
    }
    return false;
  }

  getIndexFor(attr, value): number {
    const formArray = this.customSackForm['controls']['ingredients'] as FormArray;
    for (var i = 0; i < formArray.length; i += 1) {
      if (formArray.at(i)['value'][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  onRemoveFromMix(index: number): void {
    const mixOnHandControl = this.customSackForm['controls']['mixOnHand'];
    const formArray = this.customSackForm['controls']['ingredients'] as FormArray;
    const abstractControl = formArray.at(index);
    if (mixOnHandControl) {
      if (abstractControl) {
        const currentValue = abstractControl.value['quantity'];
        if (currentValue > 0) {
          const newValue = currentValue - 1;
          abstractControl.patchValue({
            quantity: newValue
          });
          const mixOnHand = +mixOnHandControl.value;
          mixOnHandControl.patchValue(mixOnHand - 1);
        }
      }
    }
  }

  onAddToMix(index: number): void {
    const totalWeight = +this.stripOzFromSelectOption(this.customSackForm['controls']['totalWeight']?.value);
    const mixOnHandControl = this.customSackForm['controls']['mixOnHand'];
    const formArray = this.customSackForm['controls']['ingredients'] as FormArray;
    const abstractControl = formArray.at(index);
    if (totalWeight) {
      if (mixOnHandControl) {
        if (mixOnHandControl.value < totalWeight) {
          if (abstractControl) {
            const newValue = abstractControl.value['quantity'] + 1;
            abstractControl.patchValue({
              quantity: newValue
            });
            const mixOnHand = +mixOnHandControl.value;
            mixOnHandControl.patchValue(mixOnHand + 1);
            this.notificationService.info(
              `${mixOnHandControl.value}` + ' / ' + `${totalWeight}oz.` + ` You have ${totalWeight - mixOnHandControl.value} oz left`
            );
            mixOnHandControl.markAsDirty();
          }
        } else {
          this.notificationService.info(`${mixOnHandControl.value}` + ' / ' + `${totalWeight}` + 'oz ' + 'your nut sack is full!');
        }
      }
    }
  }

  onWeightSelectionChange(event: MatSelectChange): void {
    const option = this.viewSelectOptions.find(o => o.option.toLocaleLowerCase() === event.value.toLowerCase());
    if (option) {
      this.weightSelectionChange.emit(option);
    }
  }

  private stripOzFromSelectOption(option: string): string {
    if (option) {
      return option.replace(/\D/g, '');
    }
  }
}
