$.fn.lightsaber = function(options){
	//Variables
	var lightsaberActive = false;
	var lightsaberOnSound = "<audio id='saberOn' preload='auto'><source src='audio/powerOn.wav' /></audio>";
	var lightsaberSwing = "<audio id='swing1' preload='auto'><source src='audio/swing1.wav' /></audio>";
	var lightsaberStrike = "<audio id='strike1' preload='auto'><source src='audio/strike1.wav' /></audio>";

	//Default options
	var options = $.extend({
		activate: "click", //click, konami
		color: "green", //red, green, blue, purple
		sound: true, //true, false
		destruction: false //true, false
	}, options);

	//Sets the desired colour of lightsaber
	//Plays appropriate sounds if sound is set to true
	//Sets lightsaberActive to true, destroys divs when clicked on
	function powerOn() {
		lightsaberActive = true;

		if (options.color === "red"){
			$("html").css("cursor", "url(images/redLightsaber.png), auto");
		}
		else if (options.color === "green"){
			$("html").css("cursor", "url(images/greenLightsaber.png), auto");
		}
		else if (options.color === "blue"){
			$("html").css("cursor", "url(images/blueLightsaber.png), auto");
		}
		else if (options.color === "purple"){
			$("html").css("cursor", "url(images/purpleLightsaber.png), auto");
		}

		if(options.sound == true){
			//append sounds to body
			$("body").append(lightsaberOnSound);
			$("body").append(lightsaberSwing);
			$("body").append(lightsaberStrike);
			document.getElementById("saberOn").play();

			$("body").on("click", function(){
				var clicks = $(this).data("clicks");
				$(this).data("clicks", !clicks);
				console.log(clicks);
				//if statement prevents strike sound from being played when powerOn() function is activated by click
				//clicks is initially undefined so strike sound will not play on first click
				//Any additional clicks will play the strike sound
				if (clicks || clicks == false){
					document.getElementById("strike1").play();
				}
			});

			//mousemove and click fire at the same time on chrome therefore swing sound and powerOn sound play simultaneously
			//mousemove and click do NOT fire at the same time on firefox therfore swing sound and powerOn sound do NOT play simultaneously
			$("body").on("mousemove", function(){
				document.getElementById("swing1").play();
			});
		}

		//Destruction mode
		if (options.destruction == true){
			if (lightsaberActive == true){
				$(".target").on("click", function(){
					$(this).css("display", "none");
				});
			}
		}
	}

	//Lightsaber active on button click
	if (options.activate === "click"){
		$(this).on("click", function(e){
			e.preventDefault();
			powerOn();
		});
	}
	//Lightsaber active on konami-code
	else if (options.activate == "konami"){
		var kkeys = [], code = "38,38,40,40,37,39,37,39,66,65";
		$(document).keydown(function(e) {
			kkeys.push(e.keyCode);

			if ( kkeys.toString().indexOf(code) >= 0 ) {
				$(document).unbind('keydown');
				powerOn();
			}
		});
	}

	return this;
};