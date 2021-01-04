/** @module HOCs */

import React from 'react'
import { useRGA4 } from '../hooks/useRGA4'

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
 * export const RGA4Component = withRGA4(Component)
 *
 * @returns {function} - HOC Wrapper around the passed int component
 */
export const withRGA4 = Component => {
  const RGA4Hoc = props => {
    const rga4 = useRGA4()

    return <Component {...props} rga4={rga4} />
  }
  const displayName = Component.displayName || Component.name || 'Component'
  RGA4Hoc.displayName = `WithRGA4(${displayName})`

  return RGA4Hoc
}
