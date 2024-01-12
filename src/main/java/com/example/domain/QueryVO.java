package com.example.domain;

public class QueryVO {
	private String query;
	private int page;
	private int size;
	private int start;
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	@Override
	public String toString() {
		return "QueryVO [query=" + query + ", page=" + page + ", size=" + size + ", start=" + start + "]";
	}

}