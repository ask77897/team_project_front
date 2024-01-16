package com.example.domain;

import java.util.Date;

public class MCommentsVO {
	private int mcid;
	private int sid;
	private String uid;
	private String body;
	private Date regdate;
	public int getMcid() {
		return mcid;
	}
	public void setMcid(int mcid) {
		this.mcid = mcid;
	}
	public int getSid() {
		return sid;
	}
	public void setSid(int sid) {
		this.sid = sid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	@Override
	public String toString() {
		return "MCommentsVO [mcid=" + mcid + ", sid=" + sid + ", uid=" + uid + ", body=" + body + ", regdate=" + regdate
				+ "]";
	}
	
}
