import type { ActorExtras } from './options'

export interface ElementReference {
  node: HTMLElement
  reference: string
}

export interface ActorReference extends ActorExtras{
  node: HTMLElement
  reference: string
}
