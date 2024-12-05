import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnChanges {
  @Input() jsonData: Record<string, any> = {};
  formGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private msgSvc: NzMessageService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonData'] && changes['jsonData'].currentValue) {
      this.formGroup = this.fb.group({});
    }
  }

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
