
window.onload = () => {
	// ajax() method to make api calls
	currentUrl = new URLSearchParams(window.location.search);
	companyId = currentUrl.get('companyId');
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbzo4aZA_eYv029O8Mzb7rdnQXaEvK2mL2ghXtn7o51AwyHI0J0w4Y0aRaymza8kjUBz0w/exec",
		type: "GET",
		data: { 
			companyId: companyId,
		},
		success: function(data) {
			var companyData = data.company[0];
			var jobData = data.jobs;
			if(data.length != 0){
				console.log(data);

				document.getElementById('shareLink').innerHTML += companyData.companyId;
				document.getElementById('companyLogo').src = companyData.companyLogo;
				document.getElementsByClassName('companyName')[0].innerHTML = companyData.companyName;
				document.getElementById('companyMotto').innerHTML = companyData.companyMotto;
				document.getElementById('employeeCount').innerHTML = companyData.employeeCount;
				document.getElementById('happinessScore').innerHTML = companyData.happinessScore;
				document.getElementById('growthScore').innerHTML = companyData.growthScore;
				document.getElementsByClassName('companyName')[1].innerHTML = companyData.companyName;
				document.getElementById('companyAddress').innerHTML = companyData.companyAddress;
				document.getElementById('companyWebsite').href = companyData.companyWebsite;


				// TESTIMONIAL CARDS
				// CARD 1
				document.getElementsByClassName('testimonialCard')[0].style.backgroundColor = companyData.primaryColor;
				document.getElementById('aCardMsg').innerHTML = companyData.aEmpMsg;
				document.getElementById('aCardName').innerHTML = companyData.aEmpName;
				document.getElementById('aCardPhoto').src = companyData.aEmpPhoto;
				document.getElementById('aCardCompany').innerHTML = companyData.aEmpDesignation + " / " + companyData.companyName;
				// CARD 2
				document.getElementsByClassName('testimonialCard')[1].style.backgroundColor = companyData.primaryColor;
				document.getElementById('bCardMsg').innerHTML = companyData.bEmpMsg;
				document.getElementById('bCardName').innerHTML = companyData.bEmpName;
				document.getElementById('bCardPhoto').src = companyData.bEmpPhoto;
				document.getElementById('bCardCompany').innerHTML = companyData.bEmpDesignation + " / " + companyData.companyName;	
				// CARD 3
				document.getElementsByClassName('testimonialCard')[2].style.backgroundColor = companyData.primaryColor;
				document.getElementById('cCardMsg').innerHTML = companyData.cEmpMsg;
				document.getElementById('cCardName').innerHTML = companyData.cEmpName;
				document.getElementById('cCardPhoto').src = companyData.cEmpPhoto;
				document.getElementById('cCardCompany').innerHTML = companyData.cEmpDesignation + " / " + companyData.companyName;
				// END TESTIMONIAL CARDS


				// ABOUT MODAL
				document.getElementsByClassName('companyName')[2].innerHTML = companyData.companyName;
				document.getElementById('establishedYear').innerHTML = companyData.establishedYear;
				document.getElementById('industryType').innerHTML = companyData.industryType;
				document.getElementById('companyHeadquarters').innerHTML = companyData.companyHeadquarters;
				document.getElementById('companyIdNum').innerHTML = companyData.companyIdNum;
				// END ABOUT MODAL

			}

			function cardTemplate(job) {
				return `          
					<div class="rounded-global p-3 gap-2 border dark:border-slate-700">
						<span class="text-primary-500 text-4xl">
							<div style="font-size:inherit;color:inherit;padding:2px">
							</div>
						</span>
						<p class="font-extrabold text-2xl text-slate-900 mb-5 dark:text-slate-200 ">${job[0]}</p>
						<div class="flex flex-row items-center">
							<span class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
								${job[6]} - ${job[7]}
							</span> &nbsp;&nbsp;&nbsp;
							<span class="flex inline-flex items-center px-2.5 py-0.5 bg-yellow-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
							<svg text-sm class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
							</svg>${job[8]}
							</span>
						</div>
						<div class="flex-1 inline-flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
								<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
							</svg>
							<p>${job[9]} Applied!</p>
						</div>
						<a href="http://127.0.0.1:5500/wcgy_preprod/jobDetails?jobId=${job[1]}">
							<button class="testimonialCard float-right modal-open bg-primary rounded-global text-white p-2 w-20 items-center inline-flex">
								Apply
								<span class="order-last">
									<div style="font-size:inherit;color:inherit;padding:2px">
										<svg stroke="currentColor" fill="currentColor"
											stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
											</path>
										</svg>
									</div>
								</span>
							</button>
						</a>
					</div>`
			}
			
			document.getElementById("jobCards").innerHTML = `${jobData.map(cardTemplate).join("")}`

			var color = document.getElementsByClassName('testimonialCard');
			for (i = 0; i<color.length; i++ ) {
				color[i].style.backgroundColor = companyData.primaryColor;
			}

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
};