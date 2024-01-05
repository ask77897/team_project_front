package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.TimetableVO;

public interface TimetableDAO {
	public List<HashMap<String, Object>> list();
	public HashMap<String, Object> read(String uid);
	public void insert(TimetableVO vo);
	public void delete(int pid);
	public void update(TimetableVO vo);

}
