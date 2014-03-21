# Q

Extremely simple non-intrusive native DOM helper. For those who don't need jQuery but need quick development.

Q provides an alternative to libraries like [jQuery](http://jquery.com) and [Mootools](http://mootools.net) that is simple to use and doesn't bloat your namespace or attempt to deal with the "finer points" of web development.

## How to use

The `Q` method returns a native Element object. It does not override any native methods. This makes it useful when interacting with the native DOM API. It also allows Q to be used alongside essentially any other framework.

### Create an element

To create a new element by type (essentially a wrapper for `document.createElement`):

	var el = Q('<div>');

To wrap an element you already have with Q.

	var el = Q(document.body);

By default, Q will return a new empty `div` element.

	var el = Q();

### Find an element

To perform a selector for a single element:

	var el = Q(selector);

To find a list of elements that match a given selector:

	var els = Q(document.body).search(selector);

### CSS and styling manipulation

#### .css(property, value)

A utility to set CSS styling properties.

	.css('margin', 'none');

Or to set multiple CSS styling properties at once.

	.css({
		margin: 'none',
		paddingLeft: '10px'
	});

### .css(property)

Return the computed style for the requested property.

#### .hide()

Set the `display` CSS property to `none` to render the the element hidden.

#### .show()

Reset the `display` CSS property of the element to the element's default state.

#### .addClass(class)

Add a class to the element.

	.addClass('example');

Add multiple classes to the element.

	.addClsas(['one', 'two']); // with an array
	.addClass('one', 'two'); // with arguments
	.addClass('one two'); // with whitespace

#### .hasClass(class)

Returns a boolean to indicate whether the element has the given class.

	.hasClass('example');

Returns a boolean to indicate whether the element has all the given classes.

	.hasClass(['one', 'two']);
	.hasClass('one', 'two');
	.hsaClass('one two');

#### .removeClass(class)

Remove a class from the element.

	.removeClass('example');

Remove multiple classes from the element.

	.removeClass(['one', 'two']); // with an array
	.removeClass('one', 'two'); // with arguments
	.removeClass('one two'); // with whitespace

#### .toggleClass(class)

Add or remove class from the element, depending on whether the element already has the given class.

	.toggleClass(class);

Add or remove multiple classes from the element, depending on whether the element already has the given class.

	.toggleClass(['one', 'two']); // with an array 
	.toggleClass('one', 'two'); // with arguments
	.toggleClass('one two'); // with whitespace

### Element attributes and properties

#### .set

Set an attribute value.

	.set('id', 'something');

Set multiple attributes.

	.set({
		id: 'something',
		href: 'http://github.com/',
		text: 'Github'
	})

#### .get

Get an attribute value.

	.get('id');

#### Special properties

##### text

To insert text content.

	.set('text', 'Text safe, this string will be HTML-escaped. <a href=""></a>');

To get the text content for a node.

	.get('text');

##### html

To set the raw inner HTML value of the element.

	.set('html', 'HTML stuff, like <a href=""></a>');

To get the inner HTML value of an element.

	.get('html');

##### .get('outerHTML')

Get the outerHTML of an element.

##### .get('tag')

Get the element tag in lower case.

#### .get('offsetHeight')

Return the element's offset height.

#### .get('outerHeight')

Return the element's offset height with top and bottom margins summed.

#### .get('outerWidth')

Return the element's offset height with the left and right margins summed.

##### Add custom special property

There is a special object `Q.properties` which is an object of special property keywords. The value of these is an object containing a `set` and `get` function. To add a custom special property.

	Q.properties.width = {
		set: function (value) {
			// 'this' will be the element
			this.css('width', value + 'px');
		},

		get: function () {
			return this.clientWidth;
		}
	};

This is extremely extensible.

### Events

#### .on(event, callback)

Add an event listener.

	.on('click', clickEventCallback);

Add multiple event listeners at once.

	.on({
		mousedown: function(){},
		mouseup: function(){}
	});

#### .once(event, callback)

Add an event listener that is automatically removed after the first trigger.

	.once('click', oneTimeOffer);

Add multiple event listeners that are automatically removed after the first trigger.

	.once({
		mousedown: onMouseDownCallback,
		mouseup: onMouseUpCallback
	})

#### .off(event, callback)

Remove an event listener.

	.off('click', clickEventCallback);

Remove multiple event listeners at once.

	.off({
		mousedown: onMouseDownCallback,
		mouseup: onMouseUpCallback
	});

#### Special events

##### ready

A special `ready` event is an alias to `DOMContentLoaded`.

##### Create your own 'special' events

Special events allow for events to be manipulated in various ways. TODO: document special event features.

### DOM Traversal

#### .find(selector)

Find a descending element that matches given selector. Returns either a single element or null.

#### .search(selector)

Returns list of elements matching given selector. May return an empty list if no matching elements are found.

#### .search(selector, forEach[, filter])

Perform a callback event, `forEach`, for each element matching the selector. An optional `filter` argument can be passed to further filter the elements prior to the `forEach` callback being triggered.

### DOM Insertions

#### .inject(element)

To append descendant elements as last child of parent.

	.inject(document.createElement('div'));

This is equivalent to.

	.inject('append', element);

Alias.

	.append(element);

To append multiple descending elements.

	.inject([Q(), Q(), Q()]); // with an array
	.inject([ [Q(), Q()], [Q()], Q() ]); // flattens array of arguments and injects them all
	.inject(Q(), Q(), Q()); // with arguments

#### .inject('prepend', element)

Prepend an element as the first child of parent.

	.inject('prepend', document.createElement('div'));

Alias.

	.prepend(document.createElement('div'));

#### .inject('after', element);

Inject context element after the passed element.

	.inject('after', element);

Alias

	.after(element);

#### .inject('before', element);

Inject context element before the given element.

	.inject('before', element);

Alias

	.before(element);

### Element utilities

#### .matches(selector)

Returns a boolean to indicate whether the element matches the given selector.

#### .clone()

Simple wrapper for `element.cloneNode(true);`. Returns a clone of the element.

#### .contains(otherNode)

Returns a boolean to indicate if the given `otherNode` is a descendant of the context element. [Read more on spec](https://developer.mozilla.org/en-US/docs/Web/API/Node.contains).

#### .offset()

Returns the element's offset position similar to jQuery's [.offset](http://api.jquery.com/offset/) as an object similar to `{ left: 0, top: 0 }`.

#### .position()

Returns the element's offset location as an object similar to `{ left: 0, top: 0 }`. Similar to jQuery's [.position](http://api.jquery.com/position/).

#### .siblings()

Returns an array of the element's siblings.

## Special Methods

To add custom methods to each Q return element, there is a utility similar to jQuery's `$.fn`.

	Q.fn.method = function () {
		// this will be a single element
	};

Now to call your method, simply:

	.method();