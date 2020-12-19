import { buildContentScript } from './buildContentScript'

/**
 * Builds the onload event listener for the Google Analytics Script Dom element
 * <br/> Returns a method that creates the GA4Singleton and sets initialized to true
 * @function
 * @param {string} gaCode - Google Analytic Measurement ID
 *
 * @returns {Dom Node|Object} GAScript - Google Analytics Script Dom element
 */
const createGAScript = gaCode => {
  const GAScript = document.createElement('script')
  GAScript.setAttribute('async', '')
  GAScript.setAttribute(
    'src',
    `https://www.googletagmanager.com/gtag/js?id=${gaCode}`
  )

  return GAScript
}

/**
 * Builds the onload event listener for the Google Analytics Script Dom element
 * <br/> Returns a method that creates the GA4Singleton and sets initialized to true
 * <br/> Method also creates another Script dom node that initializes gtag
 * @function
 * @param {Class Instance|Object} GA4Instance - Instance of the GAController class
 * @param {Dom Node|Object} head - Current documents Head Dom element
 * @param {function} resolve - Resolves the GA4Instance.initialize method
 *
 * @returns {function} - Method to be called when onload event is fired
 */
const buildOnloadEvent = (GA4Instance, head, resolve) => {
  return () => {
    buildContentScript(GA4Instance, head)
    const GA4Singleton = GA4Instance.setSingleton()
    window.ga && Object.assign(GA4Singleton, { ga: GA4Instance.ga })

    resolve(GA4Singleton)
  }
}

/**
 * Builds the onerror event listener for the Google Analytics Script Dom element
 * <br/> Returns a method that calls the GA4Instance.initialize reject method
 * @function
 * @param {function} reject - Rejects the GA4Instance.initialize method
 *
 * @returns {function} - Method to be called when onerror event is fired
 */
const buildOnErrorEvent = reject => {
  return () => {
    reject(new Error('Google Analytics failed to initialize!'))
  }
}

/**
 * Adds onload and onerror event listeners to the Google Analytics Script Dom element
 * @function
 * @param {Class Instance|Object} GA4Instance - Instance of the GAController class
 * @param {Dom Node|Object} GAScript - Google Analytics Script Dom element
 * @param {Dom Node|Object} head - Current documents Head Dom element
 * @param {function} resolve - Resolves the GA4Instance.initialize method
 * @param {function} reject - Rejects the GA4Instance.initialize method
 *
 * @returns {void}
 */
const addScriptEvents = (GA4Instance, GAScript, head, resolve, reject) => {
  GAScript.onload = buildOnloadEvent(GA4Instance, head, resolve)
  GAScript.onerror = buildOnErrorEvent(reject)
}

/**
 * Adds listener to the document.readyState
 * <br> When called adds the Google Analytics script to the dom
 * @function
 * @param {Dom Node|Object} GAScript - Google Analytics Script Dom element
 * @param {Dom Node|Object} head - Current documents Head Dom element
 *
 * @returns {void}
 */
const addOnReadyEvent = (GAScript, head) => {
  document.onreadystatechange = function () {
    document.readyState === 'interactive' && head.appendChild(GAScript)
  }
}

/**
 * Builds the script tags required to set up Google Analytics 4
 * @function
 * @param {Class Instance|Object} GA4Instance - Instance of the GAController class
 * @param {function} resolve - Resolves the GA4Instance.initialize method
 * @param {function} reject - Rejects the GA4Instance.initialize method
 *
 * @returns {void}
 */
export const buildScriptTags = (GA4Instance, resolve, reject) => {
  const head = document.getElementsByTagName('head')[0]
  const GAScript = createGAScript(GA4Instance.gaCode)

  addScriptEvents(GA4Instance, GAScript, head, resolve, reject)
  addOnReadyEvent(GAScript, head)
}
