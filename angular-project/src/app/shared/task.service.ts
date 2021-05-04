import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../constants/globalCOnstants';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getList() {
    return this.httpClient.get(`${GlobalConstants.apiUrl}/task`);
  }

  getTaskById(id:string) {
    return this.httpClient.get(`${GlobalConstants.apiUrl}/task/${id}`);
  }

  createTask(task:Task) {
    return this.httpClient.post(`${GlobalConstants.apiUrl}/task/`,task);
  }

  updateTask(id:string ,task:Task) {
    return this.httpClient.put(`${GlobalConstants.apiUrl}/task/${id}`,task)
  }

  deleteTask(id:string) {
    return this.httpClient.delete(`${GlobalConstants.apiUrl}/task/${id}`);
  }
}
