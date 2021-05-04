import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  selectedTask: Task;
  taskList:any;
  message="";
  createTaskModal = false;
  constructor(private router:Router, private taskService:TaskService) { }

  ngOnInit(): void {
    this.getListOfItems();
  }

  getListOfItems() {
   this.taskService.getList().subscribe((response)=> {
     this.taskList = response;
     this.selectedTask = this.taskList[0];
   }, error => {
     this.message = error;
   });
    
  }
  updateSelectedTask(event:any) {
    let key = Object.keys(event)[0];
    if(event[key]) {
      
      this.message=`Task has been ${key}d successfully.`;
      if(key === 'delet') {
        this.getListOfItems();
      }
    } else {
      this.message=`Error while ${key}ing the task`;
    }
  }
  selectTask(t:Task) {
    this.selectedTask = t;
    this.taskList.forEach((e) =>  e.selected = false);
    this.selectedTask.selected = true;
  }
  createTask() {
    this.router.navigateByUrl("task/createTask");
  }
  
}
