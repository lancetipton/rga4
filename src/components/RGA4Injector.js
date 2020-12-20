/**
 * @module Components
 * @import {Component} from './typeDefs'
 */

import React from 'react'
import { renderFromType } from '../helpers/renderFromType'
import { RGA4 } from './RGA4'

/**
 * @desc Helper component to inject the GA4Singleton into the passed in react children
 * @function
 * @export
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 *
 * @returns {Component} - Rendered RGA4 component
 */
export const RGA4Injector = ({ code, children, ...props }) => {
  return <RGA4 code={code}>{renderFromType(children, props)}</RGA4>
}
