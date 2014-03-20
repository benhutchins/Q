# Q

Extremely simple non-intrusive native DOM helper. For those who don't need jQuery but need quick development.

Q provides an alternative to libraries like [jQuery](http://jquery.com) and [Mootools](http://mootools.net) that is simple to use and doesn't bloat your namespace or attempt to deal with the "finer points" of web development.

## How to use

The `Q` method returns a native Element object. It does not override any native methods

### Create an element

To create a new element by type (essentially a wrapper for `document.createElement`):

	var el = Q('div');

To wrap an element you already have with the Q utilities:

	var el = Q(document.body);

To perform a selector for a single element:

	var el = Q('#')

To create an empty `div` element, simply do:

	var el = Q();

### .css

A utility to set CSS styling properties.

	.css('margin', 'none');

Or to set multiple CSS styling properties at once.

	.css({
		margin: 'none',
		paddingLeft: '10px'
	});

### .set

Set an attribute property value. See Special Properties below.

	.set('id', 'something');

Or to set multiple attributes at once.

	.set({
		id: 'something',
		href: 'http://github.com/',
		text: 'Github'
	})

### .get

Get an attribute property value. See Special Properties below.

	.get('id');

### .on

Add an event listener.

	.on('click', clickEventCallback);

Or to add multiple events at one.

	.on({
		mousedown: function(){},
		mouseup: function(){}
	});

### .off

Remove an event listener.

	.off('click', clickEventCallback);

Or to remove multiple events at one.

	.off({
		mousedown: onMouseDownCallback,
		mouseup: onMouseUpCallback
	});

### .adopt

To append descendant elements.

	.adopt(document.createElement('div'));

You can also append a Q element directly.

	.adopt(Q('div'))

You can also append a list of elements.

	.adopt([Q(), Q(), Q()]);

Or you can pass the list directly as arguments.

	.adopt(Q(), Q(), Q());

## Special Methods

To add custom methods to each Q return element, there is a utility similar to jQuery's `$.fn`.

	Q.fn.method = function () {
		// this will be a single element
	};

Now to call your method, simply:

	.method();

## Special Properties

### text

To insert text content.

	.set('text', 'Text safe, this string will be HTML-escaped. <a href=""></a>');

To get the text content for a node.

	.get('text');

### html

To set the raw inner HTML value of the element.

	.set('html', 'HTML stuff, like <a href=""></a>');

To get the inner HTML value of an element.

	.get('html');

### Add custom special property

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