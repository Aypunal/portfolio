$( document ).ready(function() {  
	
	loadInfos()
	
	var z = -1;
	var txt = 'Full-stack';
	var speed = 150;
	function typeWriter() {
		if (z < txt.length) {
			document.getElementById("target").innerHTML += txt.charAt(z);
			z++;
			setTimeout(typeWriter, speed);
		}
	}
	
	function loadInfos() {
		
		$.post("https://victor.ait37.fr/api.php",{"getActivitys": true},
		function(data, status){
			informations = JSON.parse(data)
			
			projetfirstDiv = ""
			projetmoreDiv = ""
			avisDiv = ""
			i=0
			
			informations['Projets'].forEach(function(element) {
				i+=1
				card = ""
				card += `
				<div name="projets-${element['categorie']}[]" class="col animate__animated" onclick="openSidebar('${i}')">
				<div class="card h-100">
				`
				if(element.mainimg.includes('https')){
					card += `<iframe src="${element['mainimg']}&modestbranding=1&color=white&iv_load_policy=3&controls=1&disablekb=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen class="card-img-top"></iframe>`
				}else{
					card+=`<img src="${element['mainimg']}" class="card-img-top" draggable="false" alt="${element['name']}">`
				}
				card += `
				<div class="card-body">
				<h5 class="card-title">${element['name']}</h5>
				<p class="card-text">${element['cDesc']}</p>
				</div>
				<div class="card-footer">
				<small class="text-muted">${element['date']} - 
				`
				element["competences"].forEach(function(competence) {
					logo = informations['Competences'][competence]['logo']
					if(logo.includes('imgs')){
						card += `<img height="15px" class="m-rl-3" src="${logo}" />`
					}else{
						card += `<i class="${logo} w-20p"></i>`
					}
				})
				
				card += `
				</small>
				</div>
				</div>
				</div>
				`
				
				if(i<16){
					projetfirstDiv += card
				}else{
					projetmoreDiv += card
				}
			})
			
			informations['Avis'].forEach(function(element) {
				i+=1
				avisDiv += `
				<div name="avis-${element.categorie}[]" class="col zoomHover">
				<div class="card h-100 feedback-card">
				<div class="card-body text-justify">
				<h5 class="card-title">${element.name}</h5>
				<p class="card-text">
				${element.role}<br>
				<hr>
				${element.message != "..." ? `<i class="fa-solid fa-quote-left fa-xl"></i> ${element.message} <i class="fa-solid fa-quote-right fa-xl"></i>` : "... <small><i class='text-muted'>(en rédaction)</i></small>"}
				</p>
				</div>
				</div>
				</div>
				`
			})
			
			$("#projets-content").html(projetfirstDiv)
			$("#projets-more-content").html(projetmoreDiv)
			$("#avis-content").html(avisDiv)
			reloadTooltips()
			
			$("loader").fadeOut("slow", function() {
				$("loader").remove();
				
				$("#globalContent").fadeIn("slow", function() {
					typeWriter()
				});
			});  
			
			
		});
		
	}
	
	
	
});

var isVisible = false;
function isElementInViewport (el) {
	//special bonus for those using jQuery
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}
	
	var rect = el.getBoundingClientRect();
	
	return (rect.top >= 0 &&rect.left >= 0 &&rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth) );
}

var btntop = document.getElementById("toTopBtn");
window.onscroll = function() {
	if (document.documentElement.scrollTop > 5*100) {
		$("#toTopBtn").removeClass("animate__bounceOut")
		$("#toTopBtn").addClass("animate__bounce")
		$("#continue").removeClass("animate__slideInDown")
		$("#continue").addClass("animate__bounceOut")
	} else {
		$("#toTopBtn").removeClass("animate__bounce")
		$("#toTopBtn").addClass("animate__bounceOut")
		$("#continue").addClass("animate__slideInDown")
		$("#continue").removeClass("animate__bounceOut")
	}
	
	if (document.documentElement.scrollTop > 5*100) {
		//$("#imgMe").addClass("animate__animated");
	}
	
	if (document.documentElement.scrollTop > 23*100) {
		//$(".timeline").addClass("animate__animated");
	}
	
	//console.log(document.documentElement.scrollTop);    
};

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}


$("#continue").click(function() {
	$("#continue").removeClass("animate__slideInDown")
	$("#continue").addClass("animate__bounceOut")
	$('html, body').animate({
		scrollTop: $("#me").offset().top
	}, 750);
});

function scrollTofct(where) {
	$('html, body').animate({
		scrollTop: $("#" + where).offset().top
	}, 100);
	
}
reloadTooltips()
function reloadTooltips() {
	
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})
	
}

var toastLiveExample = document.getElementById('liveToast')
var toast = new bootstrap.Toast(toastLiveExample)


function sendMessage() { 
	
	inputs = [ "inputName", "inputMail", "inputSujet", "inputMessage" ]
	haveInvalid = false
	inputs.forEach(input => {
		input = $("#" + input)
		if(input.is(":valid")){
			input.addClass('is-valid')
			input.removeClass('is-invalid')
		}else{
			input.addClass('is-invalid')
			input.removeClass('is-valid')
			haveInvalid = true
		}
	});
	
	if(!haveInvalid){
		$.post("https://victor.ait37.fr/api.php",
		{
			"name": $("#inputName").val(),
			"mail": $('#inputMail').val(),
			"sujet": $('#inputSujet').val(),
			"message": $('#inputMessage').val(),
			"sendmail": true,
		},
		function(data, status){
			$("#contactForm :input").prop("disabled", true);
			$("#contactForm #sendContact").prop("disabled", true);
			$("#toastInfo").html("Message envoyé avec succès! Merci !")
			toast.show()
		});
	}
	
	
}

