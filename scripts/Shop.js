;(function () {

    window.bubbleGame = window.bubbleGame || {};
    var shops = window.bubbleGame.shops = window.bubbleGame.shops || {};

    shops.Shop = Shop;

    function Shop() {
    }

    Shop.prototype.buyPower = function () {
        if (score > 300) {
            score -= 300;
            bulletPower++;
        }
    };

    Shop.prototype.buyChanceRejected = function () {
        if (score > 1000) {
            score -= 1000;
            rejectedChance += 0.05;
        }
    };

    Shop.prototype.buyLife = function () {
        if (score > 100) {
            score -= 100;
            life += 10;
        }
    };

    Shop.prototype.buyTimeReload = function () {
        if (score > 300) {
            score -= 300;
            baseBulletPerSecound += 10;
        }
    };

    Shop.prototype.buyMaxHelpers = function () {
        if (score > 300) {
            score -= 300;
            helpers++;
        }
    };

    Shop.prototype.buyBulletHelpers = function () {
        if (score > 100) {
            score -= 100;
            helperBulletCount++;
        }
    };

    Shop.prototype.buyTimeReloadHelpers = function () {
        if (score > 1000) {
            score -= 1000;
            helperReloadsTime -= 10;
        }
    };

    Shop.prototype.buyBulletSpeed = function () {
        if (score > 100) {
            score -= 1000;
            bulletSpeed++;
        }
    };
})();