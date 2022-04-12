
var jobsData = [];



// FETCH JSON
var jobsData = (function () {
  var json = null;
  $.ajax({
      'async': false,
      'global': false,
      'url': 'https://script.google.com/macros/s/AKfycbxo2MAob3LOcKsV5pOSecNwiZT2BhnPbSMzhVvq6gpvv1p7cx4/exec',
      'dataType': "json",
      'success': function (data) {
          json = data;
      }
  });
  return json["user"];
})(); 
// END FETCH JSON



// START PAGINATION
let jsp_current_page = 1;
const jsp_records_per_page = 15;
var jsp_json_object = jobsData

function jsp_num_pages() {
  return Math.ceil(jsp_json_object.length / jsp_records_per_page);
}

function jsp_prev_page() {
  if (jsp_current_page > 1) {
      jsp_current_page--;
      jsp_change_page(jsp_current_page);
  }
}

function jsp_next_page() {
  if (jsp_current_page < jsp_num_pages()) {
      jsp_current_page++;
      jsp_change_page(jsp_current_page);
  }
}

function jsp_change_page(page, jsp_json_object = jobsData) {
  const btn_prev = document.getElementById('btn-prev');
  const btn_next = document.getElementById('btn-next');
  const jobcard = document.getElementById('jobcard');
  let page_span = document.getElementById('page');

  if (page < 1) {
      page = 1;
  }
  if (page > jsp_num_pages()) {
      page = jsp_num_pages();
  }

  jobcard.innerHTML = ''

  for (let i = (page - 1) * jsp_records_per_page; i < (page * jsp_records_per_page) && i < jsp_json_object.length; i++) {
    
	jobcard.innerHTML += `<!--Job Card-->
    <section class="ml-1 items-center justify-content-center place-content-evenly float-left">
			<div class="max-w-lg min-w-0 mx-auto z-10 justify-between">
				<div class="flex flex-col">
					<div class="bg-white border border-white shadow-lg rounded-xl pb-3 my-1 mr-1" style="position: relative; display: block;">
						<button class="shareTooltip" onclick="shareButton(this)" onmouseout="afterClickShare(this)" style="position: absolute; top: 2px; right: 5px;">
							<span id="shareTooltip" class="tooltiptext">Copy Link</span>
							<span id="shareLink" style="display:none;">http://localhost:5500/jobDetails.html?jobId=${jsp_json_object[i].jobId}</span>
							<svg class="h-5 w-5" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="Social-Icons---Rounded" transform="translate(-40.000000, -379.000000)">
										<g id="Share" transform="translate(40.000000, 379.000000)">
											<path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" id="Rounded" fill="#FFFFFF"></path>
											<path d="M21.855,43.51 C23.681,43.51 25.363,42.885 26.697,41.838 L41.603,49.197 C41.603,49.227 41.601,49.254 41.601,49.283 C41.601,53.621 45.119,57.139 49.457,57.139 C53.794,57.139 57.312,53.621 57.312,49.283 C57.312,44.946 53.794,41.428 49.457,41.428 C47.148,41.428 45.074,42.422 43.638,44.006 L29.582,37.067 C29.664,36.61 29.71,36.139 29.71,35.656 C29.71,35.559 29.707,35.463 29.703,35.367 L44.244,27.731 C45.632,28.961 47.457,29.711 49.457,29.711 C53.796,29.711 57.312,26.194 57.312,21.856 C57.312,17.516 53.794,14 49.457,14 C45.119,14 41.601,17.516 41.601,21.856 C41.601,22.18 41.625,22.498 41.662,22.811 L27.533,30.231 C26.103,28.735 24.089,27.801 21.855,27.801 C17.517,27.801 14,31.319 14,35.656 C14,39.994 17.517,43.51 21.855,43.51" fill="#2A5A5A"></path>
										</g>	
									</g>
								</g>
							</svg>
						</button>
						<div class="flex sm:flex"> 
							<div class=" relative h-32 w-32 sm:mb-0 ml-3 mb-20 mt-3 justify-center justify-items-center">
								<a href="http://localhost:5500/jobDetails.html?jobId=${jsp_json_object[i].jobId}" target="_blank">
									<img src="${jsp_json_object[i].photo}" alt="pranav" class="w-32 h-32 shadow-lg outline-2 rounded-2xl">
								</a>
								<div class="w-full pt-1 mb-8 z-5 justify-center text-ellipsis overflow-hidden flex-auto inline-flex fixed-top-right float-right  object-right-top">
									<span class="badge badge-sm">Job ID: ${jsp_json_object[i].jobId}</span>
								</div>
							</div>
							<div class="flex-auto sm:ml-5 justify-evenly">
								<div class="flex items-center justify-between sm:mt-2">
									<div class="flex items-center">
										<div class="flex flex-col">
											<a href="http://localhost:5500/jobDetails.html?jobId=${jsp_json_object[i].jobId}" target="_blank">	
												<div class="w-full z-30 text-ellipsis overflow-hidden flex-auto inline-flex text-lg text-gray-800 font-bold leading-none">${jsp_json_object[i].name}</div>
											</a>
											<div class="flex-auto text-gray-500 my-1">
												<span class="mr-3 bg-gray ">${jsp_json_object[i].company}</span>
											</div>
											</div>
										</div>
									</div>
									<div class="flex-1 z-40 inline-flex  items-center">
										<img class="w-5 h-5" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDU2LjY5MyA1Ni42OTMiIGhlaWdodD0iNTYuNjkzcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1Ni42OTMgNTYuNjkzIiB3aWR0aD0iNTYuNjkzcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yOC4zNDgsNS4xNTdjLTEzLjYsMC0yNC42MjUsMTEuMDI3LTI0LjYyNSwyNC42MjVjMCwxMy42LDExLjAyNSwyNC42MjMsMjQuNjI1LDI0LjYyM2MxMy42LDAsMjQuNjIzLTExLjAyMywyNC42MjMtMjQuNjIzICBDNTIuOTcxLDE2LjE4NCw0MS45NDcsNS4xNTcsMjguMzQ4LDUuMTU3eiBNNDAuNzUyLDI0LjgxN2MwLjAxMywwLjI2NiwwLjAxOCwwLjUzMywwLjAxOCwwLjgwM2MwLDguMjAxLTYuMjQyLDE3LjY1Ni0xNy42NTYsMTcuNjU2ICBjLTMuNTA0LDAtNi43NjctMS4wMjctOS41MTMtMi43ODdjMC40ODYsMC4wNTcsMC45NzksMC4wODYsMS40OCwwLjA4NmMyLjkwOCwwLDUuNTg0LTAuOTkyLDcuNzA3LTIuNjU2ICBjLTIuNzE1LTAuMDUxLTUuMDA2LTEuODQ2LTUuNzk2LTQuMzExYzAuMzc4LDAuMDc0LDAuNzY3LDAuMTExLDEuMTY3LDAuMTExYzAuNTY2LDAsMS4xMTQtMC4wNzQsMS42MzUtMC4yMTcgIGMtMi44NC0wLjU3LTQuOTc5LTMuMDgtNC45NzktNi4wODRjMC0wLjAyNywwLTAuMDUzLDAuMDAxLTAuMDhjMC44MzYsMC40NjUsMS43OTMsMC43NDQsMi44MTEsMC43NzcgIGMtMS42NjYtMS4xMTUtMi43NjEtMy4wMTItMi43NjEtNS4xNjZjMC0xLjEzNywwLjMwNi0yLjIwNCwwLjg0LTMuMTJjMy4wNjEsMy43NTQsNy42MzQsNi4yMjUsMTIuNzkyLDYuNDgzICBjLTAuMTA2LTAuNDUzLTAuMTYxLTAuOTI4LTAuMTYxLTEuNDE0YzAtMy40MjYsMi43NzgtNi4yMDUsNi4yMDYtNi4yMDVjMS43ODUsMCwzLjM5NywwLjc1NCw0LjUyOSwxLjk1OSAgYzEuNDE0LTAuMjc3LDIuNzQyLTAuNzk1LDMuOTQxLTEuNTA2Yy0wLjQ2NSwxLjQ1LTEuNDQ4LDIuNjY2LTIuNzMsMy40MzNjMS4yNTctMC4xNSwyLjQ1My0wLjQ4NCwzLjU2NS0wLjk3NyAgQzQzLjAxOCwyMi44NDksNDEuOTY1LDIzLjk0Miw0MC43NTIsMjQuODE3eiIvPjwvc3ZnPg==">
										<img class="w-5 h-5" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNjdweCIgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY3IDY3OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjcgNjciIHdpZHRoPSI2N3B4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNNTAuODM3LDQ4LjEzN1YzNi40MjVjMC02LjI3NS0zLjM1LTkuMTk1LTcuODE2LTkuMTk1ICBjLTMuNjA0LDAtNS4yMTksMS45ODMtNi4xMTksMy4zNzRWMjcuNzFoLTYuNzljMC4wOSwxLjkxNywwLDIwLjQyNywwLDIwLjQyN2g2Ljc5VjM2LjcyOWMwLTAuNjA5LDAuMDQ0LTEuMjE5LDAuMjI0LTEuNjU1ICBjMC40OS0xLjIyLDEuNjA3LTIuNDgzLDMuNDgyLTIuNDgzYzIuNDU4LDAsMy40NCwxLjg3MywzLjQ0LDQuNjE4djEwLjkyOUg1MC44Mzd6IE0yMi45NTksMjQuOTIyYzIuMzY3LDAsMy44NDItMS41NywzLjg0Mi0zLjUzMSAgYy0wLjA0NC0yLjAwMy0xLjQ3NS0zLjUyOC0zLjc5Ny0zLjUyOHMtMy44NDEsMS41MjQtMy44NDEsMy41MjhjMCwxLjk2MSwxLjQ3NCwzLjUzMSwzLjc1MywzLjUzMUgyMi45NTl6IE0zNCw2NCAgQzE3LjQzMiw2NCw0LDUwLjU2OCw0LDM0QzQsMTcuNDMxLDE3LjQzMiw0LDM0LDRzMzAsMTMuNDMxLDMwLDMwQzY0LDUwLjU2OCw1MC41NjgsNjQsMzQsNjR6IE0yNi4zNTQsNDguMTM3VjI3LjcxaC02Ljc4OXYyMC40MjcgIEgyNi4zNTR6IiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojMDEwMTAxOyIvPjwvc3ZnPg=="> 
										<span class="mr-3 border-r border-gray-200  max-h-0"></span>
										<span class="inline-flex"> 
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 px-0" viewBox="0 0 20 20" fill="gray-300"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
											${jsp_json_object[i].locationPlace}, ${jsp_json_object[i].locationCountryCode}
										</span>
									</div>
									<div class="flex flex-row items-center">
										<span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
											${jsp_json_object[i].type} - ${jsp_json_object[i].kind}
										</span> &nbsp;&nbsp;&nbsp;
										<span class="flex inline-flex items-center px-2.5 py-0.5 bg-yellow-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
										<svg text-sm class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
										</svg>${jsp_json_object[i].lastDateToApply}
										</span>
									</div>
									<div class="flex pt-2 inline-flex  text-sm text-gray-500">
										<div class="flex-1 inline-flex items-center">
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
												<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
											</svg>
											<p class="w-24">${jsp_json_object[i].headCountApplied} Applied!</p>
										</div>




										<!-- JOB INFO BUTTON -->
										<div x-data="{ tooltip: false }" class="relative z-30 inline-flex">
											<div x-on:mouseover="tooltip = true" x-on:mouseleave="tooltip = false">
												<label for="job-info${jsp_json_object[i].jobId}" class="z-40" style=" line-height: 30px; width: 100%; display: inline-block;">
														<svg style="display: inline-block; vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
															<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
														</svg>
												</label>
											</div>
											<div class="relative" x-cloak x-show.transition.origin.top="tooltip">
												<div class="absolute top-0 z-10 w-27 p-2 -mt-1 text-sm leading-tight text-white bg-black transform -translate-x-1/2 -translate-y-full rounded-lg shadow-lg">
													Details
												</div>
												<svg class="absolute z-10 w-6 h-6 text-orange-500 transform -translate-x-6 -translate-y-3 fill-black stroke-black" width="8" height="8">
													<rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
												</svg>
											</div>
										</div>

										<!-- END JOB INFO BUTTON -->

										<!-- JOB INFO MODAL -->
                    <input type="checkbox" id="job-info${jsp_json_object[i].jobId}" class="modal-toggle"> 
                    <div class="modal">
                      <div class="modal-box">
                        <div class="card-body p-0">
                          <h2 class="m-0 mb-3 py-0 text-4xl font-bold card-title">${jsp_json_object[i].name}
                          	<label for="job-info${jsp_json_object[i].jobId}" class="btn btn-xs btn-outline btn-primary btn-square float-right">X</label>
													</h2> 
													<div class="space-x-2 card-actions">
														<div class="badge badge-ghost">${jsp_json_object[i].company}</div> 
														<div class="badge badge-ghost">${jsp_json_object[i].jobType}</div>
														<div class="badge badge-ghost">${jsp_json_object[i].jobKind}</div>
													</div> 
													<div class="space-x-2 card-actions">
														<div class="badge badge-ghost">${jsp_json_object[i].locationPlace}, ${jsp_json_object[i].locationCountryCode}</div>
														<div class="badge badge-ghost">${jsp_json_object[i].jobKind}</div>
														<div class="badge badge-ghost">${jsp_json_object[i].jobKind}</div>
													</div>
													<div>
														<!--actual component start-->
														<div x-data="setup()">
															<ul class="flex justify-center items-center my-4">
																<template x-for="(tab, index) in tabs" :key="index">
																	<li class="tab tab-lifted cursor-pointer py-2 px-4"
																		:class="activeTab===index ? 'flex-1 cursor-pointer tab tab-lifted tab-active text-blue-500 font-bold' : ''" @click="activeTab = index"
																		x-text="tab"></li>
																</template>
															</ul>
															<div class="w-200 bg-grey p-5">
																<div x-show="activeTab===0">${jsp_json_object[i].jobBrief}</div>
																<div x-show="activeTab===1"><img src="${jsp_json_object[i].jobRequirements}"></div>
																<div x-show="activeTab===2">${jsp_json_object[i].jobResponsibility}</div>
																<div x-show="activeTab===3">${jsp_json_object[i].jobBenefits}</div>
															</div>
                            </div>
                            <!--actual component end-->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- END JOB INFO MODAL -->


										&nbsp;&nbsp;&nbsp;&nbsp;


										<!-- JOB APPLY BUTTON -->
										<label for="job-confirm${jsp_json_object[i].jobId}" class="btn btn-primary modal-button btn-sm">Apply <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></label>
										<!-- END JOB APPLY BUTTON -->

										<!-- JOB APPLY MODAL -->
										<input type="checkbox" id="job-confirm${jsp_json_object[i].jobId}" class="modal-toggle"> 
										<div class="modal">
											<div class="modal-box">
												<label for="job-confirm${jsp_json_object[i].jobId}" class="btn btn-xs btn-outline btn-primary btn-square float-right">X</label></h2> 
												
												<!-- APPLICATION FORM -->
												<form id="contact" class="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8" autocomplete="off"> 
													<h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white"> Apply for ${jsp_json_object[i].name} </h1>
													<p class="text-base lg:text-xl text-gray-800 dark:text-white mt-2"> at ${jsp_json_object[i].company} <span class="font-bold"></span></p>
						
													<input placeholder="Your name" id="Name" data-name="Name" type="text" name=“entry.467876062” tabindex="1" autofocus/>
													<input placeholder="Your Email Id to receive Confirmation" data-name="Email" id="Email" type="email" name=“entry.362738034” tabindex="2"/>
													<input placeholder="Your Phone Number" id="Phone" data-name="Phone" name=“entry.961587284” type="tel" minlength="10" maxlength="10" tabindex="3"/>
						
													<input placeholder="Job ID" id="JobId" value=${jsp_json_object[i].jobId} data-name="JobId" name=“entry.284597317” type="tel" tabindex="4" readonly/>
						
													<input type="file" name="sampleFiles" id="sampleFiles" tabindex="5" multiple/><br/> 
													<button name="submit" type="button" id="contact-submit" form="contact">
														Submit
													</button>               
												</form>
												<!-- END APPLICATION FORM -->

											</div>
										</div>
										<!-- END JOB APPLY MODAL -->

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    </section>
    <!--Job Card-->`;



  }
  page_span.innerHTML = `${page}/${jsp_num_pages()}`;

  btn_prev.style.display = (page === 1) ? 'none' : 'inline-block';
  btn_next.style.display = (page === jsp_num_pages()) ? 'none' : 'inline-block';
}

