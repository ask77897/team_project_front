package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.CommentsVO;

public interface CommentsDAO {
	public List<HashMap<String, Object>> list();
	public HashMap<String, Object> read(int cid);
	public void insert(CommentsVO vo);
	public void update(CommentsVO vo);
	public void delete(int cid);
}
