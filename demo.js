/**
 * Panflux Linux Platform Driver
 * (c) Omines Internetbureau B.V.
 *
 * @author Niels Keurentjes <niels.keurentjes@omines.com>
 */

const INTERVAL_LENGTH = 5 * 1000;

const DemoPlatform = class {
    /**
     * @param {panflux.Sandbox} platform
     * @param {winston.Logger} logger
     */
    constructor(platform, logger) {
        this._logger = logger;
        this._platform = platform;

        platform.on('start', () => this.start());
        platform.on('stop', () => this.stop());
        platform.on('adopt', (entity) => this.adopt(entity));
    }

    adopt(entity) {
        this._interval = setInterval(() => {
            const rnd = Math.random();
            entity.setProperty('random', rnd);
        }, INTERVAL_LENGTH);
    }

    start() {
        this._logger.info('Starting demo platform');
        this._platform.reportDiscovery({
            id: '684',
            name: 'Demo Platform Entity',
            type: 'demo_entity',
        });
    }

    stop() {
        if (this._interval) {
            clearInterval(this._interval);
        } else {
            this._logger.debug('Platform was not running');
        }
        this._interval = null;
    }
};

module.exports = (platform, logger) => new DemoPlatform(platform, logger);
