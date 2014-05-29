/**
 * Ball constructor
 * 
 * @param {Object} init with properties radius, x, y, xVel, yVel, xAcel, yAcel, color, strokeColor, health, lineWidth
 */
function Ball( init ) {
    this.radius = ( typeof init.radius !== 'undefined' ) ? init.radius :  40;
    this.x = ( typeof init.x !== 'undefined' ) ? init.x :  0;
    this.y = ( typeof init.y !== 'undefined' ) ? init.y :  -this.radius;
    this.xVel = ( typeof init.xVel !== 'undefined' ) ? init.xVel :  0;
    this.yVel = ( typeof init.yVel !== 'undefined' ) ? init.yVel :  0;
    this.xAcel = ( typeof init.xAcel !== 'undefined' ) ? init.xAcel :  0;
    this.yAcel = ( typeof init.yAcel !== 'undefined' ) ? init.yAcel :  0;
    this.color = ( typeof init.color !== 'undefined' ) ? init.color :  '#F00';
    this.strokeColor = ( typeof init.strokeColor !== 'undefined' ) ? init.strokeColor :  '#000';
    this.lineWidth = ( typeof init.lineWidth !== 'undefined' ) ? init.lineWidth :  2;
}
Ball.prototype = {
    updatePhysics: function() {
        this.xVel += this.xAcel;
        this.yVel += this.yAcel;
        this.x += this.xVel;
        this.y += this.yVel;
    },
    draw: function( context ) {
        context.save();
        context.translate( this.x, this.y );
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.color;
        context.strokeStyle = this.strokeColor;
        context.beginPath();
        //x, y, radius, start_angle, end_angle, anti-clockwise
        context.arc( 0, 0, this.radius, 0, Math.PI * 2, true );
        context.closePath();
        context.fill();
        if ( this.lineWidth > 0 ) {
            context.stroke();
        }
        context.restore();
     },
    getSize: function() {
        return 2 * (this.radius + this.lineWidth);
    },
    isIntersecting: function( otherBall ) {
        return ( utils.getDistance( this, otherBall ) < otherBall.radius + this.radius );
    } 
};  


function Enemy( init ) {
    Ball.call( this, init );
    this.health = ( typeof init.health !== 'undefined' ) ? init.health :  3;
    this.color = ( typeof init.color !== 'undefined' ) ? init.color :  '#0008FC';
}

function Bullet( init ) {
    Ball.call( this, init );
} 


// Inherit the methods of Ball Class
Enemy.prototype = Object.create( Ball.prototype );

Bullet.prototype = Object.create( Ball.prototype );


/**
 * Tower constructor
 * 
 * @param {Object} init with properties x, y, defaultRot, rotation, radius, color, strokeColor, lineWidth, gunWidth, gunHeight, gunRotation
 */
function Tower(init){
    this.x = ( typeof init.x !== 'undefined' ) ? init.x :  0;
    this.y = ( typeof init.y !== 'undefined' ) ? init.y :  0;
    this.defaultRot = ( typeof init.defaultRot !== 'undefined' ) ? init.defaultRot :  - Math.PI / 2;
    this.rotation = ( typeof init.rotation !== 'undefined' ) ? init.rotation :  0;
    this.radius = ( typeof init.radius !== 'undefined' ) ? init.radius :  60;
    this.color = ( typeof init.color !== 'undefined' ) ? init.color :  '#AAA';
    this.strokeColor = ( typeof init.strokeColor !== 'undefined' ) ? init.strokeColor :  '#000';
    this.lineWidth = ( typeof init.lineWidth !== 'undefined' ) ? init.lineWidth :  2;
    this.gunWidth = ( typeof init.gunWidth !== 'undefined' ) ? init.gunWidth :  40;
    this.gunHeight = ( typeof init.gunHeight !== 'undefined' ) ? init.gunHeight :  100;
    this.gunRotation = ( typeof init.gunRotation !== 'undefined' ) ? init.gunRotation :  0; 
    this.canFire = true;      
}

Tower.prototype = {
    updatePhysics: function( angle ) {
        this.rotation = angle;     
    },
    draw: function( context ) {
        context.save();
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.color;
        context.strokeStyle = this.strokeColor;
        
        context.translate ( this.x, this.y );
        context.rotate(this.rotation);

        //draw circular gun base
        context.beginPath();
        //x, y, radius, start_angle, end_angle, anti-clockwise
        context.arc( 0, 0, this.radius, 0, (Math.PI * 2), true );
        context.closePath();
        context.fill();
        if (this.lineWidth > 0) {
            context.stroke();
        }
        //draw rectangular gun
        context.translate( - this.gunWidth / 2, - this.gunHeight );
        context.fillRect( 0, 0, this.gunWidth, this.gunHeight);
        context.strokeRect( 0, 0, this.gunWidth, this.gunHeight);
        context.restore();
    }
}; 