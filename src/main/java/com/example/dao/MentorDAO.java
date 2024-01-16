package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.MentorVO;
import com.example.domain.QueryVO;

public interface MentorDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public HashMap<String, Object> read(String mtid);
	public void insert(MentorVO vo);
	public void update(MentorVO vo);
	public void delete(String mtid);
}
