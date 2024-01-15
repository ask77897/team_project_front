package com.example.domain;

public class TimetableVO {
	private String uid;
	private String contents;
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	@Override
	public String toString() {
		return "TimeTableVO [uid=" + uid + ", contents=" + contents + "]";
	}
	
}
