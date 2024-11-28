Page({
  data: {
    weather: '',
    mood: '',
    weatherOptions: ['☀️ 晴天', '☁️ 多云', '🌧️ 下雨', '❄️ 下雪'],
    moodOptions: ['😊 开心', '😌 平静', '😔 低落', '😤 生气']
  },

  onLoad() {
    // 检查是否今天已经选择过
    const today = new Date().toDateString();
    const lastCheckDate = wx.getStorageSync('lastCheckDate');
    const dailyInfo = wx.getStorageSync('dailyInfo');
    
    if (lastCheckDate === today && dailyInfo) {
      // 今天已经选择过，直接跳转到首页
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },

  selectWeather(e) {
    const weather = this.data.weatherOptions[e.currentTarget.dataset.index];
    this.setData({ weather });
  },

  selectMood(e) {
    const mood = this.data.moodOptions[e.currentTarget.dataset.index];
    this.setData({ mood });
  },

  skipToMenu() {
    const today = new Date().toDateString();
    const dailyInfo = {
      weather: this.data.weather || '未选择',
      mood: this.data.mood || '未选择',
      date: today
    };

    // 保存选择结果
    wx.setStorageSync('lastCheckDate', today);
    wx.setStorageSync('dailyInfo', dailyInfo);

    // 跳转到首页
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
});
