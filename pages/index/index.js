// index.js
const mockRecipes = [
  {
    id: '1',
    name: '土豆炖牛腩',
    description: '暖心又暖胃的炖菜，软烂入味',
    difficulty: '中等',
    cookingTime: '90分钟',
    ingredients: {
      main: ['牛腩', '土豆', '胡萝卜', '洋葱'],
      seasoning: ['生抽', '老抽', '料酒', '姜片', '八角', '桂皮', '盐', '胡椒粉']
    },
    steps: [
      { text: '牛腩切大块', tip: '切大块更好炖 ' },
      { text: '焯水去血水', tip: '保持汤清亮 ' },
      { text: '爆香姜片香料', tip: '香味是关键 ' },
      { text: '加入牛腩翻炒', tip: '肉块要上色 ' },
      { text: '加入调味料', tip: '调味很重要 ' },
      { text: '加水炖煮', tip: '要炖得烂烂的 ' },
      { text: '一小时后加土豆', tip: '土豆要入味 ' },
      { text: '调味后收汁', tip: '汤汁要浓稠 ' },
      { text: '装盘完成', tip: '美味要来啦 ' }
    ]
  },
  {
    id: '2',
    name: '红烧茄子',
    description: '香酥可口的下饭神器',
    difficulty: '简单',
    cookingTime: '20分钟',
    ingredients: {
      main: ['茄子', '青椒', '蒜', '葱花'],
      seasoning: ['生抽', '老抽', '蚝油', '盐', '糖', '淀粉']
    },
    steps: [
      { text: '茄子切条', tip: '切条要均匀 ' },
      { text: '热油炸至金黄', tip: '外酥里嫩 ' },
      { text: '爆香蒜末', tip: '蒜香最诱人 ' },
      { text: '加入调味料', tip: '调味要均匀 ' },
      { text: '茄子回锅', tip: '充分入味哦 ' },
      { text: '撒上葱花', tip: '点缀更美味 ' }
    ]
  },
  {
    id: '3',
    name: '土豆炒肉',
    description: '家常美味快手菜',
    difficulty: '入门',
    cookingTime: '15分钟',
    ingredients: {
      main: ['土豆', '猪肉末', '青椒', '葱花'],
      seasoning: ['生抽', '蚝油', '盐', '胡椒粉']
    },
    steps: [
      { text: '土豆切丁', tip: '切小块更入味 ' },
      { text: '热锅爆香肉末', tip: '肉末要散开 ' },
      { text: '加入土豆翻炒', tip: '大火快炒 ' },
      { text: '加入调味料', tip: '调味要均匀 ' },
      { text: '最后加青椒', tip: '保持脆嫩感 ' },
      { text: '撒上葱花', tip: '香味更诱人 ' }
    ]
  },
  {
    id: '4',
    name: '青椒肉丝',
    description: '经典快炒小菜',
    difficulty: '入门',
    cookingTime: '10分钟',
    ingredients: {
      main: ['青椒', '猪肉丝', '蒜末', '姜丝'],
      seasoning: ['生抽', '蚝油', '料酒', '盐', '胡椒粉']
    },
    steps: [
      { text: '肉丝腌制', tip: '先腌制更嫩滑 ' },
      { text: '青椒切丝', tip: '切丝要均匀 ' },
      { text: '热锅爆香', tip: '蒜姜要炒香 ' },
      { text: '快炒肉丝', tip: '大火快炒不粘锅 ' },
      { text: '加入青椒', tip: '青椒要脆嫩 ' },
      { text: '调味装盘', tip: '美味要来啦 ' }
    ]
  }
];

Page({
  data: {
    recipes: mockRecipes,
    currentRecipe: null,
    current: 0,
    isAnimating: false,
    isTrashActive: false,
    isLidActive: false,
    skipAction: false,
    dailyInfo: null
  },

  onLoad() {
    this.setData({
      currentRecipe: mockRecipes[0]
    });
  },

  onShow() {
    // 获取今日信息
    const dailyInfo = wx.getStorageSync('dailyInfo');
    const lastCheckDate = wx.getStorageSync('lastCheckDate');
    const today = new Date().toDateString();

    if (lastCheckDate !== today || !dailyInfo) {
      // 如果今天还没有选择过天气和心情，跳转到选择页面
      wx.redirectTo({
        url: '/pages/daily-check/index'
      });
      return;
    }

    this.setData({ dailyInfo });
  },

  onSwiperChange(e) {
    // 如果是点击跳过触发的切换，不执行滑动逻辑
    if (this.data.skipAction) {
      this.setData({ skipAction: false });
      return;
    }

    const { current } = e.detail;
    this.setData({
      current,
      currentRecipe: this.data.recipes[current]
    });
  },

  onSkip() {
    if (this.data.isAnimating) return;
    
    this.setData({
      isAnimating: true,
      isTrashActive: true,
      skipAction: true  // 标记这是一个跳过动作
    });

    setTimeout(() => {
      const nextIndex = (this.data.current + 1) % this.data.recipes.length;
      this.setData({
        current: nextIndex,
        currentRecipe: this.data.recipes[nextIndex],
        isTrashActive: false,
        isAnimating: false
      });
    }, 500);
  },

  onStart() {
    wx.navigateTo({
      url: `/pages/recipe-steps/index?id=${this.data.currentRecipe.id}`
    });
  },

  previewImage(e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  }
});
