import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsComponent } from './account-settings.component';


@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule
  ]
})
export class AccountSettingsModule { }
