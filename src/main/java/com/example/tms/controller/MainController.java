package com.example.tms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/")
	public String home() {
		return "index";
	}

	@GetMapping("/display.html")
	public String display() {
		return "display.html";
	}

	@GetMapping("/createtask.html")
	public String createpost() {
		return "createtask.html";
	}

	@GetMapping("/edittask.html")
	public String editpost() {
		return "edittask.html";
	}
}
