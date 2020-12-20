/** @module Hooks */

import { useEffect, useState } from 'react'
import { GAController } from '../ga4/GAController'
import { injectRGA4 } from '../helpers/injectRGA4'

/**
 * Validates the passed in arguments, then makes call to inject the children with GA4 Singleton
 * <br/> Calls the setChildren method if it's a function
 * @function
 * @private
 * @param {Array|Object} children - Children who will have the GA4 Singleton injected into their props
 * @param {Object} rga4 - GA4Singleton to inject into the children as props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @returns {void}
 */
const injectChildren = (children, rga4, setChildren) => {
  return (
    rga4 &&
    children &&
    typeof setChildren === 'function' &&
    setChildren(injectRGA4(children, rga4))
  )
}

/**
 * Gets GA4Singleton, then injects it into the children's props
 * @function
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
const isInitialized = ({ children }, setChildren, setRGA4) => {
  const rga4 = GAController.getInstance()
  injectChildren(children, rga4, setChildren)
  setRGA4(rga4)
}

/**
 * Initializes GA4, then injects the GA4Singleton into the children's props
 * @function
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
const initializeGA4 = (props, setChildren, setRGA4) => {
  const { code, config, gaCodes, children } = props

  const GA4Instance = new GAController(`${code}`, config, gaCodes)

  GA4Instance
    .initialize()
    .then(rga4 => {
      injectChildren(children, rga4, setChildren)
      setRGA4(rga4)
    })
    .catch(err => {
      console.error(err.stack)
    })
}

/**
 * Custom hook to initialized GA4
 * @function
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Object} props.config - Config options for gtag method call
 * @param {Array} props.gaCodes - Extra GA4 Measurement ID's
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @example
 * const [ rga4 ]
 *
 * @returns {void}
 */
export const useRGA4 = (props, setChildren) => {
  const [ rga4, setRGA4 ] = useState(GAController.getInstance())

  useEffect(() => {
    GAController.isInitialized()
      ? isInitialized(props, setChildren, setRGA4)
      : initializeGA4(props, setChildren, setRGA4)
  }, [])
  
  return [ rga4, setRGA4 ]
}
