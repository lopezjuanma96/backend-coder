"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//to install babel: npm init -y && npm install @babel/code @babel/cli @babel/preset-env
// command to apply babel to a script with cli (@babel/cli must be installed):
//      babel path_to_origin_script -o path_to_output_script -w
//      (-w creates an auto update on the transpiling, when the origin script changes, is not necessary)
// we can add this code to the "scripts" list of package.json with a certain script_name and call it with npm run script_name
var getColorNumber = function getColorNumber() {
  return Math.floor(Math.random() * 256);
};

var Color = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, [{
    key: "get",
    value: function get() {
      var color = "RGB(".concat(getColorNumber(), ", ").concat(getColorNumber(), ", ").concat(getColorNumber(), ")");
      return color;
    }
  }]);

  return Color;
}();

var color = new Color();
console.log(color.get());
