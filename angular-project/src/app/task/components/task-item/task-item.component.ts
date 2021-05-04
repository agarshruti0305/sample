import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isHttpInterceptorRouteConfig } from '@auth0/auth0-angular';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() selectedTask:Task;
  @Output() updateSelectedTask= new EventEmitter();
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }
  deleteTask() {
    this.taskService.deleteTask(this.selectedTask.id).subscribe((response)=> {
      this.updateSelectedTask.emit(true);
    })
  }
}
