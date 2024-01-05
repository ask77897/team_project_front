package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.UserVO;

public interface UserDAO {
	public List<HashMap<String, Object>> list();
	public HashMap<String, Object> read(String uid);
	public void join(UserVO vo);
	public void update(UserVO vo);
	public void passUpdate(String upass);

}
