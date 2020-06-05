
'use strict'


var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var colorNames = Object.keys(chartColors);

var color = Chart.helpers.color;



function getIpTimes(ip, times) {
    //TBD
    return ip + "*" + times;
}

function DataBinder(chart){
    this.y = 0;
    this.chart = chart.getCtx();
}

DataBinder.prototype.getY = function() {
    return this.y;
}
DataBinder.prototype.setY = function(yy) {
    if (yy) {
        
        let k = yy.split("=")
        if (k && k.length > 1) {
            k = k[1].split(" ")[0];
        } else {
            k = yy.split("%");
            k = yy[0];
        }
        this.updateChart(parseFloat(k));
    }    
    
}
// your event listener code - assuming the event object has the timestamp and value properties
DataBinder.prototype.updateChart = function(dta) {
    // append the new data to the existing chart data
    this.chart.data.datasets[0].data.push({
        x: Date.now(),
        y: dta
    });

    // update chart datasets keeping the current animation
    this.chart .update({
        preservation: true
    });
}



function intSockets(ip, times,activity,ds,closeFunc) {
        var ws = new WebSocket('ws://localhost:9000/' + activity);
        ws.onopen = function() {
            console.log('CONNECT',getIpTimes(ip,times));
            ws.send(getIpTimes(ip,times))
        };
        
        ws.onclose = function() {
            console.log('DISCONNECT');
            closeFunc();
        };
        ws.onmessage = function(event) {
            console.log(event.data)
            ds.setY(event.data);
        };    
}

function socketsWifi(updater) {
    var ws = new WebSocket('ws://localhost:9000/' + "wifi_signals.sh");
    ws.onopen = function() {
        console.log('CONNECT');
    };
    
    ws.onclose = function() {
        console.log('DISCONNECT');
    };
    ws.onmessage = function(event) {
        updater(event.data);
    };        
}



var MyCharting = function(id, heading,color) {
    this.customchart = new Object();
    this.config = this.getConfig(heading,color);
    this.initChart(id);
}


MyCharting.prototype.getConfig = function(heading,colorA) {
    var config = {
        type: 'line',
        data: {
            datasets: [{
                label: heading,
                backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
                borderColor: colorA,
                fill: false,
                cubicInterpolationMode: 'monotone',
                data: []
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Line chart'
            },
            scales: {
                xAxes: [{
                    type: 'realtime',
                    realtime: {
                        duration: 20000,
                        refresh: 1000,
                        delay: 1000,
                        // onRefresh: this.onRefresh
                    }
                }],
                yAxes: [{
                    
                    scaleLabel: {
                        display: true,
                        labelString: 'Ping Time in Ms'
                    }
                }]
            },
            tooltips: {
                mode: 'nearest',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    };
    return config;    
}

MyCharting.prototype.initChart = function (id) {
    var ctx = document.getElementById(id).getContext('2d');
    this.customchart = new Chart(ctx, this.config);
    
}


MyCharting.prototype.Stop = function() {
    this.customchart.config.options.scales.xAxes[0].realtime.pause = true;
}

MyCharting.prototype.getCtx = function() {
    return this.customchart;
}