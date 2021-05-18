import { get } from 'svelte/store'
import { globalOptions } from '@src/stores'

const globalOpts = get(globalOptions)

export const getGlobalOptions = (): GlobalOptions => {
  return globalOpts
}

const setGlobalOptions = (options: GlobalOptions): void => {
  globalOptions.update(() => Object.assign(globalOpts, options))
}

export default setGlobalOptions
