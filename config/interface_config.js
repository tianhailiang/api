/**
 * Created by DXZ-Shuqin.Wang on 2018/4/8.
 */
var redisCache = {
    "host": "jjl-redis.3p6fml.0001.cnn1.cache.amazonaws.com.cn",
    "port":6379
};
var prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/cms/api/';
var uc_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/uc/api/';
var shequ_prefix = 'http://internal-jjl-elb-api-1494687011.cn-north-1.elb.amazonaws.com.cn/so/?/api/';
module.exports = {
    redisCache:redisCache,
    prefix:prefix,
    uc_prefix:uc_prefix,
    shequ_prefix:shequ_prefix
}