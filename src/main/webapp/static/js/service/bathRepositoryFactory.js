define(['require'],
    function (require) {
        var Logger = require('logger');

        var logger = new Logger('[Unknown]');
        logger.info('Module loaded');

        return;
    }
);
