'use strict';

/**
 * tome-of-understanding service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tome-of-understanding.tome-of-understanding');
