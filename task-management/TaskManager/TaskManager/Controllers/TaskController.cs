using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TaskManager.Models;
using TaskManager.Services;
using TaskManagerDomain.Models;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<Task>> GetListofTasks([FromHeader] string userEmail)
        {
            return _taskService.GetListofTasks(userEmail);
        }

        [HttpGet("{id}")]
        public ActionResult<Task> Get([FromHeader] string userEmail, string id)
        {
            var task = _taskService.GetTaskById(userEmail, id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }
        [HttpPost]
        public ActionResult<Task> Create([FromHeader] string userEmail, Task task)
        { 
           var newTask= _taskService.CreateTask(userEmail, task);;

            return Ok(newTask);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromHeader] string userEmail, string id, Task taskToBeUpdated)
        {
            if (taskToBeUpdated.TaskStatus == Status.Completed)
            {
                Task t = _taskService.GetTaskById(userEmail, id);
                if (t != null)
                {
                    t.TaskStatus = taskToBeUpdated.TaskStatus;
                    var task = _taskService.UpdateTask(userEmail, id, t);
                    if (task)
                    {
                        return Ok(task);
                    }
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromHeader] string userEmail, string id)
        {
            var task = _taskService.GetTaskById(userEmail, id);

            if (task == null)
            {
                return NotFound();
            }

            bool deleted = _taskService.deleteTask(userEmail, task.Id);

            if(deleted)
            {
                return NoContent();
            } else
            {
                return BadRequest();
            }
                
            
        }
    }
}
