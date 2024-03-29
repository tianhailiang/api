/**
 * Created by DXZ-Shuqin.Wang on 2018/1/17.
 */
var cms = require('../model/cms');
var log4js = require('../log/log');
var log = log4js.getLogger();
var comfunc = require('../common/common');
var moment = require('moment');
var tokenfunc = require('./token.js');
var upyun = require('upyun');
var fs = require('fs');
var multiparty = require('multiparty');
var request = require('request');
var get_area_code = require('./ip_poll');
var config = require('../config/config');
var redis = require('redis');
var redis_db = require('redis-connection-pool')('ipCache', {
    host: config.redisCache.host,
    port: config.redisCache.port || 6379,
    max_clients: config.redisCache.max || 30,
    perform_checks: false,
    database: 12 // database number to use
  });
// 在线评估
exports.assessment = function (req, res, next) {
    data = req.query;
    cms.assessment(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
// online_booking
exports.online_booking = function (req, res, next) {
    data = req.body;
    cms.online_booking(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//onlineBooking
exports.onlineBooking = function (req, res, next) {
    data = req.query;
    cms.onlineBooking(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//immi_activity_book
exports.immi_activity_book = function (req, res, next) {
    data = req.body;
    cms.immi_activity_book(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//immi_case_plan
exports.immi_case_plan = function (req, res, next) {
    data = req.query;
    cms.immi_case_plan(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//passageway
exports.passageway = function (req, res, next) {
    data = req.body;
    cms.passageway(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//zixunCount
exports.zixunCount = function (req, res, next) {
    data = req.body;
    cms.zixunCount(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//advert
exports.advert = function (req, res, next) {
    data = req.query;
    cms.advert(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//immi_poster
exports.immi_poster = function (req, res, next) {
    data = req.query;
    cms.immi_poster(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//advert_clicknum
exports.advert_clicknum = function (req, res, next) {
    data = req.query;
    cms.advert_clicknum(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//immi_poster_click
exports.immi_poster_click = function (req, res, next) {
    data = req.query;
    cms.immi_poster_click(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//sign_up_away
exports.sign_up_way = function (req, res, next) {
    data = req.query;
    cms.sign_up_way(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
// 浏览量
exports.article_count = function (req, res, next) {
    data = req.query;
    var resErr = [];
    var resReturn = [];
    if(!tokenfunc.checkToken(data.token)){ //token验证不通过
        res.send(comfunc.api_return('100001', 'token check fail', ''));
    }
    cms.detail_count(data,function(err,result){
        if(err){
            resErr.push(err);
        }else{
            res.send(comfunc.api_return('0', 'success', result));
        }
    });
};
//token验证
exports.check_token = function (req, res, next) {
    data = {
        "iss":'jjl.cn'
    };
    res.send(comfunc.api_return('0', 'token check success', tokenfunc.createToken(data)));
};
// 关注用户 接口
exports.follow_people = function (req, res, next) {
    log.debug('关注用户');
    var data ={};
    var area = req.cookies.currentarea ? req.cookies.currentarea : 1;
    data = req.body;
    log.debug('---data---');
    log.debug(data);
    //res.setHeader("Access-Control-Allow-Methods","GET,POST");
    //wecent.follow_people(data, function (err,result) {
    cms.follow_people(data, function(err,result){
        log.debug('---result---')
        log.debug(result);
        res.send(result);
        //if(err){
        //  console.log('err------', err)
        //  res.send("cb("+JSON.stringify(err)+")");
        //}else{
        //  console.log('result------', result)
        //  res.send("cb("+JSON.stringify(result)+")");
        //}
    });
};
/*
 * 接口代理封装
 * */
exports.ucapi_agent = function(req,res,next){
    var data = req.query;
    cms.ucapi_agent(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
/*
 * 接口代理封装post
 * */
exports.ucapi_agent_post = function(req,res,next){
    var data = req.query;
    cms.ucapi_agent_post(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//input_upload
exports.input_upload = function (req, res, next) {
    var form = new multiparty.Form();
    form.uploadDir = "./upload/";//设置文件存储的路径；
    var service = new upyun.Service('img-upyun-com', 'daxuezhang', 'dxz123456');
    var client = new upyun.Client(service);
    var fileType = '';
    var avatar_uid = '';
    var originPath = '';
    var newVersion = '';
    form.parse(req, function(err, fields, files) {
        Object.keys(fields).forEach(function(name) {
            if (name == 'uid') {
                avatar_uid = fields[name][0];
            }
        });
        Object.keys(files).forEach(function(name) {
            fileType = name;
        });
        console.log('fileType',fileType)
        //生成上传路径和上传文件
        function creatUploadPah (f,type,userid) { //入参是传过来的文件
            var date = new Date();
            var Y = date.getFullYear();
            var M = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var afterfix = f[type][0].headers['content-type'].split('/')[1];
            var remotePath = '';
            if (type=='upload' ) {
                remotePath = "/ugc/" + Y +'/' + M + D + '/' + Y + M + D + h + m + s + (Math.round(Math.random()*899 + 100)) + '.' + afterfix;
            }
            else if (type == 'weixincode' || type == 'qqcode') {
                remotePath = "/qr_code/" + Y +'/' + M + D + '/' + Y + M + D + h + m + s + (Math.round(Math.random()*899 + 100)) + '.' + afterfix;
            }
            else if (type == 'yimin_upload') {
                remotePath = "/yimin_ugc/" + Y +'/' + M + D + '/' + Y + M + D + h + m + s + (Math.round(Math.random()*899 + 100)) + '.' + afterfix;
            }
            else if (type=='avatar') {
                uid = (Array(9).join('0') + userid).slice(-9);
                var dir1 = uid.substr(0, 3);
                var dir2 = uid.substr(3, 2);
                var dir3 = uid.substr(5, 2);
                var size = 'small';
                newVersion = new Date().getTime();
                remotePath = '/avatar/' + dir1+'/'+dir2+'/'+dir3+'/'+uid.substr(-2)+'_avatar_'+size+ '_' + newVersion +'.jpg';//+afterfix;
            }
            else if (type=='attachment') {
                var attachAfterfix = f[type][0].path.split('.')[1];
                remotePath = '/feedback/'+ userid + '/' + Y +'/' + M + D + '/' + Y + M + D + h + m + s + '.' + attachAfterfix;
                console.log('attachment remotePath',afterfix);
            }
            else if ( type == 'upload_opinion') {
                remotePath = "/opinion/" + Y +'/' + M + D + '/' + Y + M + D + h + m + s + (Math.round(Math.random()*899 + 100)) + '.' + afterfix;
            }
            // log.info('remotePath', remotePath);
            return remotePath;
        }
        originPath = creatUploadPah(files,fileType,avatar_uid);
        client.putFile(originPath,fs.ReadStream(files[fileType][0].path)).then(function (content) {
            log.info('本地文件',files[fileType][0].path)
            return 0;
        },function (err) {
            console.log('err',err)
            return 1;
        }).then(function (resolve) {
            console.log('resolve resolve',resolve);
            var returnData;
            if (resolve == 0) {
                var returnImg = '//images.jjl.cn' + originPath;
                if (fileType == 'upload' || fileType == 'yimin_upload') {
                    returnData = {"errno":0,"data":[returnImg]};
                    res.end(JSON.stringify(returnData));
                    fs.unlinkSync(files[fileType][0].path);
                }
                else if (fileType == 'avatar') {
                    returnData = {"errno":0,"data":[returnImg]};
                    cms.edit_user_version({uid:avatar_uid,version:newVersion},function(err,result){
                        if(err){
                            res.send(err);
                        }else{
                            res.end(JSON.stringify(returnData));
                            fs.unlinkSync(files[fileType][0].path);
                        }
                    })
                }
                else if (fileType == 'weixincode') {
                    returnData = {"errno":0,"data":[returnImg]};
                    cms.post_code({u_id:avatar_uid,weixin_qrcode:returnImg},function(err,result){
                        if(err){
                            res.send(err);
                        }else{
                            console.log('上传二维码返回值',result, typeof result)
                            res.end(JSON.stringify(returnData));
                            fs.unlinkSync(files[fileType][0].path);
                        }
                    })
                }
                else if (fileType == 'qqcode') {
                    returnData = {"errno":0,"data":[returnImg]};
                    cms.post_code({u_id:avatar_uid,qq_qrcode:returnImg},function(err,result){
                        if(err){
                            res.send(err);
                        }else{
                            res.end(JSON.stringify(returnData));
                            fs.unlinkSync(files[fileType][0].path);
                        }
                    })
                }
                else if (fileType == 'attachment' || fileType == 'upload_opinion') {
                    returnData = {"errno":0,"data":[returnImg]};
                    res.end(JSON.stringify(returnData));
                    fs.unlinkSync(files[fileType][0].path);
                }
            }
            else if (resolve == 1) {
                var returnData = {"code":1,'message':'您今日操作过于频繁请重试'};
                res.end(JSON.stringify(returnData));
            }
        });
    });
};
//user_edit_avatar
exports.user_edit_avatar = function (req, res, next) {
    data = req.query;
    log.info('user_edit_avatar 参数', data);
    cms.user_edit_avatar(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//load_more_article
exports.load_more_article = function (req, res, next) {
    data = req.query;
    log.info('搜索文章加载更多', data);
    cms.load_more_article(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};
//ip 接口
exports.ip_geter= function(req, res, next){
    log.debug('根据ip获取城市code码')
    var data = {};
    var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    log.info(ip)
    // ip = '61.51.80.118'; //我的外网ip地址
    cms.ip_geter(ip,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }   
    })
};
//article_top
exports.article_top = function (req, res, next) {
    data = req.body;
    cms.article_top(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};

//ip 接口
exports.get_ip_geter= function(req, res, next){
    log.debug('根据百度ip获取城市')
    var data = {};
    var ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    // ip = '131.193.115.10'; //我的外网ip地址
    // log.info(ip)
    var ipKey = "ipKey_"+ip;
    redis_db.get(ipKey, function (err, reply) {
        if(reply){
            res.send(reply);
        }else{
            var cityCode = '1';
            request.get('http://api.map.baidu.com/location/ip?ip='+ip+'&ak=oTtUZr04m9vPgBZ1XOFzjmDpb7GCOhQw&coor=bd09ll',function (error, response, body){
                var b =JSON.parse(body);
                if(!error && response.statusCode == 200 && b.status == 0){
                    if (b.content.address_detail.city) {
                        cityCode = get_area_code(b.content.address_detail.city);
                    }
                    if (b.content.address_detail.province && cityCode == "") {
                        cityCode = get_area_code(b.content.address_detail.province);
                    }
                    cityCode = cityCode ? cityCode : 1
                    res.send(cityCode);
                }else{
                    log.error('ip_error',ip)
                    redis_db.set(ipKey, cityCode);
                    redis_db.expire(ipKey, 1800);//存储半小时
                    res.send(cityCode);
                }
            })
        }
    });
}

//打电话统计
exports.dialing_log = function (req, res, next) {
  log.debug('打电话统计')
  var data = req.query;
  data.add_time = moment().format("YYYY-MM-DD HH:mm:ss");
  cms.dialing_log(data, function(err, result){
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
};
//文章底页获取点赞用户列表
exports.vote_list = function (req, res, next) {
    var data = req.query;
    log.info('votes_list 参数', data);
    cms.vote_list(data,function(err,result){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}
