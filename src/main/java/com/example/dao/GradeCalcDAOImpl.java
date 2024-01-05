package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.GradecalcVO;

@Repository
public class GradeCalcDAOImpl implements GradeCalcDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.GradeCalcMapper";
	
	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}
	
	@Override
	public void insert(GradecalcVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(String uid) {
		session.delete(namespace + ".delete", uid);
	}

	@Override
	public void update(GradecalcVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public HashMap<String, Object> read(String uid) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read", uid);
	}
}