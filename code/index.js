import { createFilter } from 'rollup-pluginutils'
import { jsy_transpile } from 'jsy-transpile'

const { SourceMapGenerator } = require('source-map')
const default_config = { exclude: 'node_modules/**' }

export default jsy_lite
function jsy_lite(config=default_config) {
  const filter = createFilter(config.include, config.exclude)
  const sourcemap = false !== config.sourcemap && false !== config.sourceMap

  return {
    name: 'jsy-lite',
    transform(code, id) {
      if (! filter(id)) return

      const src_map = sourcemap ? new SourceMapGenerator() : null

      const res = jsy_transpile(code, {
        addSourceMapping(arg) {
          if (null === src_map) return;
          arg.source = id
          src_map.addMapping(arg)
        },
      })
      return { code: res, map: src_map.toJSON() } },
} }

