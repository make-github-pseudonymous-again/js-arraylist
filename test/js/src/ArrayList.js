
var array , daToArrayForward , daToArrayBackward ;

array = require( "aureooms-js-array" ) ;

daToArrayForward = function (da) {
	var array = [];

	var it = da.begin();

	var e;

	while (!(e = it.next()).done){
		array.push(e.value);
	}

	return array;
};

daToArrayBackward = function (da) {
	var array = [];

	var it = da.rbegin();

	var e;

	while (!(e = it.next()).done){
		array.push(e.value);
	}

	return array;
};


test("ArrayList", function(){

	var i, j, k, n, m, it, a, b, v, first, last , alloc , realloc ;

	alloc = array.alloc ;

	realloc = array.realloc ;

	var ArrayList = arraylist.__ArrayList__( 0 , 2 , alloc , realloc );

	var da = new ArrayList();

	deepEqual(da.length, 0, "length is 0");


	var expectedArrayForward = [];
	var expectedArrayBackward = [];

	var arrayForward = [];
	var arrayBackward = [];

	var add20 = function(){

		n = 10;

		for (i = 1; i <= n; ++i) {
			da.push(i);
			expectedArrayForward.push(i);
			expectedArrayBackward.unshift(i);
			deepEqual(da.length, i, "length is " + i);

			arrayForward = daToArrayForward(da);
			arrayBackward = daToArrayBackward(da);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}

		n = 20;

		for (; i <= n; ++i) {
			da.unshift(i);
			expectedArrayForward.unshift(i);
			expectedArrayBackward.push(i);
			deepEqual(da.length, i, "length is " + i);

			arrayForward = daToArrayForward(da);
			arrayBackward = daToArrayBackward(da);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}

	};

	var del20 = function(){

		n = 10;

		for (i = 20; i > n; --i) {
			deepEqual(da.length, i, "length is " + i);

			v = da.pop();
			a = expectedArrayForward.pop();
			b = expectedArrayBackward.shift();
			deepEqual(v, a, "popped value a === " + a);
			deepEqual(v, b, "popped value b === " + a);

			arrayForward = daToArrayForward(da);
			arrayBackward = daToArrayBackward(da);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}

		n = 0;

		for (; i > n; --i) {
			deepEqual(da.length, i, "length is " + i);

			v = da.shift();
			a = expectedArrayForward.shift();
			b = expectedArrayBackward.pop();
			deepEqual(v, a, "shifted value a === " + a);
			deepEqual(v, b, "shifted value b === " + a);

			arrayForward = daToArrayForward(da);
			arrayBackward = daToArrayBackward(da);

			deepEqual(arrayForward, expectedArrayForward, "content is equal");
			deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
		}
	};

	var clear = function(){
		da.clear();
		expectedArrayForward.splice(0);
		expectedArrayBackward.splice(0);
	};

	clear();
	add20();
	del20();

	deepEqual(da.length, 0, "length is 0");

	v = da.shift();
	deepEqual(v, null, "v === null");

	v = da.pop();
	deepEqual(v, null, "v === null");

	deepEqual(da.length, 0, "length is 0");

	clear();
	add20();

	clear();

	deepEqual(da.length, 0, "length is 0");

	arrayForward = daToArrayForward(da);
	arrayBackward = daToArrayBackward(da);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	clear();
	add20();

	first = da.begin();
	last = da.end();
	first.next();

	da.eraserange(first, last);
	expectedArrayForward.splice(0);
	expectedArrayBackward.splice(0);

	deepEqual(da.length, 0, "length is 0");

	arrayForward = daToArrayForward(da);
	arrayBackward = daToArrayBackward(da);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	clear();
	add20();

	first = da.rbegin();
	last = da.rend();
	first.next();

	da.reraserange(first, last);
	expectedArrayForward.splice(0);
	expectedArrayBackward.splice(0);

	deepEqual(da.length, 0, "length is 0");

	arrayForward = daToArrayForward(da);
	arrayBackward = daToArrayBackward(da);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");


	clear();
	add20();

	m = 5;

	first = da.begin();
	last = da.end();
	first.next();
	for (i = 0; i < m; ++i) {
		first.next();
		last.prev();
	}

	da.eraserange(first, last);
	expectedArrayForward.splice(m, n - m - m);
	expectedArrayBackward.splice(m, n - m - m);

	deepEqual(da.length, expectedArrayForward.length, "length check");
	deepEqual(da.length, expectedArrayBackward.length, "length check");

	arrayForward = daToArrayForward(da);
	arrayBackward = daToArrayBackward(da);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	clear();
	add20();

	m = 5;

	first = da.rbegin();
	last = da.rend();
	first.next();
	for (i = 0; i < m; ++i) {
		first.next();
		last.prev();
	}

	da.reraserange(first, last);
	expectedArrayForward.splice(m, n - m - m);
	expectedArrayBackward.splice(m, n - m - m);

	deepEqual(da.length, expectedArrayForward.length, "length check");
	deepEqual(da.length, expectedArrayBackward.length, "length check");

	arrayForward = daToArrayForward(da);
	arrayBackward = daToArrayBackward(da);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");

	i = Math.random( ) ;
	da.set( 2 , i ) ;
	expectedArrayForward[2] = i ;
	expectedArrayBackward[7] = i ;

	deepEqual(da.length, expectedArrayForward.length, "length check");
	deepEqual(da.length, expectedArrayBackward.length, "length check");

	arrayForward = daToArrayForward(da);
	arrayBackward = daToArrayBackward(da);

	deepEqual(arrayForward, expectedArrayForward, "content is equal");
	deepEqual(arrayBackward, expectedArrayBackward, "content is equal");
});
