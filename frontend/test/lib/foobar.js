define([
  '../../lib/foobar'],
  function (foobar) {

  'use strict';

  describe('lib/Foobar', function () {

    describe('.doFoo()', function () {
      it('should foo', function () {
        expect(foobar.doFoo()).to.equal('foo');
      });
    });

    describe('.doBar()', function () {
      it('should bar', function () {
        expect(foobar.doBar()).to.equal('bar');
      });
    });

  });

});
