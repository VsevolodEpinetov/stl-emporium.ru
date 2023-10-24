'use strict';

/**
 * terrain service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::terrain.terrain');
