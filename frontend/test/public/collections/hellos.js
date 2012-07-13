define(['collections/hellos'], function (Hellos) {
  'use strict';

  describe('Hellos Collection', function () {

    describe('.helperFunction()', function(){
      it('should have a helper function', function () {
        var hellos = new Hellos();
        expect(hellos.helperFunction()).to.be.true;
      });
    });

  });

});
