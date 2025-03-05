import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './features/employee/add-employee/add-employee.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';

export const routes: Routes = [
    {
        path:"",
        component: DashboardComponent
    },
    {
        path:"employees",
        component: EmployeeListComponent
    },
    {
        path:"employees/add-employee",
        component: AddEmployeeComponent
    },
    
];
