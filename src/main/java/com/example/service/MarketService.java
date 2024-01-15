package com.example.service;

import java.util.HashMap;

import com.example.domain.MCommentsVO;
import com.example.domain.MarketVO;
import com.example.domain.QueryVO;

public interface MarketService {
	public void inComm(MCommentsVO vo);
	public void delComm(int mcid);
	public HashMap<String, Object> list(QueryVO vo);
	public HashMap<String, Object> read(int sid, String uid);
	public void photoIn(MarketVO vo);
}
