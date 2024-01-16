package com.example.dao;

import java.util.HashMap;
import java.util.List;

import com.example.domain.MCommentsVO;
import com.example.domain.MarketVO;
import com.example.domain.QueryVO;

public interface MarketDAO {
	public List<HashMap<String, Object>> list(QueryVO vo);
	public HashMap<String, Object> read(int sid);
	public HashMap<String, Object> read(int sid, String uid);
	public int total(QueryVO vo);
	public List<HashMap<String, Object>> comment(int sid, int page, int size);
	public int commTotal(int mcid);
	public MCommentsVO commRead(int mcid);
	public int check(String photonum);
	public void insert(MarketVO vo);
	public void commIn(MCommentsVO vo);
	public void update(MarketVO vo);
	public void commUp(MCommentsVO vo);
	public void photoUp(MarketVO vo);
	public void viewcnt(int sid);
	public void commcnt(int sid, int amount);
	public void delete(int sid);
	public void commDel(int mcid);
}
