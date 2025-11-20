import { config } from 'dotenv'
import { EnvCollection, EnvVars } from './types'
import { autoPrefix, filterByPrefix, injectParams } from './utils'

class State {
  public vars: EnvVars = {}
  public collections: EnvCollection = {}
  public subcollections: EnvCollection = {}
  public env = this.get.bind(this)

  constructor() {
    config({ processEnv: this.vars })
    this.collections = autoPrefix(this.vars)
  }

  private get(prefix?: string): EnvCollection | EnvVars {
    if (prefix) {
      return this.findPrefix(prefix) as EnvVars
    } else {
      return this.collections as EnvCollection
    }
  }

  private findPrefix(prefix: string): EnvVars {
    prefix = prefix.endsWith('_') ? prefix : prefix + '_'
    const filtered = filterByPrefix(this.vars, prefix)
    const paramaterized = injectParams(filtered)
    return paramaterized
  }
}

export const client = new State()
export const env = () => client.env() as EnvCollection
export const getEnv = (prefix: string) => client.env(prefix) as EnvVars
