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
      return this.findPrefixed(prefix) as EnvVars
    } else {
      return this.collections as EnvCollection
    }
  }

  private findPrefixWithUnderscore(prefix: string): EnvVars {
    const filtered = filterByPrefix(this.vars, prefix)
    const paramaterized = injectParams(filtered)
    return paramaterized
  }

  private findPrefixed(prefix: string): EnvVars {
    if (prefix.endsWith('_')) {
      return this.findPrefixWithUnderscore(prefix)
    } else {
      const withUnderscore = filterByPrefix(this.vars, `${prefix}_`)
      const sansUnderscore = filterByPrefix(this.vars, prefix)
      const [results] = [
        sansUnderscore,
        withUnderscore,
      ].sort((a, b) => Object.keys(b).length - Object.keys(a).length)
      const paramaterized = injectParams(results)
      return paramaterized
    }
  }
}

export const client = new State()

function env(): EnvCollection
function env(prefix: string): EnvVars

function env(prefix?: string): EnvCollection | EnvVars {
  if (typeof prefix === 'undefined') {
    return client.env() as EnvCollection
  } else {
    return client.env(prefix) as EnvVars
  }
}

const getEnv = (prefix: string) => client.env(prefix) as EnvVars

export { env, getEnv }
