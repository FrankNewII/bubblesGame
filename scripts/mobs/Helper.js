;(function () {
    window.bubbleGame = window.bubbleGame || {};
    var mobs = window.bubbleGame.mobs = window.bubbleGame.mobs || {};

    mobs.Helper = Helper;

    function Helper(bX, bY, helperReloadsTime, helperBulletCount) {
        this.x = bX;
        this.y = bY;
        this.reload = helperReloadsTime;
        this.bullet = helperBulletCount;
        this.angle = 90;
    }

    Helper.prototype.draw = function (ctx) {
        ctx.fillStyle = "#228D37";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.bullet / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

})();