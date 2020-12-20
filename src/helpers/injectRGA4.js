/**
 * @import {Component} from './typeDefs'
 */
 
import { checkNodeType } from './checkNodeType'
import {
  Children,
  cloneElement,
  createElement,
  Fragment,
  isValidElement,
} from 'react'

/**
 * Loops over the passed in children, and checks if they are valid React components
 * <br/> If they are, then the GA4Singleton is injected into their props
 * @function
 * @private
 * @export
 * @param {Component|Component[]} children - React children prop
 * @param {Object} ga4 - GA4Singleton to inject into the children as props
 *
 * @returns {Component|Component[]} - React children with the GA4Singleton injected into their props
 */
export const injectRGA4 = (children, ga4) => {
  return Children.map(children, (child, index) => {
    return !isValidElement(child)
      ? createElement(Fragment, null, child)
      : checkNodeType(child)
      ? cloneElement(child, { ga4, index })
      : child
  })
}
