/**
 * @import {PageViewEvent, UAEvent} from './typeDefs'
 */

/**
 * @name EVENT_MAP
 * @type Constant
 * @object
 * @constant
 * @readonly
 * @private
 */
export const EVENT_MAP = Object.freeze({

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
  })

})