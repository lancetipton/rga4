/**
 * @module Constants
 * @import {PageViewEvent, UAEvent} from './typeDefs'
 */

/**
 * @memberof Constants
 * @object
 * @constant
 * @readonly
 */
export const EVENT_MAP = Object.freeze({

  /**
   * @type UAEvent
   * @constant
   * @readonly
   * @type {UAEvent}
   */
  UA_EVENT_PROPS: Object.freeze({
    value: 'value',
    action: 'action',
    label: 'event_label',
    category: 'event_category',
    nonInteraction: 'non_interaction',
  }),

  /**
   * @type PageViewEvent
   * @constant
   * @readonly
   * @type {PageViewEvent}
   */
  PAGE_VIEW: Object.freeze({
    page_location: 'location',
    page_title: 'title',
  })

})