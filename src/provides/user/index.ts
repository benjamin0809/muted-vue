import type { InjectionKey } from 'vue'

const fn = () => {}
const fn1 = (name: string) => {}
export const PROVIDE_getUser = Symbol() as InjectionKey<typeof fn>
export const PROVIDE_GETUSER = Symbol() as InjectionKey<typeof fn1>
export const PROVIDE_key = Symbol() as InjectionKey<string>
