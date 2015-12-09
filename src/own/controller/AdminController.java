package own.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;

import own.model.Blog;

public class AdminController extends Controller {

	@ActionKey("/adminFindAllNote")
	public void adminFindAllNote() {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from blog");
		List<Blog> list = Blog.blog.find(sql.toString());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for(Blog blog : list) {
			blog.set("time", sdf.format(blog.getTimestamp("time")));
		}
		renderJson("findAllNote", list);
	}

}
