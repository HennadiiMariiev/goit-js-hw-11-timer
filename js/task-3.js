class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
      this.selector = selector;
      this.targetDate = targetDate;
      this.time = targetDate.getTime() - Date.now();
      this.timerId = null;
      this.onTick = onTick;
    }
  
    tick() {
      if(this.secs > 0) {
        this.secs -= 1;
      } else {
        this.stop();
        console.log("BOOM!!! Countdown is over!")
      }
      if(this.secs === 0 && this.mins > 0) {
        this.secs = 59;
        this.mins -= 1;
      }
      if(this.mins === 0 && this.hours > 0) {
        this.mins = 59;
        this.hours -= 1;
      }
      if(this.hours === 0 && this.days > 0) {
        this.hours = 23;
        this.days -= 1;
      }
    }
  
    start() {
      this.days = Math.floor(this.time / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.mins = Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60));
      this.secs = Math.floor((this.time % (1000 * 60)) / 1000);
      
      this.timerId = setInterval(() => {
        this.tick();
        this.onTick(this);
      }, 1000);
    }
  
    stop() {
      clearInterval(this.timerId);
    }
  }
  
  const newTimer = new CountdownTimer(
    {
      selector: '#timer-1', 
    targetDate: new Date('Jul 17, 2021'),
        onTick: refreshTimerMarkup,
  });
  
  const timerEl = document.querySelector(newTimer.selector);
  const daysEl = timerEl.querySelector('[data-value="days"]');
  const hoursEl = timerEl.querySelector('[data-value="hours"]');
  const minsEl = timerEl.querySelector('[data-value="mins"]');
  const secsEl = timerEl.querySelector('[data-value="secs"]');
  
  function refreshTimerMarkup(timer) {
    const { days, hours, mins, secs } = timer;
    daysEl.textContent = days;
    hoursEl.textContent = padStartZeroToVar(hours);
    minsEl.textContent = padStartZeroToVar(mins);
    secsEl.textContent = padStartZeroToVar(secs);
  }
  
  function padStartZeroToVar(value) {
    return value < 10 ? '0' + value : value;
  }
  
  newTimer.start();