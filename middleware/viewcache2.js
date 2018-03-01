/**
 * Created by Winson on 2017/12/6.
 */
'use strict';

var redisPool = null;
var keyprefix = null;

function cacheinit(config){
  keyprefix = config.prefix || null;
  redisPool = require('redis-connection-pool')('ViewCache', {
    host: config.redis,
    port: config.port || 6379,
    max_clients: config.max || 30,
    perform_checks: false,
    database: 5, // database number to use
    // options: {
    //   auth_pass: 'password'
    // }
  });
}

function route () {
  var options = arguments;
  var data = {};
  /*
   * MaxAge: for cache in user Brower,in sec
   * TTLUpdateExpire : for ttl ,default update data interval
   */
  const MaxAge = 30 ;//in sec
  const TTLUpdateExpire = 30 ;//in sec

  return function(req, res, next) {

    if(redisPool === null) {
      console.log('viewcache2 route need init~')
      return next();
    };

    var name = req.originalUrl;
    const origsend = res.send.bind(res);

    if(keyprefix === null || keyprefix === undefined || typeof keyprefix !== 'string' ) {
      keyprefix = 'VIEW:page:';
    }

    // If route() was called with a string as its first argument, use this string as name
    if ( typeof options[0] === 'string' ) {
      name = options[0];
    }

    if ( typeof options[0] === 'object' && typeof options[0].name === 'string' ) {
      name = options[0].name;
    }

    /** Name cannot have wildcards in them */
    if ( /\*/.test(name) ) {
      return next(new Error('Name can not have wildcards'));
    }

    var expire = TTLUpdateExpire ;
    if ( typeof options[0] === 'object' ) {
      if ( typeof options[0].expire === 'number' || typeof options[0].expire === 'object' || typeof options[0].expire === 'function') {
        expire = options[0].expire;
      }
    }

    if ( typeof options[0] === 'number' ) {
      expire = options[0];
    }
    else if ( typeof options[1] === 'number' || typeof options[1] === 'object') {
      expire = options[1];
    }

    let prefix = keyprefix;
    let urikey = prefix + name ;

    redisPool.get(urikey, (err, reply)=>{
      if(!err && reply !== null) {
        // let expires = new Date();
        // expires.setTime(expires.getTime() + MaxAge * 1000);
        // res.setHeader("Expires", expires.toUTCString());
        // res.setHeader("Cache-Control", "max-age=" + MaxAge);
        console.log('url cached:',urikey);
        return res.send(reply);
      }

      //in head is mico-second,but redis is second
      res.send = (body) => {
        redisPool.set(urikey, body, ()=>{
          console.log('url cache set ok!');
          redisPool.expire(urikey, expire> 2 ?expire:TTLUpdateExpire);
        })
        // let expires = new Date();
        // expires.setTime(expires.getTime() + MaxAge * 1000);
        // res.setHeader("Expires", expires.toUTCString());
        // res.setHeader("Cache-Control", "max-age=" + MaxAge);
        origsend(body);
        return this;
      }
      //not cache go on.
      next();
    })
  }
}

module.exports = {
  route: route,
  init: cacheinit
};