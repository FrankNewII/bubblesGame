;(function () {
    window.bubbleGame = window.bubbleGame || {};
    var mobs = window.bubbleGame.mobs = window.bubbleGame.mobs || {};

    mobs.Enemy = Enemy;

    function Enemy(canva, pointsMaxRadius, pointsMinRadius, maxSpeedPoint, minSpeedPoint, pointColors) {
        this.x = (Math.random() * (canva.width - 10));
        this.y = (Math.random() * (canva.height - canva.height / 1));
        this.r = (Math.random() * (pointsMaxRadius - pointsMinRadius) + pointsMinRadius);
        this.s = (Math.random() * (maxSpeedPoint - minSpeedPoint) + minSpeedPoint);
        this.c = pointColors[Math.floor(Math.random() * pointColors.length)];
        this.angle = 0;
    }

    Enemy.prototype.draw = function (ctx) {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
})();