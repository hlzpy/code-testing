import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './my-form/dynamic-form/dynamic-form.component';
import { FormFieldComponent } from './my-form/form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectFormComponent } from './select-form/select-form.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    FormFieldComponent,
    SelectFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NzTabsModule,
    NzSelectModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
