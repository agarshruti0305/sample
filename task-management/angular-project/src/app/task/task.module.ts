import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListTaskComponent, CreateTaskComponent, TaskComponent, TaskItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class TaskModule { }
