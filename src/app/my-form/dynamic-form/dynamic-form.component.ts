import { Component, Input } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  @Input() jsonData: Record<string, any> = {}; // 输入的 JSON 数据
  formGroup!: FormGroup; // 动态生成的主表单组
}
