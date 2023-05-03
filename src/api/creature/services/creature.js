'use strict';

/**
 * creature service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::creature.creature');
