(function () {
    //Since 2015

    "use strict";
    var Enemy = window.bubbleGame.mobs.Enemy;
    var Helper = window.bubbleGame.mobs.Helper;
    var Bullet = window.bubbleGame.mobs.Bullet;
    var geometry = window.bubbleGame.geometry;

    var options = options ? option : {};

    var
        canva = document.getElementById(options.elementId || 'canvas'),
        countPoints = canva.getAttribute("count-points") || 20,
        pointsMaxRadius = canva.getAttribute("points-max-radius") || 40,
        pointsMinRadius = canva.getAttribute("points-min-radius") || 20,
        bulletRadius = canva.getAttribute("bullet-radius") || 5,
        bulletSpeed = canva.getAttribute("bullet-speed") || 10,
        bulletPower = canva.getAttribute("bullet-power") || 2,
        maxSpeedPoint = canva.getAttribute("max-speed-point") || 1,
        minSpeedPoint = canva.getAttribute("min-speed-point") || 0.5,
        pointColors = canva.getAttribute("points-min-radius")
            ? canva.getAttribute("points-min-radius").split(' ')
            : ["#00A4C6", "#078507", "#C47F19", "#4CAF50"],
        width = canva.width,
        height = canva.height;


    var
        basePosition = {x: width / 2, y: height, s: 5, angle: 90},
        aim = {x: 0, y: 0},
        clickCoords = {x: 0, y: 0},
        baseBulletPerSecound = 10,
        coordsBullet = [],
        existPoints = [],
        rejectedChance = 0.1,
        helpers = 5,

        life = 100,
        score = 0,
        level = 1,
        ctx = canva.getContext('2d');

    var
        helperPoints = [],
        helperBulletCount = 60,
        helperReloadsTime = 240;

    var
        unitOfMultiPlayers = [];

    var
        pause = true;

    /*
     @_controlPanel - is object on checked press buttons by user.
     */
    var
        _controlPanel = {},
        _fireFlag = true;

    canva.onkeyup = canva.onkeydown = keyBoardPanel;
    canva.onmousedown = checkFire;

    canva.onmousemove = fire;
    canva.onmouseup = checkFire;

    function init() {
        for (var i = 0; i < countPoints; i++) {
            existPoints[i] = new Enemy(
                canva,
                pointsMaxRadius,
                pointsMinRadius,
                maxSpeedPoint,
                minSpeedPoint,
                pointColors);
        }
    }

    function draw() {
        if (pause) return;

        var tmpDis;
        var info;
        ctx.fillStyle = "#FFF";//"#2B2D2C";
        ctx.clearRect(0, 0, canva.width, canva.height);

        nextPoint:for (var i = 0; i < existPoints.length; i++) {
            nextHelper:for (var h = 0; h < helperPoints.length; h++) {
                if (helperPoints[h].bullet == 0) {
                    helperPoints.splice(h, 1);
                    continue nextHelper;
                }
                if (helperPoints[h].reload < helperReloadsTime) {
                    helperPoints[h].reload++;
                    continue nextHelper;
                }

                tmpDis = geometry.distance(
                    helperPoints[h].x,
                    helperPoints[h].y,
                    existPoints[i].x,
                    existPoints[i].y
                );

                if (tmpDis < 300) {
                    coordsBullet.push(
                        new Bullet(
                            existPoints[i].x,
                            existPoints[i].y,
                            helperPoints[h].x,
                            helperPoints[h].y,
                            rejectedChance
                        )
                    );
                    helperPoints[h].bullet--;
                }
                helperPoints[h].reload = 0;
            }

            if (existPoints[i].y > canva.height) {
                life -= existPoints[i].r.toFixed(0);
                existPoints.splice(i, 1);
                continue;
            }

            nextBullet:for (var z = 0; z < coordsBullet.length; z++) {
                tmpDis = geometry.distance(
                    coordsBullet[z].x,
                    coordsBullet[z].y,
                    existPoints[i].x,
                    existPoints[i].y
                );

                if (tmpDis < (existPoints[i].r + bulletRadius)) {
                    if (!coordsBullet[z].rejected)
                        coordsBullet.splice(z, 1);
                    else
                        coordsBullet[z].stepX = -coordsBullet[z].stepX;

                    existPoints[i].r -= bulletPower;
                    score += bulletPower;
                    if (existPoints[i].r < bulletRadius) {
                        existPoints.splice(i, 1);
                        //existPoints.push(new Enemy);
                        continue nextPoint;
                    }
                }
            }
            existPoints[i].y += 0.3 * existPoints[i].s;
            existPoints[i].draw(ctx);
        }

        if (!existPoints.length) {
            level++;
            countPoints += level;
            pointsMaxRadius++;
            init();
        }

        for (var z = 0; z < coordsBullet.length; z++) {
            if ((coordsBullet[z].x > 0 && coordsBullet[z].y > 0)) {

                coordsBullet[z].x += coordsBullet[z].stepX * bulletSpeed;
                coordsBullet[z].y += coordsBullet[z].stepY * bulletSpeed;

                coordsBullet[z].draw(ctx, bulletRadius);
            }
            else {
                coordsBullet.splice(z, 1);
            }
        }

        for (var h = 0; h < helperPoints.length; h++) {
            helperPoints[h].draw(ctx);
        }


        ctx.fillStyle = "#00A4C6";
        ctx.fillRect(0, canva.height - 10, (canva.width / 100) * life, 10);
        ctx.restore();
        ctx.fillStyle = "#4C0343";
        ctx.beginPath();

        ctx.restore();
        ctx.arc(basePosition.x, basePosition.y, bulletRadius * 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = "gray";
        ctx.font = "20px serif";

        info = "Score: " + score + " Life: " + life + " Level: " + level + " Enemy Points: " + countPoints + " Enemy Points: " + countPoints;

        ctx.fillText(info, 10, 20);
        window.requestAnimationFrame(draw);
    }

    function checkFire(e) {
        e = e || event;
        _controlPanel['mousedown'] = (e.type == 'mousedown') ? true : false;
        //e.preventDefault();
    }

    function fire(e) {
        if (!_fireFlag)
            return;
        if (_controlPanel['mousedown'] && _fireFlag) {
            _fireFlag = false;
            var x = e.x - canva.offsetLeft,
                y = e.y - canva.offsetTop - window.scrollY;

            basePosition.angle = geometry.angle(basePosition.x, basePosition.y, x, y);
            coordsBullet.push(
                new Bullet(x, y, basePosition.x, basePosition.y, rejectedChance)
            );
            setTimeout(function () {
                _fireFlag = true;
            }, 1000 / baseBulletPerSecound);
        }

        e.preventDefault();
    }

    function keyBoardPanel(e) {
        e = e || event;
        _controlPanel[e.code] = e.type == 'keydown';
        if (_controlPanel['KeyA']) {
            if (basePosition.x > 0)
                basePosition.x = basePosition.x - basePosition.s;
        }
        if (_controlPanel['KeyD']) {
            if (basePosition.x < canva.width)
                basePosition.x = basePosition.x + basePosition.s;
        }
        if (_controlPanel['KeyW']) {
            if (basePosition.y > 0)
                basePosition.y = basePosition.y - basePosition.s;
        }
        if (_controlPanel['KeyS']) {
            if (basePosition.y < canva.height)
                basePosition.y = basePosition.y + basePosition.s;
        }
        if (_controlPanel['Space']) {
            pause = (pause) ? false : true; //PAUSE
            draw();
        }
        if (_controlPanel['KeyC']) {
            if (helperPoints.length < helpers)
                helperPoints.push(new Helper(basePosition.x, basePosition.y, helperReloadsTime, helperBulletCount));
        }
    }

    init();
    draw();

    window.gameShopInterface = new Shop();
})();
