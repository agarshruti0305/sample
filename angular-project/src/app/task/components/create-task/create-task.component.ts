import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
task:Task = new Task();
message = "";
  constructor(private taskService: TaskService, private router:Router) { }

  ngOnInit(): void {
    this.task.taskName = "";
  }

  createTask() {
    this.taskService.createTask(this.task).subscribe((response)=> {
      this.router.navigateByUrl("task/task-list");
    }, error => {
      this.message = "Error while creating the task.";
    })
  }
  cancel() {
    this.router.navigateByUrl("task/task-list");
  }
}
