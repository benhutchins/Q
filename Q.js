/**
 * Q
 * A simple non-intrusive DOM wrapper.
 *
 * @author Benjamin Hutchins
 * @url https://github.com/benhutchins/Q
 */
var Q = (function (undefined) {
	var slice = Array.prototype.slice;

	function Q(multiplex) {
		var el;

		// if the multiplex is empty, we turn it into a div
		if (multiplex === undefined) {
			multiplex = '<div>';
		}

		// have we already Q-ed up this element?
		else if (multiplex && multiplex.Qed) {
			return multiplex;
		}

		// if multiplex is a string, we either are creating an element
		// or performing an element selector on the document
		if (typeof multiplex === 'string') {
			if (multiplex.substr(0, 1) === '<') {
				el = document.createElement(multiplex.substr(1).substr(0, multiplex.length - 2));
			} else {
				el = document.querySelector(multiplex);
			}
		} else {
			el = multiplex;
		}

		// look for failures
		if (!el) {
			throw new Error('Could not find desired element?');
		}

		Q.each(Q.fn, function (method, callback) {
			el[method] = callback.bind(this);
		});

		el.Qed = true; // identifier to mark that we've been here

		return el;
	}

	// Q object place holders
	Q.fn = {};
	Q.properties = {};
	Q.event = {};

	// loop over every item in an object or array
	Q.each = function (object, cb, that) {
		if (Array.isArray(object) === 'array') {
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

	// micro ajax utility
	Q.ajax = function (options) {
		var request = new XMLHttpRequest();
		var method = options.method ? options.method.toUpperCase() : 'GET';
		request.open(method, options.url, true);

		if (method === 'POST') {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}

		request.onload = function() {
			if (this.status >= 200 && this.status < 400){
				if (options.success) {
					options.success(this.response, this);
				}
			} else if (options.error) {
				options.error(this);
			}
		};

		if (options.error) {
			request.onerror = function() {
				options.error(this);
			};
		}

		request.send(options.data);
	};

	// utility ajax request methods
	Q.each(['get', 'post'], function (method) {
		Q.ajax[methpd] = function (url, successCallback, errorCallback) {
			Q.ajax({
				method: method,
				url: url,
				success: successCallback,
				error: errorCallback
			});
		};
	});

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

	// Apply CSS styling or return current CSS property value
	Q.fn.css = function (property) {
		// return the value of the css style requested
		if (arguments.length === 1 && typeof property === 'string') {
			return getComputedStyle(this)[property];
			// return this.style[property];
		}

		// apply the css styles provided
		return forEach(arguments, function (property, value) {
			this.style[property] = value;
		}, this);
	};

	Q.fn.hide = function () {
		this.style.display = 'none';
		return this;
	};

	Q.fn.show = function () {
		this.style.display = '';
		return this;
	};

	function classForEach() {
		// store the list of classes
		var _classes = [];

		// flatten all arrays into one array
		var classes = [].concat.apply([], arguments);
		for (var i = 0; i < classes.length; i++) {
			var justInCase = classes[i].split(' ');
			for (var j = 0; j < justInCase.length; j++) {
				_classes.push(justInCase[j]);
			}
		}
		return _classes;
	}

	// add class to element
	Q.fn.addClass = function () {
		classForEach(arguments).forEach(function (klass) {
			this.classList.add(klass);
		}.bind(this));
		return this;
	};

	// returns a boolean whether the element has a given
	Q.fn.hasClass = function () {
		return classForEach(arguments).every(function (klass) {
			return this.classList.contains(klass);
		}.bind(this));
	};

	// remove class from element
	Q.fn.removeClass = function () {
		classForEach(arguments).forEach(function (klass) {
			this.classList.remove(klass);
		}.bind(this));
		return this;
	};

	Q.fn.toggleClass = function () {
		classForEach(arguments).forEach(function (klass) {
			this.classList.toggle(klass);
		}.bind(this));
		return this;
	};

	// Set value of an attribute
	Q.fn.set = function () {
		return forEach(arguments, function (property, value) {
			if (Q.properties[property] && Q.properties[property].set) {
				Q.properties[property].set.call(this, value);
			} else {
				this.setAttribute(property, value);
			}
		}, this);
	};

	// Get value of an attribute
	Q.fn.get = function (property) {
		if (Q.properties[property] && Q.properties[property].get) {
			return Q.properties[property].get.call(this);
		} else {
			return this.getAttribute(property);
		}
	};

	// Attach an event listener.
	Q.fn.on = function () {
		var args = slice.call(arguments);
		var once = false;
		if (args[0] === true) {
			once = true;
			args.shift();
		}
		return forEach(args, function (eventType, callback) {
			// look for a custom event
			if (Q.event[eventType]) {
				var customEvent = Q.event[eventType];

				if (customEvent.delegate) {
					eventType = delegate;
				}
			}

			// if we only want to listen to this callback once
			if (once) {
				var originalCallback = callback;
				callback = function () {
					this.off(eventType, callback);
					originalCallback.apply(this, arguments);
				};
				originalCallback._QEvent = callback;
			}

			this.addEventListener(eventType, callback, false);
		}, this);
	};

	// Listen to an event only once or one time.
	Q.fn.once = function () {
		var args = slice.call(arguments);
		args.unshift(true);
		return this.on.apply(this, args);
	};

	// Detach an event listener.
	Q.fn.off = function () {
		return forEach(arguments, function (eventType, callback) {
			// look for a custom event
			if (Q.event[eventType]) {
				var customEvent = Q.event[eventType];

				if (customEvent.delegate) {
					eventType = delegate;
				}
			}

			// look to see if we overrode the actual function we binded to
			if (callback._QEvent) {
				callback = callback._QEvent;
			}

			this.removeEventListener(eventType, callback, false);
		}, this);
	};

	// Q.fn.trigger = function () {
	// 	// For a full list of event types: https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
	// 	event = document.createEvent('HTMLEvents');
	// 	event.initEvent('change', true, false);
	// 	el.dispatchEvent(event);
	// };

	// find a single descendant element matching selector
	Q.fn.find = function (selector) {
		return this.querySelector(selector);
	};

	// perform an action over each descendant element that matches selector
	Q.fn.search = function (selector, cb, filter) {
		var elements = document.querySelectorAll(selector);

		if (cb) {
			Array.prototype.forEach.call(elements, function (el, i) {
				el = Q(el);
				if (filter && filter(el, i)) {
					cb(el, i);
				}
			});
		}

		return elements;
	};

	// element injectors
	var injectPositions = {
		append: function (parent, child) { parent.appendChild(child); },
		prepend: function (parent, child) { parent.insertBefore(child, parent.firstChild); },
		after: function (parent, child) { parent.insertAdjacentHTML('afterend', child); },
		before: function (parent, child) { parent.insertAdjacentHTML('beforebegin', child); }
	};

	Q.inject = function () {
		var children = [].concat.apply([], arguments);
		var position = 'append';

		if (children.length > 0 && typeof children[0] === 'string') {
			position = children.shift();
		}

		if (injectPositions[position]) {
			for (var i = 0; i < children.length; i++) {
				injectPositions[position](this, children[i]);
			}
		} else {
			throw new Error('Q: unknown injection position. Cannot inject regular string, use Q(el).set("text", value);');
		}
	};

	// add injection aliases
	Q.forEach(injectPositions, function (position, injector) {
		Q.fn[position] = function () {
			var children = [].concat.apply([], arguments);
			for (var i = 0; i < children.length; i++) {
				injector(this, children[i]);
			}
			return this;
		};
	});

	// remove context element
	Q.fn.remove = function () {
		this.parentNode.removeChild(this);
	};

	// returns whether the element matches the selector
	Q.fn.matches = function (selector) {
		return (this.matches || this.matchesSelector || this.msMatchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector).call(this, selector);
	};

	// utility to get element offset similar to jQuery's
	Q.fn.offset = function () {
		var rect = this.getBoundingClientRect();
		return {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		};
	};

	Q.fn.position = function () {
		return {
			left: this.offsetLeft,
			top: this.offsetTop
		};
	};

	Q.fn.siblings = function () {
		var el = this;
		return Array.prototype.filter.call(this.parentNode.children, function (child) {
			return child !== el;
		});
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

	Q.properties.outerHTML = {
		set: function (value) {
			this.outerHTML = value;
		},
		get: function () {
			return this.outerHTML;
		}
	};

	Q.properties.offsetHeight = {
		get: function () {
			return this.offsetHeight;
		}
	};

	Q.properties.outerHeight = {
		get: function () {
			var height = this.offsetHeight;
			var style = getComputedStyle(this);
			return height + parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
		}
	};

	Q.properties.offsetWidth = {
		get: function () {
			return this.offsetWidth;
		}
	};

	Q.properties.outerWidth = {
		get: function () {
			var width = el.offsetWidth;
			var style = getComputedStyle(el);
			return width + parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
		}
	};

	Q.properties.style = {
		set: function (value) {
			this.style.cssText = value;
		},
		get: function () {
			return this.style.cssText;
		}
	};

	Q.properties.tag = {
		get: function () {
			return this.tagName.toLowerCase();
		}
	};

	Q.event.ready = {
		delegate: DOMContentLoaded
	};

	Q.parse = function () {
		var tmp = document.implementation.createHTMLDocument();
		tmp.body.innerHTML = str;
		return tmp.body.children;
	};

	return Q;
})();