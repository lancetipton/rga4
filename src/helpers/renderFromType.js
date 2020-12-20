/**
 * @import {Component} from './typeDefs'
 */

import React, { createElement, Fragment, isValidElement } from 'react'

/**
 * Renders the passed in component based it's type
 * @function
 * @private
 * @export
 * @param {Component} Component - Component to be rendered
 * @param {Object} props - Props to pass to the Component when rendered
 *
 * @returns {Component} - React component in the correct render format
 */
export const renderFromType = (Component, props) => {
  return isValidElement(Component) ? (
    <Component {...props} />
  ) : typeof Component === 'function' ? (
    Component(props)
  ) : (
    createElement(Fragment, null, Component)
  )
}
