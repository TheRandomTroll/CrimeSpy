var display = [0, 0.2, 0.4, 0.6, 1, 0.7];

var anomaly = []

for(var i=0; i<display.length;i++){

	if(display[i] >= 0.5)anomaly.push(display[i]);
}

console.log(anomaly.length);

var iframes = ['<iframe width="922" height="544" src="https://www.youtube.com/embed/Q8szgXXPVgk?rel=0&amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
				'<iframe width="922" height="544" src="https://www.youtube.com/embed/GPcSYIzfBQ0?rel=0&amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
				];

$(window).on("load", function (){
	for (let i = 0; i < 6; i++) {
		$("#cameras").append($(`<div class="card text-white bg-danger" id="card-${i}">
				${iframes[i%2]}
				<div class="card-body row">
					<div class="col-7">
						<h4 class="card-title">Camera info</h4>
					</div>
					<div class="col">
						<button class="btn btn-info" data-toggle="modal" data-target="#videoModal-${i}">Full screen</button>
					</div>
				</div>
			</div>`));
		$(".wrapper").append($(`<div class="modal fade" id="videoModal-${i}" tabindex="-1" role="dialog" aria-labelledby="videoModal-1Label" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
				<div class="modal-content" id="videoModal-inner">
					<div class="modal-body">
						${iframes[i%2]}
					</div>
					<div class="modal-footer row">
						<div class="col-auto mr-auto">
							<button type="button" class="btn btn-danger" onclick="dismissDisplay(${i})">Dismiss</button>
						</div>
						<div class="col-auto">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>`));

		if (display[i] < 0.5) {
			$(`#card-${i}`).hide();
		}
	}
});

function dismissDisplay(i) {
	display[i] = 0;
	$(`#videoModal-${i}`).modal("toggle");
	$(`#card-${i}`).hide();
}