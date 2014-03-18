var express = require('express');
var hbs = require('hbs');
var app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get('/', function (request, response) {
	var welcome = 'Our Express app with templates';

	var products = [
		{'id': 1, 'name': 'Apple', 'price': 4.99 },
		{'id': 2, 'name': 'Pear', 'price': 3.99 },
		{'id': 3, 'name': 'Orange', 'price': 5.99 }
	];

	response.render('index', {title: welcome, products: products});
});

app.get('/about', function (request, response) {
	response.render('about');
});

app.get('/product/:id', function (request, response) {
	var id = request.params.id;
	response.render('product', {title: 'Product #'+id});
});

app.listen(8000);