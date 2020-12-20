/** @module Hooks */

import { useEffect } from 'react'
import { GAController } from '../GAController'
import { injectRGA4 } from '../helpers/injectRGA4'

/**
 * Validates the passed in arguments, then makes call to inject the children with GA4 Singleton
 * <br/> Calls the setChildren method if it's a function
 * @function
 * @memberof Hooks
 * @private
 * @param {Array|Object} children - Children who will have the GA4 Singleton injected into their props
 * @param {Object} ga4 - GA4Singleton to inject into the children as props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @returns {void}
 */
const injectChildren = (children, ga4, setChildren) => {
  return (
    ga4 &&
    children &&
    typeof setChildren === 'function' &&
    setChildren(injectRGA4(children, ga4))
  )
}

/**
 * Gets GA4Singleton, then injects it into the children's props
 * @function
 * @memberof Hooks
 * @private
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Object} props.config - Config options for gtag method call
 * @param {Array} props.gaCodes - Extra GA4 Measurement ID's
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @returns {void}
 */
const isInitialized = ({ children }, setChildren) => {
  const ga4 = GAController.getInstance()
  injectChildren(children, ga4, setChildren)
}

/**
 * Initializes GA4, then injects the GA4Singleton into the children's props
 * @function
 * @memberof Hooks
 * @private
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Object} props.config - Config options for gtag method call
 * @param {Array} props.gaCodes - Extra GA4 Measurement ID's
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @returns {void}
 */
const initializeGA4 = (props, setChildren) => {
  const { code, config, gaCodes, children } = props

  const GA4Instance = new GAController(`${code}`, config, gaCodes)

  GA4Instance
    .initialize()
    .then(ga4 => {
      injectChildren(children, ga4, setChildren)
    })
    .catch(err => {
      console.error(err.stack)
    })
}

/**
 * Custom hook to initialized GA4
 * @function
 * @memberof Hooks
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Object} props.config - Config options for gtag method call
 * @param {Array} props.gaCodes - Extra GA4 Measurement ID's
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @returns {void}
 */
export const useRGA4Initialize = (props, setChildren) => {
  useEffect(() => {
    GAController.isInitialized()
      ? isInitialized(props, setChildren)
      : initializeGA4(props, setChildren)
  }, [])
}
