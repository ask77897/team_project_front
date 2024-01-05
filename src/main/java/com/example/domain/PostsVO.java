package com.example.domain;

import java.util.Date;

public class PostsVO {
	private int pid;
	private String writer;
	private String title;
	private String contents;
	private Date regdate;
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	@Override
	public String toString() {
		return "PostsVO [pid=" + pid + ", writer=" + writer + ", title=" + title + ", contents=" + contents
				+ ", regdate=" + regdate + "]";
	}
	
}
