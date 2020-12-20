/**
 * @module Components
 * @import {Component} from './typeDefs'
 */


import React, { useState } from 'react'
import { useRGA4Initialize } from '../hooks/useRGA4Initialize'

/**
 * @desc Helper component to initialize google analytics 4
 * <br/> It also injects the GA4Singleton into the passed in react children
 * @function
 * @memberof Components
 * @export
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Object} props.config - Config options for gtag method call
 * @param {Array} props.gaCodes - Extra GA4 Measurement ID's
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 *
 * @returns {Component} - Rendered RGA4 component
 */
export const RGA4 = props => {
  const [components, setComponents] = useState(null)

  useRGA4Initialize(props, setComponents)

  return React.createElement(React.Fragment, null, components)
}
