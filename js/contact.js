$(document).ready(function(){

	$(".preload").animate({'opacity' : '0'});
	setTimeout(function(){
		$(".preload").remove();
	},300);

	let setFixedRightCol = ()=>{
		let width = window.innerWidth;
		if(width > 991)
			$('.product--left').removeAttr('style');
	}
	setFixedRightCol();
	$(window).resize(function(){
		setFixedRightCol();
	});

	$(".show-menu-product--left").click(function(){
		let $this = $(this);
		$('.product--left').css({'right' : '0'});
		$("body").css({'overflow':'hidden'}).append('<div class="bg" style="position: fixed;top:0;opacity:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:18;"></div>');
		$(".bg").animate({'opacity' : '1'});
		$(".close-icon, .bg").click(function(){
			$(".bg").remove();
			$('.product--left').css({'right' : '-300px'});
			$("body").css({'overflow-y' : 'auto', 'overflow-x':'hidden'});
		});
	});
});