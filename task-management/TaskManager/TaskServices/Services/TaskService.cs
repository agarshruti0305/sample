using System;
using System.Collections.Generic;
using MongoDB.Driver;
using TaskDManagerDatabaseLayer.Repository;
using TaskManager.Models;
using TaskManagerDomain.Models;

namespace TaskManager.Services
{

    public class TaskService
    {
        public TaskRepository _taskRepository;
        public TaskService(TaskRepository taskRepository)
        {
            this._taskRepository = taskRepository;
        }

        public Task CreateTask(string userEmail, Task task)
        {
            Task createdTask = this._taskRepository.Create(userEmail, task);
            return createdTask;
        }

        public bool UpdateTask(string userEmail, string id,Task task)
        {
            if (task.TaskDate > new DateTime())
            {
                bool updatedTask = this._taskRepository.Update(userEmail, id, task);
                return updatedTask;
            } else
            {
                return false;
            }
        }
        public Task GetTaskById(string userEmail, string id)
        {
            Task task = this._taskRepository.Get(userEmail, id);
            return task;
        }

        public bool deleteTask(string userEmail, string id)
        {
            Task t = this._taskRepository.Get(userEmail, id);
            if (t != null)
            {
                bool deleted = this._taskRepository.Remove(userEmail, id);
                return deleted;
            } else
            {
                return false;
            }
        }

        public List<Task> GetListofTasks(string userEmail)
        {
            List<Task> list = this._taskRepository.Get(userEmail);
            return list;
        }

    }
}