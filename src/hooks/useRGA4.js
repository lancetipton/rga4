/** @module Hooks */

import { useContext } from 'react'
import { RGA4Context } from '../context/rga4Context'

/**
 * Custom hook to get the RGA4 context
 * @function
 * @example
 * const rga4 = useRGA4()
 *
 * // Fire an analytics event
 * rga4.event('<Event-Name>', { ...Analytic event properties })
 *
 * @returns {void}
 */
export const useRGA4 = () => {
  return useContext(RGA4Context)
}
