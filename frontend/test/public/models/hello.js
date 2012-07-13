define([
  'models/hello'],
  function (Hello) {

  'use strict';

  describe('models/Hello', function () {

    describe('new Hello()', function () {

      it('should exist', function () {
        var hello = new Hello();
        expect(hello).to.exist;
        expect(hello).to.have.property('initialize');
      });

      it('should have default text', function () {
        var hello = new Hello();
        expect(hello).to.have.property('defaults');
        expect(hello.defaults.text).to.equal('hello');
      });

    });

  });

});
