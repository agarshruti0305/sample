import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { isHttpInterceptorRouteConfig } from '@auth0/auth0-angular';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit,OnChanges {
  @Input() selectedTask:Task;
  @Output() updateSelectedTask= new EventEmitter();
  disableUpdate = false;
  constructor(private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
   
    let date = formatDate(new Date(),'yyyy-MM-dd','en_US');
    let selectedDate = formatDate(this.selectedTask.taskDate,'yyyy-MM-dd','en_US');
    if (this.selectedTask.taskStatus === 1 || selectedDate< date){
      this.disableUpdate = true;
    } else {
      this.disableUpdate = false;
    }
  }

  ngOnInit(): void {
  }
  deleteTask() {
    this.taskService.deleteTask(this.selectedTask.id).subscribe((response)=> {
      this.updateSelectedTask.emit({delet:true});
    }, error => {
        this.updateSelectedTask.emit({delet: false});
    })
  }

  updateTask() {
    this.selectedTask.taskStatus = 1;
    this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe((response)=> {
      this.disableUpdate = true;
      this.updateSelectedTask.emit({updat:true});

    }, error => {
      this.updateSelectedTask.emit({updat:false});
    })
  }
}
