package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.MentorPostVO;

@Repository
public class MentorPostDAOImpl implements MentorPostDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.MentorPostMapper";
	@Override
	public List<HashMap<String, Object>> list() {
		// TODO Auto-generated method stub
		return session.selectList(namespace + ".list");
	}
	@Override
	public HashMap<String, Object> read(int mpid) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read");
	}
	@Override
	public void insert(MentorPostVO vo) {
		// TODO Auto-generated method stub
		session.insert(namespace + ".insert", vo);
	}
	@Override
	public void update(MentorPostVO vo) {
		// TODO Auto-generated method stub
		session.update(namespace + ".update", vo);
	}
	@Override
	public void delete(int mpid) {
		// TODO Auto-generated method stub
		session.delete(namespace + ".delete", mpid);
	}
}
