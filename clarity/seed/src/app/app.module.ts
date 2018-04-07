import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        ButtonComponent,
        CheckboxComponent,
        DropdownComponent,
        InputFieldComponent,
        ModalComponent,
        RadioButtonComponent,
        SelectBoxComponent,
        TableComponent,
        ToggleSwitchComponent,
        TooltipComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
