package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.MentorPostVO;

public interface MentorPostDAO {
	public List<HashMap<String, Object>> list();
	public HashMap<String, Object> read(int mpid);
	public void insert(MentorPostVO vo);
	public void update(MentorPostVO vo);
	public void delete(int mpid);
}
