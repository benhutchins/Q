/**
 * Q
 * A simple non-intrusive DOM wrapper.
 *
 * @author Benjamin Hutchins
 * @url https://github.com/benhutchins/Q
 */
function Q(elementOrType) {
	var el;

	if (!type || typeof type === 'string') {
		el = document.createElement(type || 'div');
	} else {
		el = type;
	}

	function forEach(args) {
		// args = Array.prototype.slice.call(args);
		var object = {};

		if (typeof args[0] === 'string') {
			object[ args[0] ] = args[1];
		} else {
			object = args;
		}

		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				cb(key, object[key]);
			}
		}

		return el;
	}

	el.css = function () {
		return forEach(arguments, function (property, value) {
			el.style[property] = value;
		});
	};

	el.set = function () {
		return forEach(arguments, function (property, value) {
			if (Q.properties[property] && Q.properties[property].set) {
				Q.properties[property].set.call(el, value);
			} else {
				el.setAttribute(property, value);
			}
		});
	};

	el.get = function (property) {
		if (Q.properties[property] && Q.properties[property].get) {
			return Q.properties[property].get.call(el);
		} else {
			return el.getAttribute(property);
		}
	};

	el.on = function () {
		return forEach(arguments, function (eventType, callback) {
			el.addEventListener(eventType, callback, false);
		});
	};

	el.off = function () {
		return forEach(arguments, function (eventType, callback) {
			el.removeEventListener(eventType, callback, false);
		});
	};

	el.adopt = function () {
		var children = [].concat.apply([], arguments);
		for (var i = 0; i < children.length; i++) {
			el.appendChild(children[i]);
		}
		return el;
	};

	return el;
}

Q.properties = {
	text: {
		set: function (value) {
			this.appendChild(document.createTextNode(value));
		},
		get: function () {
			return this.textContent;
		}
	},

	html: {
		set: function (value) {
			this.innerHTML = value;
		},
		get: function () {
			return this.innerHTML;
		}
	}
};
