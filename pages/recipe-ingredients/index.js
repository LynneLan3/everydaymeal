const mockIngredients = {
  '1': {
    main: [
      { name: '牛肉', amount: '500g' },
      { name: '土豆', amount: '2个' },
      { name: '胡萝卜', amount: '1根' }
    ],
    seasoning: [
      { name: '葱', amount: '2根' },
      { name: '姜', amount: '3片' },
      { name: '蒜', amount: '2瓣' },
      { name: '生抽', amount: '2勺' },
      { name: '老抽', amount: '1勺' },
      { name: '盐', amount: '适量' }
    ]
  }
};

Page({
  data: {
    recipe: null
  },

  onLoad() {
    // 从全局数据获取当前菜谱
    const recipe = getApp().globalData.currentRecipe;
    if (recipe) {
      this.setData({ recipe });
    } else {
      wx.showToast({
        title: '获取菜品信息失败',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  onStartCooking() {
    wx.navigateTo({
      url: '/pages/recipe-steps/index'
    });
  }
});