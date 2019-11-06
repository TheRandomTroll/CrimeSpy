$(window).on("load", function () {
	var today = new Date();
	var month = today.getMonth();
	var year = today.getFullYear();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	document.getElementById("month-name").append(monthNames[month] + " " + year);
	//document.getElementById("year").innerText = year;
	$(".year").each(function () {
	    this.innerText = year;
	});
	var days = daysInMonth(month, year);
	var daysDiv = document.getElementById("calendar-days");


	function daysInMonth(month, year) {
	    return new Date(year, month + 1, 0).getDate();
	}

	function displayDays() {
	    var todayButton = "info";
	    for (let day = 1; day <= days; day++) {
	        if (day == today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
	            todayButton = "warning";
	        }
	        daysDiv.innerHTML += `<button type="button" class="btn btn-outline-${todayButton} circular-btn" data-toggle="modal" data-target=".bd-example-modal-lg-${day}-${month}-${year}"><div class="day">${day}</div></button>

	                                <div class="modal fade bd-example-modal-lg-${day}-${month}-${year}" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	                                    <div class="modal-dialog" role="document">
	                                        <div class="modal-content">
	                                          <div class="modal-header">
	                                            <h5 class="modal-title" id="Modal-${day}-${month}-${year}">${weekDays[new Date(year, month, day, 12, 0, 0, 0).getDay()]} ${("0" + day).slice(-2)}.${("0" + (month + 1)).slice(-2)}.${year}</h5>

	                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	                                              <span aria-hidden="true">&times;</span>
	                                            </button>
	                                          </div>
	                                          <div class="modal-body">
	                                            <div class="modalPreview" id='Modal-Content-${day}-${month}-${year}'>
	                                                <iframe class="card-img-top" src="https://www.youtube.com/embed/lM02vNMRRB0" frameborder="0" loading="lazy"></iframe>
	                                            </div>
	                                          </div>
	                                          <div class="modal-footer">
	                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	                                          </div>
	                                        </div>
	                                    </div>
	                                </div>`;
	        todayButton = "primary";
	        if (day % 7 === 0) {
	            daysDiv.innerHTML += `<br /><br />`;
	        }
	    }
	}

	displayDays();



	$("#btn-back").click(function () {
	    month -= 1;
	    if (month == -1) {
	        month = 11;
	        year--;
	        $("#year").fadeOut("slow", function () {
	            $(this).html(year).fadeIn("slow");
	        });
	    }
	    $("#month-name").fadeOut("slow", function () {
	    	var monthNamesYear = monthNames[month] + " " + year;
	        $(this).html(monthNamesYear).fadeIn("slow");
	    });
	    days = daysInMonth(month, year);
	    daysDiv.innerHTML = "";
	    displayDays();
	});

	$("#btn-forward").click(function () {
	    month += 1;
	    if (month == 12) {
	        month = 0;
	        year++;
	        $("#year").fadeOut("slow", function () {
	            $(this).html(year).fadeIn("slow");
	        });
	    }
	    $("#month-name").fadeOut("slow", function () {
	    	var monthNamesYear = monthNames[month] + " " + year;
	        $(this).html(monthNamesYear).fadeIn("slow");
	    });    
	    days = daysInMonth(month, year);
	    daysDiv.innerHTML = "";
	    displayDays();
	});
});