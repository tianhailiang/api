/**
 * Created by DXZ-Shuqin.Wang on 2018/1/19.
 */
var node_wrap = require('./node_wrap.js');

exports = module.exports = function (app) {// routes
    /*接口封装* */
    app.get('/ucapi/ucapi_agent', node_wrap.ucapi_agent);
    app.post('/ucapi/ucapi_agent_post', node_wrap.ucapi_agent_post);
    //关注用户接口
    app.post("/soapi/follow_people",node_wrap.follow_people);
    //浏览量接口
    //app.get('/cmsapi/article_count', node_wrap.article_count);
    //token
    app.get('/token', node_wrap.check_token);
    /*node接口封装*/
    app.get('/cmsapi/assessment', node_wrap.assessment);//在线评估
    app.post('/cmsapi/online_booking', node_wrap.online_booking);//留学产品频道页在线预约
    app.get('/cmsapi/onlineBooking', node_wrap.onlineBooking);//留学活动文章底页在线预约
    app.post('/cmsapi/passageway', node_wrap.passageway);//留学快速申请通道
    app.post('/cmsapi/zixunCount', node_wrap.zixunCount);//留学乐语咨询
    app.get('/cmsapi/sign_up_way', node_wrap.sign_up_way);//商务合作
    app.get('/cmsapi/advert', node_wrap.advert);//留学广告
    app.get('/cmsapi/advert_clicknum', node_wrap.advert_clicknum);//留学广告计数

    app.get('/cmsapi/immi_poster', node_wrap.immi_poster);//移民广告
    app.get('/cmsapi/immi_poster_click', node_wrap.immi_poster_click);//移民广告计数
    app.post('/cmsapi/immi_activity_book', node_wrap.immi_activity_book);//移民活动预约
    app.get('/cmsapi/immi_case_plan', node_wrap.immi_case_plan);//移民方案定制

    //社区上传
    app.post('/cmsapi/input_upload',node_wrap.input_upload);//相册上传
    app.get('/cmsapi/user_edit_avatar',node_wrap.user_edit_avatar);//修改普通用户头像
    //搜索文章加载更多
    app.get('/cmsapi/load_more_article',node_wrap.load_more_article);
    //获取城市code码 接口
    app.get('/ip_geter',node_wrap.ip_geter);
    //文章置顶接口
    app.post('/article_top', node_wrap.article_top);
    app.get('/get_ip_geter',node_wrap.get_ip_geter);
};