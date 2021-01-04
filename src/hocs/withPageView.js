/** @module HOCs */

import React from 'react'
import { usePageView } from '../hooks/usePageView'

/**
 * Higher order component to initialized GA4, then automatically fire a page view event
 * @function
 * @export
 * @param {Object} props - Data for the page view event
 * @param {string} props.location - Current page location
 * @param {string} props.title - Current page title
 * @param {string} props.gaCode - Google Analytic Measurement ID
 * @example
 * const Component = props => {
 *  const rga4 = props.rga4
 *  return (<div>{rga4.initialized}</div>)
 * }
 *
 * export const PageViewComponent = withPageView(Component)
 *
 * @returns {function} - HOC Wrapper around the passed int component
 */
export const withPageView = Component => {
  const PageViewHoc = props => {
    const { location, title, gaCode } = props
    usePageView({ location, title, gaCode })
    return <Component {...props} />
  }
  const displayName = Component.displayName || Component.name || 'Component'
  PageViewHoc.displayName = `WithPageView(${displayName})`

  return PageViewHoc
}