import { Component, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';

enum FieldType {
  Number = 'Number',
  Boolean = 'bool',
  String = 'string',
  Date = 'date',
  Object = 'object',
  SimpleArray = 'simpleArray',
  ObjectArray = 'objectArray',
  Unknown = 'unknown',
}

type DataItem = Record<string, any>;

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() jsonData: DataItem = {};
  @Input() formGroup!: FormGroup | any;
  fieldType = FieldType;

  currentAllFields: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    if (this.jsonData) {
      this.buildForm(this.jsonData);
      this.currentAllFields = Object.keys(this.jsonData)?.filter(
        (item) => item !== 'expand'
      );
      // add expand field
      Object.keys(this.jsonData).forEach((key) => {
        if (this.getFiledType(this.jsonData[key]) === FieldType.Object) {
          this.jsonData[key].expand = true;
        }
      });
    }
  }

  /**
   * building dynamic form
   */
  buildForm(data: DataItem): void {
    if (!this.formGroup) {
      this.formGroup = this.fb.group({});
    }
    this.buildFormGroup(this.formGroup, data);
  }

  /**
   * build a nested object form
   */
  buildFormGroup(group: FormGroup, data: DataItem): void {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      switch (this.getFiledType(value)) {
        case FieldType.ObjectArray:
          const formArray = this.fb.array(
            value.map((item: DataItem[]) =>
              this.createGroupForObject(item)
            )
          );
          group.addControl(key, formArray);
          break;
        case FieldType.SimpleArray:
          group.addControl(key, this.fb.control(value[0] ?? null));
          break;
        case FieldType.Object:
          const nestedGroup = this.fb.group({});
          this.buildFormGroup(nestedGroup, value);
          group.addControl(key, nestedGroup);
          break;
        default:
          group.addControl(key, this.fb.control(value));
      }
    });
  }

  /**
   * gets all keys for the form
   */
  formKeys(data: DataItem): string[] {
    return Object.keys(data).filter((key) => key !== 'expand');
  }

  /**
   * creates a form group in an object array
   */
  createGroupForObject(data: DataItem): FormGroup {
    const group = this.fb.group({});
    this.buildFormGroup(group, data);
    return group;
  }

  onExpandChange(jsonData: DataItem) {
    jsonData['expand'] = !jsonData['expand'];
  }

  isISO8601(str: string): boolean {
    const regex =
      /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:\d{2})$/;
    return regex.test(str);
  }

  getFiledType(value: any): FieldType {
    if (!value && value !== false && value !== 0) {
      return FieldType.Unknown;
    }
    if (this.isISO8601(value) && new Date(value).getTime()) {
      return FieldType.Date;
    }
    if (value === true || value === false) {
      return FieldType.Boolean;
    }
    if (typeof value === 'number') {
      return FieldType.Number;
    }
    if (typeof value === 'string') {
      return FieldType.String;
    }
    if (Array.isArray(value)) {
      if (value.every((item) => typeof item === 'object' && item !== null)) {
        return FieldType.ObjectArray;
      }
      return FieldType.SimpleArray;
    }
    if (value && typeof value === 'object') {
      return FieldType.Object;
    }
    return FieldType.Unknown;
  }
}
