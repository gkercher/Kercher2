"use strict";

var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    var colors = [
        vec3(1.0,1.0,1.0),
        vec3(1.0,1.0,1.0),
        vec3(1.0,1.0,1.0),
        vec3(1.0,1.0,1.0), // Background Rectangle for top half of screen. Solid colored triangles
        vec3(1.0,1.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0), // Bottom Fan
        vec3(0.0,0.0,0.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0),
        vec3(1.0,0.0,1.0),
        vec3(0.0,0.0,1.0) // Top Fan

    ];

    // And, add our vertices point into our array of points
    points = [
        vec2(-1,1),
        vec2(-1,0),
        vec2(1,1),
        vec2(1,0), // Top rectagle (comprised of two triangles) behind the top fan
        vec2(0,-1),
        vec2(-1,-1),
        vec2(-0.7,-0.8),
        vec2(-0.9,-0.3),
        vec2(-0.6,- 0.4),
        vec2(-0.3,-0.1),
        vec2(-0.15, -0.45),
        vec2(0,-0.05),
        vec2(0.15, -0.45),
        vec2(0.3,-0.1),
        vec2(0.6,- 0.4),
        vec2(0.9,-0.3),
        vec2(0.7,-0.8),
        vec2(1,-1), // Bottom Fan
        vec2(0,1),
        vec2(-1,1),
        vec2(-0.7,0.8),
        vec2(-0.9,0.3),
        vec2(-0.6,0.4),
        vec2(-0.3,0.1),
        vec2(-0.15,0.45),
        vec2(0,0.05),
        vec2(0.15,0.45),
        vec2(0.3,0.1),
        vec2(0.6,0.4),
        vec2(0.9,0.3),
        vec2(0.7,0.8),
        vec2(1,1) // Top Fan. Mirror Image of bottom fan
    ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // Changes background color to black

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create a buffer object, initialize it, and associate it with the
    //  associated attribute variable in our vertex shader

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    //note that the 2 below is because each of our 
    //data points has only 2 values (2D application)
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // 2 Triangles to comprise the top half of the background
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 14); // Bottom fan
    gl.drawArrays(gl.TRIANGLE_FAN, 18, 14); // Top fan
}
