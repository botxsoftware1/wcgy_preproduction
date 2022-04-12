// SERVER SIDE PAGINATION AND JOB CARD GENERATION 
$(function(){

	var page = 1,
		  pagelimit = 10,
		  totalrecord = 0;
	var jobType = [],
			jobLocation = [],
			jobSkill = [];

	fetchData();

	// PAGINATION BUTTONS
	$(".prev-btn").on("click", function(){
	  if (page > 1) {
		page--;
		fetchData();
	  }
		// $('#page')[0].innerHTML = ": " + page;
	});

	$(".next-btn").on("click", function(){
	  if (page * pagelimit < totalrecord) {
		page++;
		fetchData();
	  }
		// $('#page')[0].innerHTML = ": " + page;
	});
	// END PAGINATION BUTTONS

	// SEARCH BAR
	$("#searchBar").on("submit", function(e){
		searchValue = $("#searchField").val();
		fetchData(searchValue);
		e.preventDefault();
	});
	// END SEARCH BAR

	// FILTER BASED ON TAGS
	$('.filterTags').on("click", function(e) {
		searchValue = e.target.value;
		fetchData(searchValue, true, false);
	});
	// END FILTER BASED ON TAGS

	// SIDEBAR FILTER
	$('.sidebar-filter').on("click", function(e) {
		var jobFilter = [];

		// IF THE CLICKED CHECKBOX IS CHECKED, ADD CHECKBOX VALUE TO RESPECTIVE ARRAY
		if (e.target.checked) {
			if (e.target.name == "jobType") {
				jobType.push(e.target.value);
			}
			else if (e.target.name == "jobLocation") {
				jobLocation.push(e.target.value);
			}
			else {
				jobSkill.push(e.target.value);
			}
		}

		// IF THE CLICKED CHECKBOX IS UNCHECKED, REMOVE CHECKBOX VALUE FROM RESPECTIVE ARRAY
		else {
			if (e.target.name == "jobType") {
				jobType = jobType.filter(removeFromFilter);
			}
			else if (e.target.name == "jobLocation") {
				jobLocation = jobLocation.filter(removeFromFilter);
			}
			else {
				jobSkill = jobSkill.filter(removeFromFilter);
			}

			// FILTER FUNCTION TO REMOVE AN ELEMENT FROM ARRAY 
			function removeFromFilter(element) {
				return element != e.target.value;
			}

		}
		
		// COMBINING ALL THREE CATEGORY ARRAYS TO FORM A SINGLE 2D ARRAY TBEFORE SENDING TO BACKEND
		jobFilter.push(jobType,jobLocation,jobSkill);

		// SENDING CATEGORY FILTER ARRAY TO BACKEND IF ATLEAST ONE CHECKBOX IS CHECKED
		if (jobFilter[0].length != 0 || jobFilter[1].length != 0 || jobFilter[2].length != 0) {
			fetchData(jobFilter, false, true);
		}

		// IF ALL CHECKBOXES ARE UNCHECKED, FETCH DATA NORMALLY FORM BACKEND
		else {
			fetchData();
		}

	});
	// END SIDEBAR FILTER


	function fetchData(searchValue = "", tagSearch = false, categoryFilter = false) {
		
	  // ajax() method to make api calls
	  $.ajax({
		url: "https://script.google.com/macros/s/AKfycbz1rNLBG2jBj1RP-BI_qhdJQq1TbyjlhkRlhIKs1b96zrOTtGpOkjl_NIS8NJyaMpLW/exec",
		type: "GET",
		data: { 
				page: page,
				limit: pagelimit,
				search: JSON.stringify(searchValue),
				searchByTag: tagSearch,
				filterByCategory: categoryFilter
		},
		success: function(data) {
			console.log(data);
		  if (data.jobs) {
				var dataArr = data.jobs;
				totalrecord = data.rowCount;
				// console.log("lastrow : ",data.lastRow);

				document.getElementById('jobCountTitle').innerHTML = `Found ${totalrecord} jobs for you!`;

				function jobTemplate(job) {
					return `
						<div class="flex flex-col border-2 border-gray-900 rounded-xl py-3 px-4 bg-white space-y-4 hover:bg-pink-400 drop-shadow-2xl transition  duration-100">
							<div class="flex items-top justify-between w-full">
								<div>
									<img src="${job.photo}" class="w-16 rounded-lg">
								</div>
								<div class="">

									<!-- SHARE BUTTON WITH TOOLTIP -->
									<div x-data="{ tooltip: false }" class="relative z-30 inline-flex">
										<div x-on:mouseover="tooltip = true" x-on:mouseleave="tooltip = false">
											<button onclick="shareButton(this)" onmouseout="afterClickShare(this)" class="border border-black flex items-center bg-black justify-center p-2 rounded-xl">
												<span id="shareLink" style="display:none;">http://localhost:5500/jobDetails.html?jobId=${job.jobId}</span>
												<svg class="h-5 w-5" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
													<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
													<g id="Social-Icons---Rounded" transform="translate(-40.000000, -379.000000)">
													<g id="Share" transform="translate(40.000000, 379.000000)">
													<path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" id="Rounded" fill="#000000"></path>
													<path d="M21.855,43.51 C23.681,43.51 25.363,42.885 26.697,41.838 L41.603,49.197 C41.603,49.227 41.601,49.254 41.601,49.283 C41.601,53.621 45.119,57.139 49.457,57.139 C53.794,57.139 57.312,53.621 57.312,49.283 C57.312,44.946 53.794,41.428 49.457,41.428 C47.148,41.428 45.074,42.422 43.638,44.006 L29.582,37.067 C29.664,36.61 29.71,36.139 29.71,35.656 C29.71,35.559 29.707,35.463 29.703,35.367 L44.244,27.731 C45.632,28.961 47.457,29.711 49.457,29.711 C53.796,29.711 57.312,26.194 57.312,21.856 C57.312,17.516 53.794,14 49.457,14 C45.119,14 41.601,17.516 41.601,21.856 C41.601,22.18 41.625,22.498 41.662,22.811 L27.533,30.231 C26.103,28.735 24.089,27.801 21.855,27.801 C17.517,27.801 14,31.319 14,35.656 C14,39.994 17.517,43.51 21.855,43.51" fill="#ffffff"></path>
													</g>
													</g>
													</g>
												</svg>
											</button>
										</div>
										<div class="relative" x-cloak x-show.transition.origin.top="tooltip">
											<div id="shareLinkText" class="text-center absolute top-0 z-10 w-24 p-2 -mt-1 text-sm leading-tight text-white bg-black transform -translate-x-2/3 -translate-y-full rounded-lg shadow-lg">
												Copy Link
											</div>
											<svg class="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-8 -translate-y-3 fill-black stroke-black" width="8" height="8">
												<rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
											</svg>
										</div>
									</div>
									<!-- END SHARE BUTTON WITH TOOLTIP-->

								</div>
							</div>
							<div>
								<a href="http://localhost:5500/employerPage.html?companyId=${job.companyId}" target="_blank">${job.company}</a>	
							</div>
							<div>
							<a href="http://localhost:5500/jobDetails.html?jobId=${job.jobId}" target="_blank">
									<p class="text-2xl">${job.name}</p>
								</a>
								<p class="truncate">Job ID : ${job.jobId}</p>
							</div>
							<div class="gap-2 flex pb-3">
								<button style="cursor: default;" class="py-1 px-4 text-sm bg-gray-900 text-white rounded-md">${job.kind}</button>
								<button style="cursor: default;" class="py-1 px-4 text-sm bg-gray-900 text-white rounded-md">${job.type}</button>
								<button style="cursor: default;" class="py-1 px-4 text-sm bg-gray-900 text-white rounded-md">${job.tags}</button>
							</div>
						</div>
					`;
				}

				document.getElementById("allJobs").innerHTML = `${dataArr.map(jobTemplate).join("")}`
				$('#page')[0].innerHTML = ": " + page;
		  }
		},
		error: function(jqXHR, textStatus, errorThrown) {
		  console.log(jqXHR);
		  console.log(textStatus);
		  console.log(errorThrown);
		}
	  });
	}
});
// END SERVER SIDE PAGINATION AND JOB CARD GENERATION 



// SHARE JOB / COPY TO CLIPBOARD
function shareButton(e) {
    var copyText = $(e).find('[id=shareLink]');
    navigator.clipboard.writeText(copyText[0].innerHTML);
    
    var tooltip = $(e).parent().parent().find('[id=shareLinkText]');
    tooltip[0].innerHTML = "Link copied";
}

function afterClickShare(e) {
    var tooltip = $(e).parent().parent().find('[id=shareLinkText]');
    tooltip[0].innerHTML = "Copy Link";
}
// END SHARE JOB / COPY TO CLIPBOARD







