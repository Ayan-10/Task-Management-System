package com.example.tms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.tms.model.Task;
import com.example.tms.service.TaskService;

@RestController
public class TaskController {
	@Autowired
	private TaskService taskService;

	@RequestMapping("/tasks")
	public List<Task> getAlltasks()
	{
		return taskService.getAlltasks();
	}

	@RequestMapping(method = RequestMethod.GET, value="/tasks/{id}")
	public Task findTaskById(@PathVariable int id) {
        return taskService.gettask(id);
    }

	@RequestMapping(method = RequestMethod.POST, value="/tasks")
	public void addtask(@RequestBody Task task)
	{
		taskService.addtask(task);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value="/tasks/{id}")
	public void updatetask(@PathVariable long id, @RequestBody Task task)
	{
		taskService.updatetask(id, task);
	}
	@RequestMapping(method = RequestMethod.DELETE, value="/tasks/{id}")
	public void Deletetask(@PathVariable long id)
	{
		taskService.deletetask(id);
	}
	
	
	
	
	
	
	
	
}
