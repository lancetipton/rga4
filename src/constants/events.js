/**
 * @import {PageViewEvent, UAEvent} from './../index.d.ts'
 */

/**
 * @name EVENT_MAP
 * @type Constant
 * @object
 * @constant
 * @readonly
 * @private
 */
const EVENT_MAP = {
  /**
   * @type PageViewEvent
   * @constant
   * @readonly
   * @inner
   * @private
   * @type {PageViewEvent}
   */
  PAGE_VIEW: Object.freeze({
    page_location: 'location',
    page_title: 'title',
  }),

  /**
   * @type UAEvent
   * @constant
   * @readonly
   * @inner
   * @private
   * @type {UAEvent}
   */
  UA_EVENT_PROPS: Object.freeze({
    value: 'value',
    action: 'action',
    label: 'event_label',
    category: 'event_category',
    nonInteraction: 'non_interaction',
  }),
}

/**
 * Gets the Event Map Object with predefined events
 * @function
 * @export
 *
 * @returns {Object} - EVENT_MAP constant
 */
export const getEventMap = () => {
  return Object.freeze(EVENT_MAP)
}

/**
 * Adds custom events to the Event Map
 * @function
 * @export
 *
 * @returns {void}
 */
export const setEventMap = events => {
  Object.assign(EVENT_MAP, events || {})
}