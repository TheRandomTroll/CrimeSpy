var display = [0, 0.2, 0.4, 0.6, 1, 0.7];

var anomaly = []

for(var i=0; i<display.length;i++){

	if(display[i] >= 0.5){
		anomaly.push(display[i]);
	}
}

$(window).on("load", function () {
	$("#alerts").append($(`<span class="badge badge-pill badge-warning">${anomaly.length}</span>`));
});

