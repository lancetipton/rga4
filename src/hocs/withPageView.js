import React from 'react'
import { usePageView } from '../hooks/usePageView'

/**
 * Higher order component to initialized GA4, then fire a page view event
 * @function
 * @param {Object} props - Data for the page view event
 * @param {string} props.path - Current page path
 * @param {string} props.location - Current page location
 * @param {string} props.title - Current page title
 * @param {string} props.gaCode - Google Analytic Measurement ID
 *
 * @returns {function} - HOC Wrapper around the passed int component
 */
export const withPageView = Component => {
  const PageViewHoc = props => {
    const { path, location, title, gaCode } = props
    usePageView({ path, location, title, gaCode })
    return <Component {...props} />
  }
  const displayName = Component.displayName || Component.name || 'Component'
  PageViewHoc.displayName = `WithPageView(${displayName})`

  return PageViewHoc
}
