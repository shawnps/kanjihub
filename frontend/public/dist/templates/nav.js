function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing, helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, stack3;
  buffer += "\n        <li ";
  foundHelper = helpers.route;
  stack1 = foundHelper || depth0.route;
  foundHelper = helpers.active;
  stack2 = foundHelper || depth1.active;
  foundHelper = helpers.ifequal;
  stack3 = foundHelper || depth0.ifequal;
  tmp1 = self.program(2, program2, data);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  if(foundHelper && typeof stack3 === functionType) { stack1 = stack3.call(depth0, stack2, stack1, tmp1); }
  else { stack1 = blockHelperMissing.call(depth0, stack3, stack2, stack1, tmp1); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><a href=\"/";
  foundHelper = helpers.route;
  stack1 = foundHelper || depth0.route;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "route", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.display;
  stack1 = foundHelper || depth0.display;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "display", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></li>\n      ";
  return buffer;}
function program2(depth0,data) {
  
  
  return "class=\"active\"";}

  buffer += "<div class=\"navbar-inner\">\n  <div class=\"container\">\n\n    <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </a>\n\n    <a class=\"brand\" href=\"/\">MyApp</a>\n\n    <div class=\"nav-collapse\">\n      <ul class=\"nav main-nav\">\n      ";
  foundHelper = helpers.navItems;
  stack1 = foundHelper || depth0.navItems;
  stack2 = helpers.each;
  tmp1 = self.programWithDepth(program1, data, depth0);
  tmp1.hash = {};
  tmp1.fn = tmp1;
  tmp1.inverse = self.noop;
  stack1 = stack2.call(depth0, stack1, tmp1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    </div>\n\n  </div>\n</div>\n";
  return buffer;}