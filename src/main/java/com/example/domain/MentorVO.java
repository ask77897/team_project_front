package com.example.domain;

import java.util.Date;

public class MentorVO {
	private String mtid;
	private String uid;
	private String mid;
	private Date regdate;
	
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public String getMtid() {
		return mtid;
	}
	public void setMtid(String mtid) {
		this.mtid = mtid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	@Override
	public String toString() {
		return "MentorVO [mtid=" + mtid + ", uid=" + uid + ", mid=" + mid + ", regdate=" + regdate + "]";
	}
	
}
