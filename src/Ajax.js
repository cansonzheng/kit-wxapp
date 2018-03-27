/*网络请求*/
export const Ajax=o=>{
  /*
    url [string] 请求地址
    data [json] 请求数据
    cache [string] 缓存字段名
    cacheMinute [int] 缓存分钟数
    loading [string|boolean] 显示加载层，为string时可定义提示文字
    ignoreError [boolean] 忽略请求失败alert提示
    method [string] 请求模式 默认post
  */
  var p = new Promise(function(resolve, reject){
    // 读缓存
    if(o.cache){
      let cache=new Cache(o.cache);
      if(!o.cacheMinute||
        new Date().getTime()-cache.time<o.cacheMinute*60000
      ){
        if(cache.data){
          resolve(cache.data);
          return;
        }
      }
    }
    // 请求数据
    if(o.loading) wx.showLoading({title:typeof o.loading==='string'?o.loading:'加载中',mask:true});

    // 如果设置了请求目录
    let ajaxConfig=getApp().data.ajaxConfig||{};
    let path=ajaxConfig.path;
    if(!/^https?\:/.test(o.url)&&path) o.url=path+o.url;

    wx.request({
      url: o.url,
      data:o.data,
      method:o.method||'POST',
      success:res=>{
        res=res.data;
        if(res.code==1){
          if(o.cache){
            let cache=new Cache(o.cache);
            cache.update(res);
            cache.save();
          }
          if(resolve) resolve(res);
        }else{
          if(reject) reject(res);
        }
      },
      fail:()=>{
        if(o.ignoreError) return;
        wx.showModal({
          content: '请求失败',
          showCancel:false
        });
      },
      complete:()=>{
        if(o.loading) wx.hideLoading()
      }
    })
  });
  return p;
}