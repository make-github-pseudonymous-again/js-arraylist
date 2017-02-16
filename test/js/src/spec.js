var array , ArrayList , spec ;

array = require( "@aureooms/js-array" ) ;
ArrayList = arraylist.__ArrayList__( 0 , 2 , array.alloc , array.realloc );

spec = require( "@aureooms/js-list-spec" ) ;
spec.test( "ArrayList" , ArrayList ) ;

