function System(wn, xi) {
    this.wn = wn;
    this.xi = xi;
}

System.prototype.toParams = function() {
    return {
        wn: this.wn,
        xi: this.xi
    };
};

System.prototype.mp = function() {
    var num = -Math.PI * this.xi,
        den = Math.sqrt(1 - this.xi*this.xi);
    return Math.exp(num/den);
};

System.prototype.tau = function() {
    return 1 / (this.xi*this.wn);
};

System.prototype.wd = function() {
    return this.wn * Math.sqrt(1 - this.xi*this.xi);
};

System.prototype.tp = function() {
    return Math.PI / this.wd();
};

System.prototype.tr = function() {
    return 1.8 / this.wd();
};

System.prototype.ts = function() {
    return 4 * this.tau();
};

System.prototype.toString = function() {
    return '<table>' + _tableRow('&omega;<sub>n</sub>', _format(this.wn)) +
                       _tableRow('&xi;', _format(this.xi), true) +
                       _tableRow('&tau;', _format(this.tau()) + 's') +
                       _tableRow('M<sub>p</sub>', _format(this.mp())) +
                       _tableRow('T<sub>p</sub>', _format(this.tp()) + 's') +
                       _tableRow('T<sub>r</sub>', _format(this.tr()) + 's') +
                       _tableRow('T<sub>s</sub>', _format(this.ts()) + 's') +
           '</table>';
};

function _format(n) {
    return isNaN(n) ? 'n/d' : n.toFixed(2);
}
function _tableRow(a, b, border) {
    var c = border ? 'bordered' : 'plain'
    return '<tr class="' + c + '"><td>' + a + '</td><td>= ' + b + '</td></tr>';
}
