/**
 * Created by DXZ-Shuqin.Wang on 2018/1/19.
 */
var node_wrap = require('./node_wrap.js');

exports = module.exports = function (app) {// routes
    /* 接口代理封装 */
    app.get('/ucapi/ucapi_agent', node_wrap.ucapi_agent);
    app.get('/ucapi/ucapi_agent_post', node_wrap.ucapi_agent_post);
    //关注用户 接口
    app.post("/soapi/follow_people",node_wrap.follow_people);
    //文章点击量
    //app.get('/cmsapi/article_count', node_wrap.article_count);
    //token
    app.get('/token', node_wrap.check_token);
    /*node�ӿڷ�װ*/
    app.get('/cmsapi/assessment', node_wrap.assessment);    //在线评估
    app.post('/cmsapi/online_booking', node_wrap.online_booking);   //在线预约
    app.get('/cmsapi/onlineBooking', node_wrap.onlineBooking);  //在线预约
    app.post('/cmsapi/passageway', node_wrap.passageway);//��ѧ��������ͨ��
    app.post('/cmsapi/zixunCount', node_wrap.zixunCount);//��ѧ������ѯ
    app.get('/cmsapi/sign_up_way', node_wrap.sign_up_way);//�������
    app.get('/cmsapi/advert', node_wrap.advert);//��ѧ���
    app.get('/cmsapi/advert_clicknum', node_wrap.advert_clicknum);//��ѧ������

    app.get('/cmsapi/immi_poster', node_wrap.immi_poster);//������
    app.get('/cmsapi/immi_poster_click', node_wrap.immi_poster_click);//���������
    app.post('/cmsapi/immi_activity_book', node_wrap.immi_activity_book);//����ԤԼ
    app.get('/cmsapi/immi_case_plan', node_wrap.immi_case_plan);//���񷽰�����

    //�����ϴ�
    app.post('/cmsapi/input_upload',node_wrap.input_upload);//����ϴ�
    app.get('/cmsapi/user_edit_avatar',node_wrap.user_edit_avatar);//�޸���ͨ�û�ͷ��
    //�������¼��ظ���
    app.get('/cmsapi/load_more_article',node_wrap.load_more_article);
    //��ȡ����code�� �ӿ�
    app.get('/ip_geter',node_wrap.ip_geter);
    //�����ö��ӿ�
    app.post('/article_top', node_wrap.article_top);
    app.get('/get_ip_geter',node_wrap.get_ip_geter);
    app.get('/dialing_log',node_wrap.dialing_log)
};