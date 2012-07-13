function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n        <li>\n          ";
  stack1 = depth0.text;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "this.text", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\n          ";
  stack1 = "hello";
  stack2 = depth0.text;
  foundHelper = helpers.ifequal;
  stack3 = foundHelper || depth0.ifequal;
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </li>\n      ";
  return buffer;}
function program2(depth0,data) {
  
  
  return "(default)";}

  buffer += "<div class=\"home-view\">\n\n  <div class=\"row-fluid\">\n    <div class=\"span12\">\n      <h1>";
  foundHelper = helpers.title;
  stack1 = foundHelper || depth0.title;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</h1>\n      <div class=\"alert fade in bootstrap-plugin-test-alert\">\n        If you can close this, the bootstrap plugins are working!\n        <button type=\"button\" class=\"close\">×</button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row-fluid\">\n    <a href=\"#\" class=\"add-new\">add new</a>\n    <div class=\"span6\">\n      <ul>\n      ";
  foundHelper = helpers.hellos;
  stack1 = foundHelper || depth0.hellos;
  stack2 = helpers.each;
  tmp1 = self.program(1, program1, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    </div>\n  </div>\n\n</div>\n";
  return buffer;}