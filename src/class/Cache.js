/*缓存类*/
export class Cache{
  constructor(key){
    this.key=key;
    let cache=wx.getStorageSync(key);
    this.time=cache.time||new Date().getTime();
    this.data=cache.data||null;
  }
  // 修改
  update(data){
    this.data=data;
  }
  // 保存
  save(refreshtime=true){// refreshtime 是否刷新时间
    wx.setStorageSync(this.key,{
      time:(refreshtime?new Date().getTime():this.time),
      data:this.data
    });
  }
}