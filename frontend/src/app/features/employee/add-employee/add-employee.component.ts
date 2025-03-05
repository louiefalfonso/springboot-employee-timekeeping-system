import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-add-employee',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

}
