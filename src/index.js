class inactivejs {
    constructor (options = {}) {
        let {
            timeout = 60000,
            onAway = () => {},
            onBack = () => {},
        } = options;

        this.timeout = timeout;
        this.onAway = onAway;
        this.onBack = onBack;

        this._isAway = false;
        this._awayTimestamp = Date.now() + this.timeout;

        if (typeof window === 'undefined' || typeof document === 'undefined') {
            throw new Error('window not available');
        }

        [
            'click', 'mousemove', 'mouseenter', 'keydown',
            'scroll', 'mousewheel', 'touchmove', 'touchstart',
        ].forEach(event => window.addEventListener(event, this._triggerActive.bind(this)));

        this._createTimeout();
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
        if (Date.now() < this._awayTimestamp) {
            // not away, reset the timer
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

        let newTimeout = this._awayTimestamp - Date.now();
        this.timer = setTimeout(() => this._validateAway(), newTimeout);
    }
}

export default inactivejs;
