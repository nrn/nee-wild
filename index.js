var slice = Array.prototype.slice

module.exports = function (emit) {
  return function (type, args) {
    emit.apply(this, arguments)
    if (type !== '*') {
      emit.apply(this, ['*'].concat(slice.call(arguments, 1)))
    }
    return this
  }
}

