import { getEventMap } from '../constants/events'

/**
 * @object
 * @private
 */
const noOpObj = {}

/**
 * Checks if eventKeyMap is a string and try's to load the event key map from constants
 * <br/> Otherwise checks if its an object and returns it or noOpObj
 * @function
 * @private
 * @param {Object|string} eventKeyMap -  Allowed keys for the event or string name of the eventKeyMap
 *
 * @returns {*} Response from the global gtag method
 */
const getEventKeyMap = (eventKeyMap) => {
  const EVENT_MAP = getEventMap()

  return typeof eventKeyMap === 'string'
    ? EVENT_MAP[eventKeyMap]
    : eventKeyMap
}

/**
 * Maps a user defined event object to the keys in the eventKeyMap
 * Ensures correct keys are used to for the event
 * @function
 * @private
 * @param {Object} eventObj - Used defined key/value pairs for and event
 * @param {Object|string} eventKeyMap -  Allowed keys for the event or string name of the eventKeyMap
 *
 * @returns {*} Response from the global gtag method
 */
export const mapEventKeys = (eventObj, eventKeyMap) => {
  const keyMap = getEventKeyMap(eventKeyMap)

  return Object.entries(keyMap).reduce((mappedObj, [eventKey, gaKey]) => {
    if (eventKey === 'value' && eventObj[eventKey] < 0) return mappedObj
    else eventObj[eventKey] && (mappedObj[gaKey] = eventObj[eventKey])

    return mappedObj
  }, {})
}
