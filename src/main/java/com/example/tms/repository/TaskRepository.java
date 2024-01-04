package com.example.tms.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.tms.model.Task;


public interface TaskRepository extends CrudRepository<Task,Long> {
	

}
