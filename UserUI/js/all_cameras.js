$(window).on("load", function (){
	for (let i = 0; i < 6; i++) {
		$("#cameras").append($(`<div class="card">
				<iframe class="card-img-top" src="https://www.youtube.com/embed/lM02vNMRRB0" frameborder="0"></iframe>
				<div class="card-body row">
					<div class="col-7">
						<h4 class="card-title">Camera info</h4>
					</div>
					<div class="col">
						<button class="btn btn-info" data-toggle="modal" data-target="#videoModal-${i}" onclick="toggleModal1()">Full screen</button>
					</div>
				</div>
			</div>`));
		$(".wrapper").append($(`<div class="modal fade" id="videoModal-${i}" tabindex="-1" role="dialog" aria-labelledby="videoModal-1Label" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
				<div class="modal-content" id="videoModal-inner">
					<div class="modal-body">
						<iframe class="card-img-top" src="https://www.youtube.com/embed/lM02vNMRRB0" frameborder="0"></iframe>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>`));
	}

	$(".toast").toast("show");
	
});