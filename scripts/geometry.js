;(function () {
    window.bubbleGame = window.bubbleGame || {};
    var geometry = window.bubbleGame.geometry = window.bubbleGame.geometry || {};

    geometry.angle = angleBetweenTwoPoints;
    geometry.distance = distance;

    function angleBetweenTwoPoints(x1, y1, x2, y2) {
        return Math.atan2(y1 - y2, x1 - x2) / Math.PI * 180;
    }

    function distance(x1, y1, x2, y2) {
        var
            dx = x2 - x1,
            dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
})();