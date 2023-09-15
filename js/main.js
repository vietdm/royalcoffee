$(document).ready(function(){

	// set height for header
	setHeightHeader();
	$(window).resize(function(){
		setHeightHeader();
	});


	// set slide
	let dataCarousel = []; //save all class of silde

	// Get all silde
	$(".owl-carousel").each(function(){
		let cl = $(this).attr('class')
		cl = cl.split(' ');
		dataCarousel.push(cl[1]); //import to arr
	});

	// import all slide to multi class select
	let classCarousel = carousel(dataCarousel);	

	// set silde
	$('' + classCarousel).owlCarousel({
	    loop:true,
	    margin:15,
	    responsiveClass:true,
	    autoWidth:true,
	    responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
	        600:{
	            items:2,
	            nav:false
	        },
	        1000:{
	            items:4,
	            nav:true,
	            loop:false
	        }
	    }
	})

	//Click type coffe
	$(".control-type-coffee li").click(function(){
		$(".control-type-coffee li.active").removeClass('active');
		$(".owl-carousel.active").removeClass('active').animate({'z-index':'0', 'opacity' : '0'});;
		let className = $(this).data('class');
		$(this).addClass('active');
		$(".owl-carousel-" + className).addClass('active').animate({'z-index':'1', 'opacity' : '1'});
	})
	$(".control-type-coffee li:first-child").click();

	// import data to DOM
	for(let i in dataProduct){
		if(checkTypeProduct(dataProduct[i].typeProduct,'all')){
			createAndImportData('.all-product',dataProduct[i],'home');
		}
		if(checkTypeProduct(dataProduct[i].typeProduct,'Green')){
			createAndImportData('.green-product',dataProduct[i],'home');
		}
		if(checkTypeProduct(dataProduct[i].typeProduct,'italian')){
			createAndImportData('.italian-product',dataProduct[i],'home');
		}
		if(checkTypeProduct(dataProduct[i].typeProduct,'nomal')){
			createAndImportData('.nomal-product',dataProduct[i],'home');
		}
	}
	funcSeeMore();
	
});