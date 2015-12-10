package own.controller;

import own.model.Blog;

import com.jfinal.core.Controller;

public class IndexController extends Controller {

	private final int PAGE_NUM = 3;

	// 查询所有的记录
	public void index() {
		renderJson("findAll", Blog.blog.find("select * from blog"));
	}

	public void list() {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from blog");
		sql.append(" limit " + (getParaToInt("currentPage") - 1) * PAGE_NUM
				+ "," + PAGE_NUM);
		renderJson("list", Blog.blog.find(sql.toString()));
	}

	public void listCount() {
		renderJson("listCount",
				Blog.blog.find("select count(1) as total from blog"));
	}
}
