var canvas = document.getElementById('graph-canvas'),
    context = canvas.getContext('2d'),
    $output = $('#output'),
    system = new System(3, 0.2),
    chartOptions = {
        animation: false,
        showTooltips: false,
        datasetFill: false,
        scaleShowVerticalLines: false,
        scaleOverride: true,
        scaleSteps: 2,
        scaleStepWidth: 1,
        scaleStartValue: 0,
        pointDot: false
    };

function plotSystem(response) {
    var data = {
        labels: response.data.ts,
        datasets: [{label: "My Second dataset",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    data: response.data.ys}]
        };

    new Chart(context).Line(data, chartOptions);
}

var getGraphData = Utils.Functions.limit(function() {
    $.getJSON('data', system.toParams(), plotSystem);
}, 100);

function update() {
    $output.html(system.toString());
    getGraphData();
}

$(document).on('keypress', function(event) {
    if (event.key === 'ArrowUp') {
        system.xi += 0.05;
    }
    if (event.key === 'ArrowDown') {
        system.xi -= 0.05;
    }
    if (event.key === 'ArrowRight') {
        system.wn += 0.05;
    }
    if (event.key === 'ArrowLeft') {
        system.wn -= 0.05;
    }
    update();
});

update();
