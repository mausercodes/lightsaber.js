var app = {};

app.events = function(){
	$(".fa-cog").on("click", function(e){
		e.preventDefault();
		$(".overlay").addClass("show");
	});

	$(".close").on("click",function(e){
		e.preventDefault();
		$(".overlay").removeClass("show");
	});
};

app.init = function(){
	app.events();
};

$(function() {
	app.init();
});