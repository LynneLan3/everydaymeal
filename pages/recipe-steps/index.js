const mockSteps = {
  '1': [
    {
      step_number: 1,
      title: "焯水",
      instruction: "冷水下锅，大火煮沸，撇去浮沫",
      needTimer: true,
      timer_duration: 300,  // 5分钟
      timerTip: "约5分钟"
    },
    {
      step_number: 2,
      title: "炒香",
      instruction: "倒油，加入葱姜蒜爆香",
      needTimer: false
    },
    {
      step_number: 3,
      title: "炒制",
      instruction: "加入牛肉翻炒至表面变色",
      needTimer: false
    },
    {
      step_number: 4,
      title: "加料",
      instruction: "放入土豆和胡萝卜",
      needTimer: false
    },
    {
      step_number: 5,
      title: "炖煮",
      instruction: "加水没过食材，大火烧开转小火",
      needTimer: true,
      timer_duration: 1800,  // 30分钟
      timerTip: "约30分钟"
    },
    {
      step_number: 6,
      title: "调味",
      instruction: "加盐调味，大火收汁",
      needTimer: true,
      timer_duration: 300,  // 5分钟
      timerTip: "约5分钟"
    }
  ]
};

Page({
  data: {
    recipe: null,
    currentStep: 0,
    animationClass: ''
  },

  onLoad() {
    // 从全局数据获取当前菜谱
    const app = getApp();
    const recipe = app.globalData.currentRecipe;
    
    if (recipe) {
      this.setData({ recipe });
      console.log('Current recipe:', recipe); // 调试信息
    } else {
      wx.showToast({
        title: '获取菜谱失败',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  onPrevStep() {
    if (this.data.currentStep > 0) {
      this.setData({
        animationClass: 'fade-out'
      });
      
      setTimeout(() => {
        this.setData({
          currentStep: this.data.currentStep - 1,
          animationClass: 'fade-in'
        });
      }, 300);
    }
  },

  onNextStep() {
    if (this.data.currentStep < this.data.recipe.steps.length - 1) {
      this.setData({
        animationClass: 'fade-out'
      });
      
      setTimeout(() => {
        this.setData({
          currentStep: this.data.currentStep + 1,
          animationClass: 'fade-in'
        });
      }, 300);
    }
  },

  onFinish() {
    wx.showModal({
      title: '🎉 完成啦',
      content: '恭喜你完成了这道美味，开始享用吧！',
      confirmText: '返回首页',
      confirmColor: '#27ae60',
      showCancel: false,
      success: () => {
        wx.navigateBack({
          delta: 2
        });
      }
    });
  }
});