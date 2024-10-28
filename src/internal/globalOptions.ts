import { get } from 'svelte/store'
import { globalOptions } from '../store'
import type { GlobalOptions } from '../types/options'

const globalOpts = get(globalOptions)

export const getGlobalOptions = (): GlobalOptions => {
  return globalOpts
}

export const mergeGlobalOptions = (options?: Partial<GlobalOptions>) => {
  return Object.assign({}, globalOpts, options)
}

/**
 * Override global options
 *
 * @param options - The global options
 */

const setGlobalOptions = (options: GlobalOptions): void => {
  globalOptions.update(() => Object.assign(globalOpts, options))
}

export default setGlobalOptions
