
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


test( "ArrayList" , function ( ) {

	var i , n ;

	var ArrayList = arraylist.__ArrayList__( 0 , 2 , array.alloc , array.realloc );

	var da = new ArrayList();

	var expectedArrayForward = [] ;
	var expectedArrayBackward = [] ;

	var arrayForward = [] ;
	var arrayBackward = [] ;

	for ( i = 0 , n = 10 ; i < n ; ++i ) {
		expectedArrayForward.push( i ) ;
		expectedArrayBackward.unshift( i ) ;
		da.push( i ) ;
	}

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
