// TO RANDOMIZE SKILL TAG COLOR
var colors = ['blue','grey','red','green','indigo','purple','orange','yellow','cyan','teal','pink'];


// DATA FETCH FUNCTION 
window.onload = () => {

	currentUrl = new URLSearchParams(window.location.search);
	jobId = currentUrl.get('jobId');
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbz8L5g9hCako9EN07uWk9Gq0Lq3NRcl6nUctJq2svq0MJPy18u4aEir8csVv4s0n867/exec",
		type: "GET",
		data: { 
			jobId: jobId,
		},
		success: function(data) {
			var jobDetails = data[0];

			if(data.length != 0){
				console.log(data);

				if(jobDetails.featured == "Yes") {
					document.getElementById('featuredTag').style.visibility = "visible";
				}
				
				// HERO SECTION
				document.getElementById('jobName').innerHTML = jobDetails.name;
				document.getElementById('companyName').innerHTML += jobDetails.companyName;
				document.getElementById('jobId').innerHTML += jobDetails.jobId;
				document.getElementById('applyBy').innerHTML += jobDetails.applyBy;
				document.getElementById('location').innerHTML += jobDetails.location;
				document.getElementById('jobBrief').innerHTML = jobDetails.brief;

				// JOB DETAILS SECTION
				document.getElementById('salary').innerHTML += jobDetails.salary + "/- Per Annum.";
				document.getElementById('jobBrief').innerHTML = jobDetails.brief;
				document.getElementById('experience').innerHTML += jobDetails.experience + " Years";
				document.getElementById('jobType').innerHTML += jobDetails.type;
				document.getElementById('workLocation').innerHTML += jobDetails.workLocation;
				document.getElementById('vacancy').innerHTML += jobDetails.vacancy;
				document.getElementById('industry').innerHTML += jobDetails.industry;
				document.getElementById('companyPage').href += jobDetails.companyId;
				document.getElementById('applyBtn').value = jobDetails.jobId;
				

				// KNOW MORE ABOUT THE JOB SECTION
				document.getElementById('requirements').innerHTML = jobDetails.requirements;
				document.getElementById('roleAndResponsibility').innerHTML = jobDetails.roleAndResponsibility;
				document.getElementById('benefits').innerHTML = jobDetails.benefits;

				// SKILLTAGS 

				for (i=0; i<jobDetails.skillTags.length; i++) {
					var colourOfBadgeandText=colors[Math.random()*colors.length|0];
					document.getElementById('skillTags').innerHTML += `
						<span class="bg-${colourOfBadgeandText}-100 text-${colourOfBadgeandText}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
							${jobDetails.skillTags[i]}
						</span>`;
				}
				

			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
};


