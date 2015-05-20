import { assert } from 'chai'
import Immutable from 'immutable'
import Parser from '../parser'

const D1 = 'http://UXtemple.com/'

describe('Parser', function() {
  describe('#parse', function() {
    it('should parse a URI', function() {
      let parser = new Parser()
      assert(parser.parse(D1).equals(Immutable.List([D1])) === true)
    })

    it('should cache a URI\'s keys if they were already parsed', function() {
      let parser = new Parser()
      assert(parser.parsed.has(D1) === false)
      assert(parser.parsed.isEmpty() === true)

      parser.parse(D1)

      assert(parser.parsed.has(D1) === true)
      assert(parser.parsed.size === 1)

      parser.parse(D1)

      assert(parser.parsed.has(D1) === true)
      assert(parser.parsed.size === 1)
    })
  })
})
