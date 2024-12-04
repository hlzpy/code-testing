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

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() jsonData: Record<string, any> = {}; // 输入的 JSON 数据
  @Input() formGroup: any; // 动态生成的主表单组
  fieldType = FieldType;
  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    if (this.jsonData) {
      this.buildForm(this.jsonData);
    }
  }

  /**
   * 构建动态表单
   */
  buildForm(data: Record<string, any>): void {
    if (!this.formGroup) {
      this.formGroup = this.fb.group({});
    }
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        if (this.isObjectArray(value)) {
          const formArray = this.fb.array(
            value.map((item) => this.createGroupForObject(item))
          );
          this.formGroup.addControl(key, formArray);
        } else {
          this.formGroup.addControl(key, this.fb.control(value[0] ?? null));
        }
      } else if (this.isObject(value)) {
        const nestedGroup = this.fb.group({});
        this.buildFormGroup(nestedGroup, value);
        this.formGroup.addControl(key, nestedGroup);
      } else {
        this.formGroup.addControl(key, this.fb.control(value));
      }
    });
    console.log(this.formGroup);
  }

  /**
   * 构建嵌套对象表单
   */
  buildFormGroup(group: FormGroup, data: Record<string, any>): void {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        if (this.isObjectArray(value)) {
          const formArray = this.fb.array(
            value.map((item) => this.createGroupForObject(item))
          );
          group.addControl(key, formArray);
        } else {
          group.addControl(key, this.fb.control(value[0] ?? null));
        }
      } else if (this.isObject(value)) {
        const nestedGroup = this.fb.group({});
        this.buildFormGroup(nestedGroup, value);
        group.addControl(key, nestedGroup);
      } else {
        group.addControl(key, this.fb.control(value));
      }
    });
  }

  /**
   * 创建对象数组中的表单组
   */
  createGroupForObject(data: Record<string, any>): FormGroup {
    const group = this.fb.group({});
    this.buildFormGroup(group, data);
    return group;
  }

  /**
   * 判断是否为对象
   */
  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  /**
   * 判断是否为对象数组
   */
  isObjectArray(value: any[]): boolean {
    return value.every((item) => this.isObject(item));
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  /**
   * 获取 AbstractControl 类型
   */
  getFormControl(key: string) {
    return this.formGroup.get(key);
  }

  /**
   * 获取表单的所有键
   */
  formKeys(data: Record<string, any>): string[] {
    return Object.keys(data);
  }

  /**
   * 提交表单
   */
  onSubmit(): void {
    console.log('Form Value:', this.formGroup.value);
  }

  onClick() {
    console.log(this.formGroup);
  }

  isISO8601(str: string): boolean {
    const regex = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:\d{2})$/;
    return regex.test(str);
}

  getFiledType(value: any): FieldType {
    // if (!value) {
    //   return FieldType.Unknown;
    // }
    if (value === true || value === false) {
      return FieldType.Boolean;
    }
    if (typeof value === 'number') {
      return FieldType.Number;
    }
    if (typeof value === 'string') {
      return FieldType.String;
    }
    if (this.isISO8601(value) && new Date(value).getTime()) {
      return FieldType.Date;
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
