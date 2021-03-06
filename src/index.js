import _throttle from 'lodash.throttle';

class inactivejs {
    constructor (options = {}) {
        let {
            timeout = 60000,
            onAway = () => {},
            onBack = () => {},
            onVisible = () => {},
            onHidden = () => {},
            events = [
                'click', 'mousemove', 'mouseenter', 'keydown',
                'scroll', 'mousewheel', 'touchmove', 'touchstart',
            ],
            autoStart = true,
            throttle = 10,
        } = options;

        this.timeout = timeout;
        this.onAway = onAway;
        this.onBack = onBack;
        this.events = events;
        this.onVisible = onVisible;
        this.onHidden = onHidden;

        this._isAway = false;
        this._started = false;
        this._checkIdle = !! (options.onAway || options.onBack);
        this._checkVisibility = !! (options.onVisible || options.onHidden);

        this._visibilityEvent = () => this._visibilityChange();

        this._eventMethod = _throttle(
            this._triggerActive.bind(this),
            throttle,
        );

        if (typeof window === 'undefined' || typeof document === 'undefined') {
            throw new Error('window not available');
        }

        if (autoStart) {
            this.start();
        }
    }

    start () {
        if (this._started) {
            return;
        }

        this._started = true;

        if (this._checkIdle) {
            this._awayTimestamp = Date.now() + this.timeout;

            this.events.forEach(event =>
                window.addEventListener(event, this._eventMethod)
            );

            this._createTimeout();
        }

        if (this._checkVisibility) {
            document.addEventListener(
                'visibilitychange',
                this._visibilityEvent,
            );
        }
    }

    stop () {
        if (this._checkIdle) {
            this.events.forEach(event =>
                window.removeEventListener(event, this._eventMethod)
            );
        }

        if (this._checkVisibility) {
            document.removeEventListener(
                'visibilitychange',
                this._visibilityEvent,
            );
        }

        this._started = false;
    }

    _triggerActive () {
        this._awayTimestamp = Date.now() + this.timeout;

        if (this._isAway) {
            this.onBack();
            this._createTimeout();
        }

        this._isAway = false;

        return true;
    }

    _validateAway () {
        // not away, reset the timer
        if (Date.now() < this._awayTimestamp) {
            this._isAway = false;
            this._createTimeout();

            return;
        }

        clearTimeout(this.timer);

        this._isAway = true;

        this.onAway();
    }

    _createTimeout () {
        clearTimeout(this.timer);

        if (! this._started) {
            return;
        }

        let newTimeout = this._awayTimestamp - Date.now();

        this.timer = setTimeout(() => this._validateAway(), newTimeout);
    }

    _visibilityChange () {
        if (document.hidden) {
            this.onHidden();
        } else {
            this.onVisible();
        }

        return true;
    }
}

export default inactivejs;