window.onload = () => {
  document.getElementById('btn-prev').addEventListener('click', (e) => {
      e.preventDefault();
      jsp_prev_page();
  });

  document.getElementById('btn-next').addEventListener('click', (e) => {
      e.preventDefault();
      jsp_next_page();
  });

  jsp_change_page(1);
};
// END PAGINATION



// JOB INFO TABS
function setup() {
	return {
		activeTab: 0,
		tabs: [
			"Job Brief",
			"Requirements",
			"Responsibilities",
			"Benefits"
		]
	};
};
// END JOB INFO TABS



// SHARE JOB / COPY TO CLIPBOARD
function shareButton(e) {
  var copyText = $(e).find('[id=shareLink]');
  navigator.clipboard.writeText(copyText[0].innerHTML);
  
  var tooltip = $(e).find('[id=shareTooltip]');
  tooltip[0].innerHTML = "Link copied";
}

function afterClickShare(e) {
  var tooltip = $(e).find('[id=shareTooltip]');
  tooltip[0].innerHTML = "Copy Link";
}
// END SHARE JOB / COPY TO CLIPBOARD



// SEARCH
$(document).ready(function(){
	$('#searchBox').keyup(function(){
		if($('#searchBox').val() == '')  {
			$('#paginationControl').css("visibility", "visible");
			jsp_change_page(1);
		}
		else {
			$('#paginationControl').css("visibility", "hidden");
			$('#SortBy, #FilterBy').prop('selectedIndex',0);
			var searchField = $(this).val();
			var regex = new RegExp(searchField, "i");
			const newArray = [];
			$.each(jobsData, function(key, val){
			if ((val.name.search(regex) != -1) || (val.company.search(regex) != -1)) {
				newArray.push(val);
				jsp_change_page(1,newArray);
			}
			});
		}
  });
});
// END SEARCH



// FILTER
$(document).ready(function(){
	$('#FilterBy, #SortBy').change(function(){
		var filteredArray = [];
		jobType = $('#SortBy').val();
		jobCategory = $('#FilterBy').val();
		
		if(jobCategory != 'Filter by Category' && jobType != 'Filter by Type') {
			$('#paginationControl').css("visibility", "hidden");
			filteredArray = jobsData.filter(job => {
				return job.kind == jobCategory && job.type == jobType;
			});
			jsp_change_page(1,filteredArray);
		}
		else if(jobCategory != 'Filter by Category' || jobType != 'Filter by Type') {
			$('#paginationControl').css("visibility", "hidden");
			if(jobCategory != 'Filter by Category'){
				filteredArray = jobsData.filter(job =>{
					return job.kind == jobCategory;
				});
				jsp_change_page(1,filteredArray);
			}
			else{
				filteredArray = jobsData.filter(job => {
					return job.type == jobType;
				});
				jsp_change_page(1,filteredArray);
			}
		}
		else {
			$('#paginationControl').css("visibility", "visible");
			jsp_change_page(1);
		}
	});
});
// END FILTER