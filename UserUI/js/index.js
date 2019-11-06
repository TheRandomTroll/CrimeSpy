var display = [0, 0.2, 0.4, 0.6, 0.2, 1];

$(window).on("load", function (){
	for (let i = 0; i < 6; i++) {
		$("#cameras").append($(`<div class="card" id="card-${i}">
				<iframe class="card-img-top" src="https://www.youtube.com/embed/lM02vNMRRB0" frameborder="0"></iframe>
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
						<iframe class="card-img-top" src="https://www.youtube.com/embed/lM02vNMRRB0" frameborder="0"></iframe>
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