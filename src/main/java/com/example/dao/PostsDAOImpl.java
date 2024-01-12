package com.example.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.PostsVO;

@Repository
public class PostsDAOImpl implements PostsDAO{
	@Autowired
	SqlSession session;
	String namespace="com.example.mapper.PostsMapper";
	
	@Override
	public List<HashMap<String, Object>> list() {
		return session.selectList(namespace + ".list");
	}
	
	@Override
	public void insert(PostsVO vo) {
		session.insert(namespace + ".insert", vo);
	}

	@Override
	public void delete(int pid) {
		session.delete(namespace + ".delete", pid);
	}

	@Override
	public void update(PostsVO vo) {
		session.update(namespace + ".update", vo);
	}

	@Override
	public HashMap<String, Object> read(int pid) {
		// TODO Auto-generated method stub
		return session.selectOne(namespace + ".read", pid);
	}

}