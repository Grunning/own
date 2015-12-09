package own.config;

import own.controller.AdminController;
import own.controller.IndexController;
import own.controller.NoteController;
import own.model.Blog;
import own.model.SubType;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;

public class OwnConfig extends JFinalConfig {
	public void configConstant(Constants me) {
		me.setDevMode(true);//开发模式，会打印请求信息
	}
	
	/**
	 * 配置访问路由
	 */
	public void configRoute(Routes me) {
		me.add("/", IndexController.class);
		me.add("/note", NoteController.class);
		me.add("/admin", AdminController.class);
	}

	/**
	 * 配置插件
	 */
	public void configPlugin(Plugins me) {
//		loadPropertyFile("config.txt");
		C3p0Plugin c3p0Plugin = 
				new C3p0Plugin("jdbc:mysql://127.0.0.1/own?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull",
						"root","1234"/*getProperty("url"),
						getProperty("username"),getProperty("password")*/);
		me.add(c3p0Plugin);
		ActiveRecordPlugin arp = 
				new ActiveRecordPlugin(c3p0Plugin);
		me.add(arp);
		//配置数据库映射文件
		arp.addMapping("blog", Blog.class);
		arp.addMapping("subtype", SubType.class);
	}

	/**
	 * 配置拦截器
	 */
	public void configInterceptor(Interceptors me) {
	}

	/**
	 * 配置处理器，Handler可接管所有Web请求，并对应用拥有完全的控制权，
	 * 可以很方便地实现更高层的功能性扩展
	 */
	public void configHandler(Handlers me) {
	}
}
