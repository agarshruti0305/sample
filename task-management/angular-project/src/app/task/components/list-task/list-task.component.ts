import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  selectedTask: Task;
  taskList = [];
  message="";
  createTaskModal = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getListOfItems();
  }

  getListOfItems() {
   
    for(let i =1;i<4;i++) {
      let t = new Task();
      t.id = i.toString();
      t.taskName = "demo"+i.toString();
      t.taskDate = new Date();
    this.taskList.push(t);
   
    } this.selectedTask = this.taskList[0];
  }
  updateSelectedTask(event:any) {
    if(event) {
      this.message="Task has been deleted successfully.";
      this.getListOfItems();
    } else {
      this.message="Error while delete the task";
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
