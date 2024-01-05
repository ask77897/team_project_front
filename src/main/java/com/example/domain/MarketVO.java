package com.example.domain;

import java.util.Date;

public class MarketVO {
	private int sid;
	private String uid;
	private String title;
	private String photo;
	private String contents;
	private int price;
	private int category;
	private Date regdate;
	private String photonum;
	public String getPhotonum() {
		return photonum;
	}
	public void setPhotonum(String photonum) {
		this.photonum = photonum;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	@Override
	public String toString() {
		return "MarketVO [sid=" + sid + ", uid=" + uid + ", title=" + title + ", photo=" + photo + ", contents="
				+ contents + ", price=" + price + ", category=" + category + ", regdate=" + regdate + ", photonum="
				+ photonum + "]";
	}
	
	
}
