package own.controller;

import own.model.Blog;
import own.model.SubType;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

public class NoteController extends Controller {

	private final int PAGE_NUM = 3;
	
	// 条件查询
	@ActionKey("/noteDetail")
	public void noteDetail() {
		StringBuilder s = new StringBuilder();
		s.append("select title,content,time "
				+ "from blog "
				+ "where id=");
		s.append(getPara("id"));
		renderJson("noteDetail", Blog.blog.find(s.toString()));
	}
	
	@ActionKey("/noteList")
	public void noteList() {
		StringBuilder sql = new StringBuilder();
		sql.append("select id,title,content,time "
				+ "from blog "
				+ "where blog_type_id=");
		sql.append(getPara("tid"));
		if(getParaToInt("subType") != -1)
			sql.append(" and blog_subtype_id=" + getParaToInt("subType"));
		sql.append(" limit " + (getParaToInt("currentPage") - 1) * PAGE_NUM
				+ "," + PAGE_NUM);
		renderJson("noteList", Blog.blog.find(sql.toString()));
	}
	
	@ActionKey("/noteListCount")
	public void noteListCount() {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) as total "
				+ "from blog "
				+ "where blog_type_id=");
		sql.append(getPara("tid"));
		if(getParaToInt("subType") != -1)
			sql.append(" and blog_subtype_id=" + getParaToInt("subType"));
		renderJson("noteListCount", Blog.blog.find(sql.toString()));
	}
	
	@ActionKey("/readingList")
	public void readingList() {
		StringBuilder sql = new StringBuilder();
		sql.append("select id,title,content,time "
				+ "from blog "
				+ "where blog_type_id=");
		sql.append(getPara("tid"));
		renderJson("readList", Blog.blog.find(sql.toString()));
	}
	
	@ActionKey("/subTypeList")
	public void subTypeList() {
		StringBuilder sql = new StringBuilder();
		sql.append("select subtype.id,subtype.name,count(1) as blogNum "
				+ "from blog,subtype "
				+ "where blog_subtype_id = subtype.id "
				+ "group by subtype.name");
		renderJson("subTypeList", SubType.subType.find(sql.toString()));
	}

}
