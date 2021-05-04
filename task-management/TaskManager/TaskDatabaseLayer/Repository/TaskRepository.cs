using System;
using System.Collections.Generic;
using MongoDB.Driver;
using TaskManager.Models;

namespace TaskDManagerDatabaseLayer.Repository
{
    public class TaskRepository
    {
        private readonly IMongoCollection<Task> _task;
        public TaskRepository(ITasksDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _task = database.GetCollection<Task>(settings.TasksCollectionName);
        }
        public List<Task> Get(string userEmail) =>
            _task.Find(Task => Task.User == userEmail).ToList();

        public Task Get(string userEmail,string id) =>
            _task.Find<Task>(Task => Task.Id == id && Task.User == userEmail).FirstOrDefault();

        public Task Create(string userEmail ,Task Task)
        {
            Task.User = userEmail;
            _task.InsertOne(Task);
            return Task;
        }

        public bool Update(string userEmail, string id, Task TaskIn)
        {
            var updatedTask =_task.ReplaceOne(Task => Task.Id == id && Task.User == userEmail, TaskIn);
            if(updatedTask.IsAcknowledged && updatedTask.ModifiedCount !=0 )
            {
                return true;
            } else
            {
                return false;
            }
        }


        public bool Remove(string userEmail, string id) {
            var result = _task.DeleteOne(Task => Task.Id == id && Task.User == userEmail);
            if (result.IsAcknowledged)
            {
                return true;
            } else
            {
                return false;
            }
                }

    }
}

