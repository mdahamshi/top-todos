import './SwipeHandler.css'
export class SwipeHandler {
    constructor(el, onSwipeLeft = () => {}, onSwipeRight = () => {}) {
        this.el = el;
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;

        this.startX = 0;
        this.currentX = 0;
        this.diffX = 0;
        this.threshold = 60;

        this._bindEvents();
    }

    _bindEvents() {
        this.el.addEventListener('touchstart', (e) => this._onStart(e), { passive: true });
        this.el.addEventListener('touchmove', (e) => this._onMove(e), { passive: true });
        this.el.addEventListener('touchend', (e) => this._onEnd(e));
    }

    _onStart(e) {
        this.startX = e.touches[0].clientX;
        this.el.style.transition = 'none';
    }

    _onMove(e) {
        this.currentX = e.touches[0].clientX;
        this.diffX = this.currentX - this.startX;

        this.el.style.transform = `translateX(${this.diffX}px)`;
    }

    _onEnd(e) {
        this.el.style.transition = 'transform 0.2s ease';
        this.el.style.transform = 'translateX(0)';

        if (this.diffX > this.threshold) {
            this.onSwipeRight(this.el);
        } else if (this.diffX < -this.threshold) {
            this.onSwipeLeft(this.el);
        }

        this.startX = 0;
        this.diffX = 0;
    }
}
