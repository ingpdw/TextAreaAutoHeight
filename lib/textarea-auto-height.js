'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * js-observer - lib/TextAreaAutoHeight.js
 * Copyright(c) 2015 ingpdw <ingpdw@gmail.com>
 */

exports = module.exports = function () {
	function TextAreaAutoHeight($node, $parent) {
		var parentRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var lineHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.5;
		var maxHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

		_classCallCheck(this, TextAreaAutoHeight);

		this.$node = $node;
		this.$parent = $parent;
		this.parentRange = parentRange;
		this.maxHeight = maxHeight;
		//this.lineHeight = this.$node.css( 'line-height' ) is not working. why not working?
		this.lineHeight = lineHeight;
		this.$clone = '';
		this.timer = 0;

		if (!this.$node.length) return;
		if (this.$node[0].nodeName.toLowerCase() != 'textarea') return;

		this.setUI();
	}

	_createClass(TextAreaAutoHeight, [{
		key: 'clone',
		value: function clone() {
			this.$clone = this.$node.clone();
			this.$clone.removeAttr('id').removeAttr('name').css({ position: 'absolute', top: 0, left: -99999 }).appendTo(this.$parent);
		}
	}, {
		key: 'setUI',
		value: function setUI() {
			this.clone();
			this.addEvent();
		}
	}, {
		key: 'remove',
		value: function remove() {
			this.$node.off('focus');
			this.$node.off('blur');
			this.$node.remove();
		}
	}, {
		key: 'reset',
		value: function reset() {
			clearInterval(this.timer);
			this.$node.css('height', '' /*'auto'*/);
			this.$parent && this.$parent.css('height', '' /*'auto'*/);
		}
	}, {
		key: 'addEvent',
		value: function addEvent() {
			var _this = this;

			var nodeH = Math.max(this.$clone.height(), this.$node.height());
			var nodeScrollH = 0;
			var fontH = parseInt(this.$node.css('fontSize')) * this.lineHeight;

			this.$node.on('focus', function (evt) {
				clearInterval(_this.timer);
				_this.timer = setInterval(function () {
					if (_this.$node.val()) {
						_this.$clone.val(_this.$node.val());
						nodeScrollH = _this.$clone[0].scrollHeight;
						nodeScrollH = nodeH <= nodeScrollH ? nodeScrollH + fontH : nodeH;
						nodeScrollH = _this.maxHeight !== 0 && nodeScrollH >= _this.maxHeight ? _this.maxHeight : nodeScrollH;
						_this.$node.css('height', nodeScrollH);
						_this.$parent && _this.$parent.css('height', nodeScrollH + _this.parentRange);
					}
				}, 100);
			});

			this.$node.on('blur', function () {
				clearInterval(_this.timer);
			});
		}
	}]);

	return TextAreaAutoHeight;
}();