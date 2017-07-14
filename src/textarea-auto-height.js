/*
 * js-observer - lib/TextAreaAutoHeight.js
 * Copyright(c) 2015 ingpdw <ingpdw@gmail.com>
 */

exports = module.exports = class TextAreaAutoHeight {
	constructor( $node, $parent, parentRange = 0, lineHeight = 1.5, maxHeight = 0 ) {
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

	clone() {
		this.$clone = this.$node.clone();
		this.$clone.removeAttr('id').removeAttr('name').css({ position: 'absolute', top: 0, left: -99999 }).appendTo(this.$parent);
	}

	setUI() {
		this.clone();
		this.addEvent();
	}

		remove() {
			this.$node.off( 'focus' );
			this.$node.off( 'blur' );
			this.$node.remove();
		}

	reset() {
		clearInterval(this.timer);
		this.$node.css('height', '' /*'auto'*/);
		this.$parent && this.$parent.css('height', '' /*'auto'*/);
	}

	addEvent() {
		let nodeH = Math.max(this.$clone.height(), this.$node.height());
		let nodeScrollH = 0;
		let fontH = parseInt(this.$node.css('fontSize')) * this.lineHeight;

		this.$node.on('focus', evt => {
			clearInterval( this.timer );
			this.timer = setInterval(() => {
				if (this.$node.val()) {
					this.$clone.val(this.$node.val());
					nodeScrollH = this.$clone[0].scrollHeight;
					nodeScrollH = ( nodeH <= nodeScrollH )? nodeScrollH + fontH : nodeH;
					nodeScrollH = ( this.maxHeight !== 0 && nodeScrollH >= this.maxHeight )? this.maxHeight: nodeScrollH;
					this.$node.css('height', nodeScrollH);
					this.$parent && this.$parent.css('height', nodeScrollH + this.parentRange);
				}
			}, 100);
		});

		this.$node.on('blur', () => {
			clearInterval( this.timer );
		});
	}
};
