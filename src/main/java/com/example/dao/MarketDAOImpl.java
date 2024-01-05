package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.MCommentsVO;
import com.example.domain.MarketVO;
import com.example.domain.QueryVO;

@Repository
public class MarketDAOImpl implements MarketDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.MarketMapper";

	@Override
	public List<HashMap<String, Object>> list(QueryVO vo) {
		vo.setStart((vo.getPage()-1)*vo.getSize());
		System.out.println(vo.toString());
		return session.selectList(namespace + ".list", vo);
	}

	@Override
	public HashMap<String, Object> read(int sid) {
		return session.selectOne(namespace + ".read", sid);
	}

	@Override
	public void insert(MarketVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void update(MarketVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public void delete(int sid) {
		session.delete(namespace + ".delete", sid);
	}

	@Override
	public int total(QueryVO vo) {
		return session.selectOne(namespace + ".total", vo);
	}

	@Override
	public List<HashMap<String, Object>> comment(int sid, int page, int size) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("sid", map);
		map.put("start", (page-1)*size);
		map.put("size", size);
		return session.selectList(namespace + ".comment", map);
	}

	@Override
	public int commTotal(int mcid) {
		return session.selectOne(namespace + ".commTotal", mcid);
	}

	@Override
	public void commIn(MCommentsVO vo) {
		session.insert(namespace + ".commIn", vo);
	}

	@Override
	public void commUp(MCommentsVO vo) {
		session.update(namespace + ".commUp", vo);
	}

	@Override
	public void viewcnt(int sid) {
		session.update(namespace + ".viewcnt", sid);
	}

	@Override
	public void commcnt(int sid, int amount) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("sid", sid);
		map.put("amount", amount);
		session.update(namespace + ".commcnt", map);
	}

	@Override
	public void commDel(int mcid) {
		session.delete(namespace + ".commDel", mcid);
	}

	@Override
	public MCommentsVO commRead(int mcid) {
		return session.selectOne(namespace + ".read", mcid);
	}

	@Override
	public HashMap<String, Object> read(int sid, String uid) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("sid", sid);
		map.put("uid", uid);
		return session.selectOne(namespace + ".info", map);
	}

	@Override
	public void photoUp(MarketVO vo) {
		session.update(namespace + ".photoUp", vo);
	}

	@Override
	public int check(String photonum) {
		return session.selectOne(namespace + ".check", photonum);
	}
}
