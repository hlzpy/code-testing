import { Component, Input } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  @Input() jsonData: Record<string, any> = {}; // 输入的 JSON 数据
  formGroup = this.fb.group({}); // 动态生成的主表单组

  constructor(private fb: FormBuilder, private msgSvc: NzMessageService) {}

  onSubmit() {
    const formValue = this.formGroup.getRawValue();
    if (Object.keys(formValue).length === 0) {
      this.msgSvc.warning('Please choose an option');
      return;
    }
    this.msgSvc.success('Please view the saved form data in the console');
    console.log('Form Values:', this.formGroup.getRawValue());
  }
}
