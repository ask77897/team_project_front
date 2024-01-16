package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.MentorDAO;
import com.example.domain.MentorVO;
import com.example.domain.QueryVO;

@RestController
@RequestMapping("/mentor")
public class MentorController {
	@Autowired
	MentorDAO dao;
	
	@GetMapping("/list.json")
	public List<HashMap<String, Object>> list(QueryVO vo) {
		return dao.list(vo);
	}
	
	@GetMapping("/read")
	public HashMap<String, Object> read(String mtid){
		return dao.read(mtid);
	}
	
	@PostMapping("/delete")
	public void delete(String mtid) {
		dao.delete(mtid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody MentorVO vo) {
		dao.update(vo);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody MentorVO vo) {
		String mtid = UUID.randomUUID().toString().substring(0, 10);
		vo.setMtid(mtid);
		dao.insert(vo);
	}
}