function display(zone, element) {
	
	if(zone == 0){
		categories = [1,2,3,4,5]
		
		categories.forEach(categs => {
			if(categs != element && element !=0){
				$('div[name^="projets-' + categs + '"]').addClass("animate__fadeOutDown")
				$('div[name^="projets-' + categs + '"]').removeClass("animate__fadeInUp")
				setTimeout(() => {
					$('div[name^="projets-' + categs + '"]').hide()
				}, 350);
			}else{
				$('div[name^="projets-' + categs + '"]').removeClass("animate__fadeOutDown")
				$('div[name^="projets-' + categs + '"]').addClass("animate__fadeInUp")
				setTimeout(() => {
					$('div[name^="projets-' + categs + '"]').show()
				}, 300);
			}
		});
	}else{
		categories = [1,2,3]
		
		categories.forEach(categs => {
			if(categs != element && element !=0){
				$('div[name^="avis-' + categs + '"]').fadeOut("fast")
			}else{
				$('div[name^="avis-' + categs + '"]').fadeIn("fast")
			}
		});
	}
	
}


function openSidebar(data) {
	projet = informations['Projets'][data-1]
	var canvaProjet = document.getElementById('canvaProjet')
	var bsCanva = new bootstrap.Offcanvas(canvaProjet)
	
	$("#canvaTitle").html(projet.name)
	$("#canvaDescription").html(`<small class="text-muted">${projet.cDesc}</small> ` + (projet.lDesc == "..." ? "La suite est en cours de rédaction.." : projet.lDesc))
	$("#canvaDate").html(projet.date)
	
	skills = ""
	projet['competences'].forEach(function(competence){
		logo = informations['Competences'][competence]['logo']
		if(logo.includes('imgs')){
			skills += `<img height="15px" class="m-rl-3" src="${logo}" data-bs-toggle="tooltip" data-bs-placement="top" title="${informations['Competences'][competence]['fullname'] ? informations['Competences'][competence]['fullname']:competence.charAt(0).toUpperCase() + competence.slice(1)}" />`
		}else{
			skills += `<i class="${logo} w-20p" data-bs-toggle="tooltip" data-bs-placement="top" title="${informations['Competences'][competence]['fullname'] ? informations['Competences'][competence]['fullname']:competence.charAt(0).toUpperCase() + competence.slice(1)}"></i>`
		}
	})
	
	links = projet['liens'].length == 0 ? "<p class='text-muted'>Aucun lien externe proposé.</p>" : ""
	projet['liens'].forEach(function(lien){
		links += `<a data-bs-toggle="tooltip" data-bs-placement="top" title="Vous allez être redirigé vers: ${lien.href}"`
		if(lien.identifiants){
			links += `href="#" onclick="event.stopPropagation();openPostURL('${lien.href}','${lien.identifiants}')"`
		}else{
			links += `href="${lien.href}" target="_blank"`
		}
		links += `><i class="fas fa-link w-20p"></i> ${lien.title}</a><br>`
	})
	
	images = `
	<div class="carousel-item active">
	<img src="${projet.mainimg}" class="d-block w-100 img-canva" alt="${projet.name}">
	<div class="b-0">
	<p><i>Image d'illustration du projet</i></p>
	</div>
	</div>`
	
	projet['images'].forEach(function(img){
		images += `
		<div class="carousel-item">
		<img src="${img.src}" class="d-block w-100 img-canva" alt="${img.alt}">
		<div class="b-0">
		<p><i>${img.alt}</i></p>
		</div>
		</div>`
	})
	
	$("#canvaSkills").html(skills)
	$("#canvaLinks").html(links)
	
	$("#canvaImgsInside").html(images)
	$("#canvaImgsControls").show()
	
	
	$("#canvaTitle, #canvaDescription, #canvaDate, #canvaSkills, #canvaLinks").removeClass(["placeholder col-8", "placeholder col-2"])
	if(projet.lDesc){
		reloadTooltips()
		bsCanva.show()
	}else{
		datatoast = "Ce projet ne possède pas plus d'informations !"
		if(projet.liens.length != 0){
			datatoast += `<br>Cependant, il possède un lien:<br><a target="_blank" href="${projet.liens[0].href}">${projet.liens[0].title}</a>`
		}
		$("#toastInfo").html(datatoast)
		toast.show()
	}
	
}

function openPostURL(url, data) {
	data = data.split(';')
	username = data[0]
	mdp = data[1]
	var form = $('<form class="d-none" id="logFrom" target="_blank" action="' + url + '" method="post">' +
	'<input type="text" name="email" value="' + username + '" />' +
	'<input type="text" name="pass" value="' + mdp + '" />' +
	'<input type="text" name="Connexion" value="Login" />' +
	'</form>');
	$('body').append(form);
	document.getElementById('logFrom').submit();
	$('#logFrom').remove()
}
