/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ModalComponent } from './modal/modal.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { TableComponent } from './table/table.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { TooltipComponent } from './tooltip/tooltip.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'alerts', component: AlertComponent},
    {path: 'buttons', component: ButtonComponent},
    {path: 'checkboxes', component: CheckboxComponent},
    {path: 'dropdowns', component: DropdownComponent},
    {path: 'input-fields', component: InputFieldComponent},
    {path: 'modals', component: ModalComponent},
    {path: 'radios', component: RadioButtonComponent},
    {path: 'select-boxes', component: SelectBoxComponent},
    {path: 'select-boxes', component: SelectBoxComponent},
    {path: 'tables', component: TableComponent},
    {path: 'toggle-switches', component: ToggleSwitchComponent},
    {path: 'tooltips', component: TooltipComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
