/**
 * Checks a nodes type and type.name to ensure it exists
 * @function
 * @private
 * @export
 * @param {Object} node - Node to be validated
 *
 * @returns {boolean} - True if node.type.name is not undefined
 */
export const checkNodeType = node => {
  return node && node.type && typeof node.type.name !== 'undefined'
}
