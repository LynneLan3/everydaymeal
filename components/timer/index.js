Component({
  properties: {
    duration: {
      type: Number,
      value: 0
    }
  },

  data: {
    remainingTime: 0,
    isRunning: false,
    formattedTime: '00:00'
  },

  lifetimes: {
    attached() {
      this.setData({
        remainingTime: this.properties.duration,
        formattedTime: this.formatTime(this.properties.duration)
      });
    }
  },

  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    toggleTimer() {
      if (!this.data.isRunning) {
        this.startTimer();
      } else {
        this.pauseTimer();
      }
    },

    startTimer() {
      this.setData({ isRunning: true });
      this.timer = setInterval(() => {
        if (this.data.remainingTime > 0) {
          this.setData({
            remainingTime: this.data.remainingTime - 1,
            formattedTime: this.formatTime(this.data.remainingTime - 1)
          });
        } else {
          this.pauseTimer();
          wx.vibrateLong();
        }
      }, 1000);
    },

    pauseTimer() {
      this.setData({ isRunning: false });
      clearInterval(this.timer);
    }
  }
}); 