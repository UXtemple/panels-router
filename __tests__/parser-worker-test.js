import { assert } from 'chai'
import parser from '../parser-worker'

const D1 = 'http://UXtemple.com'
const D2 = 'https://usepanels.com'

let parse = parser()

describe('ParserWorker', function() {
  describe('#parse', function() {
    it(D1, function() {
      let expected = new Set([`${D1}/`])
      parse(D1).forEach((v) => assert(expected.has(v)))
    })

    it(`${D1}/panels`, function() {
      let expected = new Set([
        `${D1}/`,
        `${D1}/panels`
      ])
      parse(`${D1}/panels`).forEach((v) => assert(expected.has(v)))
    })

    it(`${D1}/panels/panels`, function() {
      let expected = new Set([
        `${D1}/`,
        `${D1}/panels`,
        `${D1}/panels/panels`
      ])
      parse(`${D1}/panels/panels`).forEach((v) => assert(expected.has(v)))
    })

    it(`${D1}/panels/${D2}`, function() {
      let expected = new Set([
        `${D1}/`,
        `${D1}/panels`,
        `${D2}/`
      ])
      parse(`${D1}/panels/${D2}`).forEach((v) => assert(expected.has(v)))
    })

    it(`${D1}/panels/${D2}/panels`, function() {
      let expected = new Set([
        `${D1}/`,
        `${D1}/panels`,
        `${D2}/`,
        `${D2}/panels`
      ])
      parse(`${D1}/panels/${D2}/panels`).forEach((v) => assert(expected.has(v)))
    })

    it(`${D1}/panels/${D2}/panels/${D1}/panels`, function() {
      let expected = new Set([
        `${D1}/`,
        `${D1}/panels`,
        `${D2}/`,
        `${D2}/panels`,
        `${D1}/`,
        `${D1}/panels`
      ])
      parse(`${D1}/panels/${D2}/panels/${D1}/panels`).forEach((v) => assert(expected.has(v)))
    })

    // TODO Implement operators. Will probably require refactoring the internals to
    // tell whether a bit is active or not.
    xit(`${D1}/panels/--start`)
  })
})
