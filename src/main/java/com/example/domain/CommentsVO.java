package com.example.domain;

import java.util.Date;

public class CommentsVO {
	private String cid;
	private String uid;
	private int mpid;
	private String mtid;
	private String comments;
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
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	@Override
	public String toString() {
		return "CommentsVO [cid=" + cid + ", uid=" + uid + ", mpid=" + mpid + ", mtid=" + mtid + ", comments="
				+ comments + ", regdate=" + regdate + "]";
	}
	
}
