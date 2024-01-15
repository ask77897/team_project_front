package com.example.controller;

import java.io.File;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.dao.MarketDAO;
import com.example.domain.MCommentsVO;
import com.example.domain.MarketVO;
import com.example.domain.QueryVO;
import com.example.service.MarketService;

@RestController
@RequestMapping("/market")
public class MarketController {
	@Autowired
	MarketDAO dao;
	
	@Autowired
	MarketService service;
	
	@GetMapping("/list.json") 
	public HashMap<String, Object> list(QueryVO vo) {
		System.out.println(vo.toString());
		return service.list(vo);
	}
	
	@GetMapping("/delete")
	public void delete(int sid) {
		dao.delete(sid);
	}
	
	@GetMapping("/read/{sid}")
	public HashMap<String, Object> read(@PathVariable int sid){
		return dao.read(sid);
	}
	
	@GetMapping("/info/{sid}")
	public HashMap<String, Object> info(@PathVariable int sid, String uid){
		return service.read(sid, uid);
	}
	
	@GetMapping("/comment/list.json")
	public HashMap<String, Object> comment(int sid, int page, int size){
		HashMap<String, Object> map = new HashMap<>();
		map.put("list", dao.comment(sid, page, size));
		map.put("total", dao.commTotal(sid));
		return map;
	}
	
	@PostMapping("/photo")
	public void photo(MarketVO vo, MultipartHttpServletRequest multi) {
		MultipartFile file = multi.getFile("file");
		String path = "/upload/project/";
		String fileName = System.currentTimeMillis() + ".jpg";
		try {
			file.transferTo(new File("c:" + path + fileName));
			vo.setPhoto(path + fileName);
			dao.photoUp(vo);
		}catch (Exception e) {
			System.out.println("이미지 변경 오류 : " + e.toString());
		}
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody MarketVO vo) {
		service.photoIn(vo);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody MarketVO vo) {
		dao.update(vo);
	}
	
	@PostMapping("/comment/insert")
	public void incomm(@RequestBody MCommentsVO vo) {
		service.inComm(vo);
	}
	
	@PostMapping("/comment/delete/{mcid}")
	public void delcomm(@PathVariable int mcid) {
		service.delComm(mcid);
	}
	
	@PostMapping("/comment/update")
	public void upcomm(@RequestBody MCommentsVO vo) {
		dao.commUp(vo);
	}
}
