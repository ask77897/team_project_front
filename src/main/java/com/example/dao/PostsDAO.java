package com.example.dao;
import java.util.HashMap;
import java.util.List;

import com.example.domain.PostsVO;

public interface PostsDAO {
	public List<HashMap<String,Object>> list();
	public HashMap<String, Object> read(int pid);
	public void insert(PostsVO vo);
	public void delete(int pid);
	public void update(PostsVO vo);
}