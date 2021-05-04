import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateTaskComponent } from './task/components/create-task/create-task.component';
import { ListTaskComponent } from './task/components/list-task/list-task.component';
import { TaskComponent } from './task/components/task/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'task', component:TaskComponent ,canActivate:[AuthGuard], children: [{
      path: 'task-list',component:ListTaskComponent
    },{
      path: 'createTask',component:CreateTaskComponent
    },
    { path: '', redirectTo: 'task/task-list', pathMatch: 'full' },
  ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
