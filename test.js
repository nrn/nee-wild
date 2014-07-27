var test = require('tape')
  , nee = require('nee')
  , EE = require('events').EventEmitter
  , wild = require('./index')


test('wildcard', function (t) {
  var ee1 = nee()
    , ee2 = new EE()

  testWild(ee1, 'nee')
  testWild(ee2, 'node')

  function testWild (ee, name) {
    var total = 0
      , expected = 3

    ee.emit = wild(ee.emit)

    t.test(name, function (t) {

      t.plan(2)

      // glob
      ee.on('*', function (a, b) {
        total += 1
        if (total >= expected) t.equal(total, expected, 'Correct number of "*" calls')
      })

      ee.on('bar', function (a, b) {
        if (name === 'node') a = a[0]
        t.equal(a, 1, "Doesn't mess up normal handler")
      })

      ee.emit('foo', [1])

      ee.emit('foo', [2])
        .emit('bar', [1, 2])
    })
  }

})

