var display = [0, 0.2, 0.4, 0.6, 1, 0.3];

$(window).on("load", function (){
	for (let i = 0; i < 6; i++) {
		$("#cameras").append($(`<div class="card text-white ${display[i] < 0.5 ? "bg-success" : "bg-danger"}">
				<iframe class="card-img-top" src="https://www.youtube.com/embed/lM02vNMRRB0" frameborder="0"></iframe>
				<div class="card-body row">
					<div class="col-7">
                        <h4 class="card-title">Camera ${i+1}</h4>
                        <small>Location: Washington, DC</small>
					</div>
					<div class="col">
						<button class="btn btn-warning" data-toggle="modal" data-target="#videoModal-${i}" onclick="toggleModal1()">Full screen</button>
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

    setTimeout(() => { $(".alert").addClass('show')}, 3000);

});