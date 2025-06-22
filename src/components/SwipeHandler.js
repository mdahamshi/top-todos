import "./SwipeHandler.css";
export class SwipeHandler {
  constructor(element, config) {
    this.el = element;
    this.onSwipeLeft = config.onSwipeLeft || (() => {});
    this.onSwipeRight = config.onSwipeRight || (() => {});
    this.threshold = config.threshold || 100;

    this._addIndicators();
    this._initSwipeListeners();
  }

  _addIndicators() {
    this.leftBg = document.createElement("div");
    this.leftBg.className = "swipe-bg bg-left";
    this.leftBg.innerHTML = `<svg style="fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>`;
    this.el.appendChild(this.leftBg);

    this.rightBg = document.createElement("div");
    this.rightBg.className = "swipe-bg bg-right";
    this.rightBg.innerHTML = `<svg style="fill:white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-empty</title><path d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z" /></svg>`;
    this.el.appendChild(this.rightBg);
  }

  _initSwipeListeners() {
    let startX = 0,
      currentX = 0,
      swiping = false;

    const handleStart = (e) => {
      swiping = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      this.el.style.transition = "none";
      this._hideBoth(); // Reset indicators at start
    };

    const handleMove = (e) => {
      if (!swiping) return;
      currentX = e.touches ? e.touches[0].clientX : e.clientX;
      const diffX = currentX - startX;
      this.el.style.transform = `translateX(${diffX}px)`;

      if (diffX > 10) {
        this._showRight(); // swiping right
      } else if (diffX < -10) {
        this._showLeft(); // swiping left
      } else {
        this._hideBoth(); // minimal movement
      }
    };

    const handleEnd = (e) => {
      swiping = false;

      const diffX = currentX - startX;
      this.el.style.transition = "transform 0.3s ease";
      this._hideBoth(); // Always hide after swipe

      if (diffX > this.threshold) {
        this._handleSwipeRight();
      } else if (diffX < -this.threshold) {
        this._handleSwipeLeft();
      } else {
        this.el.style.transform = "translateX(0)";
      }
    };

    this.el.addEventListener("touchstart", handleStart);
    this.el.addEventListener("touchmove", handleMove);
    this.el.addEventListener("touchend", handleEnd);
    this.el.addEventListener("mousedown", handleStart);
    this.el.addEventListener("mousemove", handleMove);
    this.el.addEventListener("mouseup", handleEnd);
  }

  _handleSwipeRight() {
    this.el.style.transform = "translateX(100%)";
    this.onSwipeRight(this.el);
  }

  _handleSwipeLeft() {
    this.el.style.transform = "translateX(0)";
    this.onSwipeLeft(this.el);
  }

  _hideBoth() {
    this.leftBg.classList.remove("visible");
    this.rightBg.classList.remove("visible");
  }

  _showLeft() {
    this.leftBg.classList.add("visible");
    this.rightBg.classList.remove("visible");
  }

  _showRight() {
    this.rightBg.classList.add("visible");
    this.leftBg.classList.remove("visible");
  }
}
