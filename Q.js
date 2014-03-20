/**
 * Q
 * A simple non-intrusive DOM wrapper.
 *
 * @author Benjamin Hutchins
 * @url https://github.com/benhutchins/Q
 */
var Q = (function () {
	function Q(elementOrType) {
		var el;

		if (!type || typeof type === 'string') {
			el = document.createElement(type || 'div');
		} else {
			el = type;
		}

		Q.each(Q.fn, function (method, callback) {
			el[method] = callback.bind(this);
		});

		return el;
	}

	// Q object place holders
	Q.fn = {};
	Q.properties = {};

	// return the type of a variable, primary to filter out 'array' type
	Q.type = function (thing) {
		return typeof thing;
	};

	// loop over every item in an object or array
	Q.each = function (object, cb, that) {
		if (Q.type(object) === 'array') {
			for (var i = 0; i < object.length; i++) {
				cb.call(that || null, object[i], i, object);
			}
		} else {
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					cb.call(that || null, key, object[key], object);
				}
			}
		}
	};

	// this is a private for each method used by internal methods
	function forEach(args, cb, that) {
		// args = Array.prototype.slice.call(args);
		var object = {};

		if (typeof args[0] === 'string') {
			object[ args[0] ] = args[1];
		} else {
			object = args;
		}

		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				cb.call(that, key, object[key]);
			}
		}

		return that;
	}

	Q.fn.css = function () {
		return forEach(arguments, function (property, value) {
			this.style[property] = value;
		}, this);
	};

	Q.fn.set = function () {
		return forEach(arguments, function (property, value) {
			if (Q.properties[property] && Q.properties[property].set) {
				Q.properties[property].set.call(this, value);
			} else {
				this.setAttribute(property, value);
			}
		}, this);
	};

	Q.fn.get = function (property) {
		if (Q.properties[property] && Q.properties[property].get) {
			return Q.properties[property].get.call(this);
		} else {
			return this.getAttribute(property);
		}
	};

	Q.fn.on = function () {
		return forEach(arguments, function (eventType, callback) {
			this.addEventListener(eventType, callback, false);
		}, this);
	};

	Q.fn.off = function () {
		return forEach(arguments, function (eventType, callback) {
			this.removeEventListener(eventType, callback, false);
		}, this);
	};

	Q.fn.adopt = function () {
		var children = [].concat.apply([], arguments);
		for (var i = 0; i < children.length; i++) {
			this.appendChild(children[i]);
		}
		return this;
	};

	Q.properties.text = {
		set: function (value) {
			this.appendChild(document.createTextNode(value));
		},
		get: function () {
			return this.textContent;
		}
	};

	Q.properties.html = {
		set: function (value) {
			this.innerHTML = value;
		},
		get: function () {
			return this.innerHTML;
		}
	};

	return Q;
})();