import type { InjectionKey } from 'vue'

const fn = () => {}
export const PROVIDE_getUser = Symbol() as InjectionKey<typeof fn>
export const PROVIDE_key = Symbol() as InjectionKey<string>
