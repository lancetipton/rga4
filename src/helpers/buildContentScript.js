/**
 * @import {GAController} from './../index.d.ts'
 */

/**
 * Generates the code needed to initialize google analytics 4
 * <br/> Taken from https://developers.google.com/analytics/devguides/collection/ga4
 * @function
 * @private
 * @param {GAController} GA4Instance - Instance of the GAController class
 *
 * @returns {string} - Inner HTML content for the GTag Script Dom element
 */
const getScriptContent = GA4Instance => `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA4Instance.gaCode}', ${JSON.stringify(
  GA4Instance.config
)});
`

/**
 * Builds the code to be used as the Inner HTML content for the GTag Script Dom element
 * @function
 * @private
 * @param {GAController} GA4Instance - Instance of the GAController class
 *
 * @returns {string} - Inner HTML content for the GTag Script Dom element
 */
const buildScriptContent = GA4Instance => {
  const content = getScriptContent(GA4Instance)

  return !GA4Instance.extraGaCodes
    ? content
    : GA4Instance.extraGaCodes.reduce(
        (content, code) => content + `gtag('config', '${code}');\n`,
        content
      )
}

/**
 * Builds a script dom node that initializes gtag
 * <br/> Initialization code taken from https://developers.google.com/analytics/devguides/collection/ga4
 * @function
 * @export
 * @private
 * @param {GAController} GA4Instance - Instance of the GAController class
 * @param {Object} head - Current documents Head Dom element
 *
 * @returns {Object} - GTag Script Dom element
 */
export const buildContentScript = (GA4Instance, head) => {
  const script = document.createElement('script')
  script.innerHTML = buildScriptContent(GA4Instance)
  head.appendChild(script)

  return script
}
