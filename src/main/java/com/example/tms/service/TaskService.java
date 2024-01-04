package com.example.tms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tms.model.Task;
import com.example.tms.repository.TaskRepository;


@Service
public class TaskService {
	@Autowired
	public TaskRepository taskRepo;

	public List<Task> getAlltasks()
	{
		List<Task> tasks = new ArrayList<>();
		taskRepo.findAll().forEach(tasks::add);
		return tasks;
	}

	public void addtask(Task task) {
		taskRepo.save(task);
		
	}

	public Task gettask(long id) {
		return taskRepo.findById(id).orElse(null);
	}

	public void updatetask(long id, Task task) {
		taskRepo.save(task);
		
	}

	public void deletetask(long id) {
		taskRepo.deleteById(id);
		
	}
}
