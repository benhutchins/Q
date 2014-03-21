# jQuery comparison

## Ajax

### JSON

	// jQuery
	$.getJSON('/my/url', function(data) {
	});

	// plain JavaScript
	// see http://youmightnotneedjquery.com/#json

### Request

	// jQuery
	$.ajax({
		type: 'GET',
		url: '/my/url',
		success: function (resp) {},
		error: function () {}
	});

	// Q
	Q.ajax({
		method: 'GET',
		url: '/my/url',
		success: function (text) {},
		error: function (xhr) {}
	});

	// can also use Q.ajax.get

### Post

	// jQuery
	$.ajax({
		type: 'POST',
		url: '/my/url',
		data: data
	});

	// Q
	Q.ajax({
		method: 'POST',
		url: '/my/url',
		data: data
	});

	// can also use Q.ajax.post

## Effects

For true CSS effects, consider using [animate.css](http://daneden.github.io/animate.css/) or [move.js](https://github.com/visionmedia/move.js).

### Hide

	// jQuery
	$(el).hide();

	// Q
	Q(el).hide();

	// plain JavaScript
	el.style.display = 'none';

### Show

	// jQuery
	$(el).show();

	// Q
	Q(el).show();

	// plain JavaScript
	el.style.display = '';

## Element Classes

### Add class

	// jQuery
	$(el).addClass(class);

	// Q
	Q(el).addClass(class);

	// plain JavaScript (IE10+)
	el.classList.add(className);

### Remove class

	// jQuery
	$(el).removeClass(class);

	// Q
	Q(el).removeClass(class);

	// plain JavaScript
	el.classList.remove(className);

### Toggle class

	// jQuery
	$(el).toggleClass(className);

	// Q
	Q(el).toggleClass(className);

	// plain JavaScript (IE10+)
	el.classList.toggle(className);

### Has class

	// jQuery
	$(el).hasClass(className);

	// Q
	Q(el).hasClass(clsasName);

	// plain JavaScript
	el.classList.contains(className);

## Element injectors

### Append or adopt a child element

	// jQuery
	$(parent).append(child);

	// Q
	Q(parent).append(child);

	// plain JavaScript
	parent.appendChild(child);

### Prepend a child element as first child

	// jQuery
	$(parent).prepend(el);

	// Q
	Q(parent).prepend(el);

	// plain JavaScript
	parent.insertBefore(el, parent.firstChild);

### After another element

	// jQuery
	$(el).after(context);

	// Q
	Q(el).after(context);

	// plain JavaScript
	parent.insertAdjacentHTML('afterend', context);

### Before another element

	// jQuery
	$(el).before(context);

	// Q
	Q(el).before(context);

	// plain JavaScript
	el.insertAdjacentHTML('beforebegin', context);

## Element

### Get children

	// jQuery
	$(el).children();

	// plain JavaScript
	el.children;

### Clone element

	// jQuery
	$(el).clone();

	// plain JavaScrpit
	el.cloneNode(true);

### Contains descendant element

	// jQuery
	$.contains(el, child);

	// plain JavaScript
	el !== child && el.contains(child);

### Contains descendant selector

	// jQuery
	$(el).find(selector).length;

	// Q
	Q(el).find(selector).length;

	// plain JavaScript
	el.querySelector(selector) !== null;

### For each

	// jQuery
	$(selector).each(function (i, el){
	});

	// Q (IE9+)
	Q(selector).each(function (el, i) {
	});

	// Q (< IE9), underscore.js
	_.forEach(Q(selector), function (el, i) {
	});

### Empty element

	// jQuery
	$(el).empty();

	// plain JavaScript (IE9+)
	el.innerHTML = '';

### Filter

### Finding children

### Finding elements

### Set style

Remember to use classes whenever possible.

	// jQuery
	$(el).css('border-width', '20px');

	// Q
	Q(el).css('borderWidth', '20px');

	// plain JavaScript
	el.style.borderWidth = '20px';

### Get style

	$(el).css(property);
	Q(el).getStyle(property);

### Getting html

	// jQuery
	$(el).html();

	// Q
	Q(el).get('html');

	// plain JavaScript
	el.innerHTML

### Getting outer html

	// jQuery
	$('<div>').append($(el).clone()).html();

	// Q
	Q(el).get('outerHTML');

	// Q (alt)
	Q(el).outerHTML;

	// plain JavaScript
	el.outerHTML;

### Getting text content

	// jQuery
	$(el).text();

	// Q
	Q(el).get('text');

	// Q (alt) (IE9+)
	Q(el).textContent;

	// plain JavaScript (IE9+)
	el.textContent;

### Setting text content

	// jQuery
	$(el).text(string);

	// Q
	Q(el).set('text', string);

	// Q (alt) (IE9+)
	Q(el).textContent = string;

	// plain JavaScript (IE9+)
	el.textContent = string;

### Matches

	// jQuery
	$(el).is($(otherEl));

	// plain JavaScript
	el === otherEl;

### Matches selector

	// jQuery
	$(el).is('.my-class');

	// Q
	Q(el).matches('.my-class');

### Next sibling element

	// jQuery
	$(el).next();

	// plain JavaScript (IE9+)
	el.nextElementSibling

### Previous sibling element

	// jQuery
	$(el).prev();

	// plain JavaScript (IE9+)
	el.previousElementSibling;

### Offset

	// jQuery
	$(el).offset();

	// Q
	Q(el).offset();

### Offset parent

	// jQuery
	$(el).offsetParent();

	// plain JavaScript
	el.offsetParent || el;

### Outer height

	// jQuery
	$(el).outerHeight();

	// Q
	Q(el).get('offsetHeight');

	// Q (alt)
	Q(el).offsetHeight;

	// plain JavaScript
	el.offsetHeight;

### Outer height with margin

	// jQuery
	$(el).outerHeight(true);

	// Q
	Q(el).get('outerHeight');

### Outer width

	// jQuery
	$(el).outerWidth();

	// Q
	Q(el).get('offsetWidth');

	// Q (alt)
	Q(el).offsetWidth;

	// plain JavaScript
	el.offsetWidth;

### Outer width with margin

### Parent

	// jQuery
	$(el).parent();

	// plain JavaScript
	el.parentNode;

### Position

	// jQuery
	$(el).position();

	// Q
	Q(el).position();

### Position relative to viewport

	// jQuery
	// no method built in

	// Q
	Q(el).clientRect();

	// plain JavaScript
	el.getBoundingClientRect();

### Remove an element

	// jQuery
	$(el).remove();

	// Q
	Q(el).remove();

	// plain JavaScript
	el.parentNode.removeChild(el);

### Replacing from html

	// jQuery
	$(el).replaceWith(string);

	// Q
	Q(el).set('outerHTML', string);

	// plain JavaScript
	el.outerHTML = string;

### Setting attributes

	// jQuery
	$(el).attr('tabindex', 3);

	// Q
	Q(el).set('taxindex', 3);

	// plain JavaScript
	el.setAttribute('tabindex', 3);

### Setting html

	// jQuery
	$(el).html(string);

	// Q
	Q(el).set('html', string);

	// plain JavaScript
	el.innerHTML = string;

### Siblings

	// jQuery
	$(el).siblings();

	// plain JavaScript
	Q(el).siblings();

	// Ready
	$(document).ready(function(){});
	Q(document).on('ready', function(){})

	// Trigger native event
	$(el).trigger('change');
	Q(el).trigger('change'); // not implemented

## Utilities

For more of these utility methods there are many good alternatives.

[lo-dash](http://lodash.com/docs)
[underscore](http://underscorejs.org/)
ECMA6

### Array each

	// jQuery
	$.each(array, function(i, item){
	});

	// plain JavaScript (IE9+)
	array.forEach(function(item, i){
	});

### Bind

	// jQuery
	$.proxy(fn, context);

	// plain JavaScript
	fn.bind(context);

### Extend or assign

	// jQuery
	$.extend({}, objA, objB);

	// lo-dash
	_.assign({}, objA, objB);

	// underscore
	_.extend({}, objA, objB);

	// ECMA6
	Object.assign({}, objA, objB);

## Index Of

	// jQuery
	$.inArray(item, array);

	// plain JavaScript (IE9+)
	array.indexOf(item) > -1;

## Is Array

	// jQuery
	$.isArray(array);

	// plain JavaScript (IE9+)
	Array.isArray(arr);

## Map Array

	// jQuery
	$.map(array, function(value, index){
	});

	// plain JavaScript (IE9+)
	array.map(function(value, index){
	});

## Date now

	// jQuery
	$.now();

	// plain JavaScript (IE9+)
	Date.now();

	// plain JavaScript (< IE9)
	+new Date;

## Parse JSON

	// jQuery
	$.parseJSON(string);

	// plain JavaScript (IE8+)
	JSON.parse(string);

## Trim string

	// jQuery
	$.trim(string);

	// plain JavaScript (IE9+)
	string.trim();
