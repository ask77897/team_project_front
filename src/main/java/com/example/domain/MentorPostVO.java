package com.example.domain;

import java.util.Date;

public class MentorPostVO {
	private int mpid;
	private String mtid;
	private String writer;
	private String title;
	private String contents;
	private Date regdate;
	
	public int getMpid() {
		return mpid;
	}
	public void setMpid(int mpid) {
		this.mpid = mpid;
	}
	public String getMtid() {
		return mtid;
	}
	public void setMtid(String mtid) {
		this.mtid = mtid;
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
		return "MentorPostVO [mpid=" + mpid + ", mtid=" + mtid + ", writer=" + writer + ", title=" + title
				+ ", contents=" + contents + ", regdate=" + regdate + "]";
	}
	
}
