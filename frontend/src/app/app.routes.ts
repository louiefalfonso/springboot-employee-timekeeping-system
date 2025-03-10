import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './features/employee/add-employee/add-employee.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';
import { DepartmentListComponent } from './features/department/department-list/department-list.component';
import { AddDepartmentComponent } from './features/department/add-department/add-department.component';
import { EditDepartmentComponent } from './features/department/edit-department/edit-department.component';

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
        path:"employees/add",
        component: AddEmployeeComponent
    },
    {
        path:"employees/edit/:id",
        component: EmployeeListComponent
    },
    {
        path:"departments",
        component: DepartmentListComponent
    },
    {
        path:"departments/add",
        component: AddDepartmentComponent
    },
     {
        path:"departments/edit/:id",
        component: EditDepartmentComponent
    },
    
];
