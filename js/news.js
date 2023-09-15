$(document).ready(function(){

	$(".preload").animate({'opacity' : '0'});
	setTimeout(function(){
		$(".preload").remove();
	},300);

	let setFixedRightCol = ()=>{
		let width = window.innerWidth;
		if(width <= 991 && !$('.news--right').hasClass('news--right-fixed'))
			$('.news--right').addClass('news--right-fixed');
		else if(width > 991 && $('.news--right').hasClass('news--right-fixed')){
			$('.news--right').removeClass('news--right-fixed').removeAttr('style');
			$(".bg, .background").remove();
			$("body").css({'overflow-y' : 'auto', 'overflow-x':'hidden'});
			$(".news--right-icon").removeClass('active').removeAttr('style');
		}
	}
	setFixedRightCol();
	$(window).resize(function(){
		setFixedRightCol();
	});

	$(".news--right-icon").click(function(){
		let $this = $(this);
		if($this.hasClass('active')){
			$(".bg").remove();
			$('.news--right').css({'right' : '-350px'});
			$(".news--right-icon").css({'right' : '0'});
			$("body").css({'overflow-y' : 'auto', 'overflow-x':'hidden'});
			$this.removeClass('active');
			return;
		}
		$this.addClass('active');
		$('.news--right').css({'right' : '0'});
		$(".news--right-icon").css({'right' : '350px'});
		$("body").css({'overflow':'hidden'}).append('<div class="bg" style="position: fixed;top:0;opacity:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:98;"></div>');
		$(".bg").animate({'opacity' : '1'});
		$(".close-icon, .bg").click(function(){
			$(".bg").remove();
			$('.news--right').css({'right' : '-350px'});
			$(".news--right-icon").css({'right' : '0'});
			$this.removeClass('active');
			$("body").css({'overflow-y' : 'auto', 'overflow-x':'hidden'});
		});

	});

});