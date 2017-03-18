(function () {
    window.bubbleGame = window.bubbleGame || {};
    var mobs = window.bubbleGame.mobs = window.bubbleGame.mobs || {};

    mobs.Bullet = Bullet;

    var distance = window.bubbleGame.geometry.distance;

    function Bullet(x, y, bX, bY, rejectedChance) {
        var dist = distance(bX, bY, x, y);

        this.x = bX;
        this.y = bY;
        this.cx = x;
        this.cy = y;
        this.stepY = (y - bY) / dist;
        this.stepX = (x - bX) / dist;
        this.electric = (Math.random() < 0.9) ? 1 : 0;
        this.rejected = (Math.random() < rejectedChance) ? 1 : 0;
    }

    Bullet.prototype.draw = function (ctx, bulletRadius) {
        ctx.restore();
        ctx.fillStyle = "#51128A";
        ctx.beginPath();
        ctx.arc(this.x, this.y, bulletRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
    }

})();