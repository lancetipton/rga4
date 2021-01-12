/**
 * @typedef UAEvent
 * @desc GA4 event formatted in the standard Universal Analytics event format
 * <br/> Allows reusing Universal Analytics events with GA4
 * @property {string} action - Name of the event or interaction to be measured
 * @property {string} label - Additional information about an event to be analyzed
 * @property {string} category - Group name for events with a relationship
 * @property {integer} [value] - A non-negative numerical value associated with the event
 * @property {boolean} [nonInteraction] - Should this event affect bounce rate calculation
 *                                        <br/> For more information on nonInteraction go [here](https://support.google.com/analytics/answer/1033068#NonInteractionEvents)
 */

/**
 * @typedef PageViewEvent
 * @desc GA4 event pre-formatted for a page_view
 * <br/> For more information on the page_view event, go [here](https://support.google.com/analytics/answer/6086080?hl=en)
 * @param {string} [location=window.location] - Location of the page relative to the site
 * @param {string} [title=document.title] - Name of the page being viewed
 */

/**
 * @typedef GA4Singleton
 * @desc Singleton object that contains methods for creating events
 * <br/> One one instance of this object should ever exist
 * @property {function} event - Method to fire a GA4 event
 * @property {function} gtag - Global Google Analytics method
 * @property {function} pageView - Method to fire a GA4 page_view event
 * @property {function} uaEvent - Method to fire a Universal Analytics event as a GA4 event
 * @property {boolean} initialized - Has the singleton been initialize ( Methods overwritten )
 */

/**
 * @typedef GAController
 * @desc Main Google Analytics Class for setting up google analytics 4 within an application
 * @property {function} isInitialized - Checks if Google Analytic 4 has been initialized
 * @property {function} getInstance - Returns the GA4Singleton if it's been initialized
 */

/**
 * @typedef RGA4Provider
 * @desc Context Provider used to set the Goggle Analytics Context.
 * @function
 * @param {Object} props - RGA4 provider props
 * @param {*} props.children - React Child components to wrap the with theme provider
 * @param {string} props.code - Google Analytics measurement ID to use for tracking
 * @param {Object} [props.config] - Custom Google Analytics config
 * @param {String[]} [props.gaCodes] - Extra google analytics
 */