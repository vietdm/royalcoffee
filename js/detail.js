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
			$('.news--right').removeClass('news--right-fixed');
			$(".bg, .background").remove();
			$("body").css({'overflow-y' : 'auto', 'overflow-x':'hidden'});
		}
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

	// Set data for Cart Area
  	//Mảng lưu những gì ng dùng mua
  	var arrSelectBuy = getItemLocal('storeCart') == null ? [] : getItemLocal('storeCart'); 
	$(".cart span").text(arrSelectBuy.length);
	if(arrSelectBuy.length == 0){
		$(".area-cart").empty().append('<span>No Product</span>');
	}
	else{
		let data = '<table class="w-100"><tr><th>Tên</th><th>SL</th><th>Giá</th></tr>';
		for(let i in arrSelectBuy){
			let price = parseFloat(arrSelectBuy[i].price);
			data += '<tr data-id="'+arrSelectBuy[i].id+'"><td>' + arrSelectBuy[i].title + '</td><td>' + arrSelectBuy[i].sum + '</td><td>$' + price.toFixed(2) + '</td></tr>';
		}
		data += '<tr style="height: 50px;"><td colspan="3" class="w-100 text-center"><button class="btn btn-danger del-cart">Del Cart</button></td></tr></table>';
		$(".area-cart").empty().append(data);
		$(".del-cart").click(function(){
			localStorage.clear();
			$(".area-cart").empty().append('<span>Rebooting...</span>');
			setTimeout(function(){
				window.location.reload();
			},100);
		});
	}

	// Add product to Related products
	function checkRandomed(arr,item){
		if(arr.length == 0) return true;
		for(let i in arr){
			if(arr[i] == item) return false;
		}
		return true;
	}
	let arrRand = [];
	let max = dataProduct.length-1;
	for(let i = 0; i<4;i++){
		let rand = Math.floor(Math.random() * (max + 1) );
		if(checkRandomed(arrRand,rand)) arrRand.push(rand);
		else i--;
	}
	for(let i in arrRand){
		let arr = dataProduct[parseInt(arrRand[i])];
		let data = '';
		if(i == arrRand.length - 1) data+='<div class="col-sm-6 d-none d-sm-block d-xl-none">';
		else data += '<div class="col-12 col-sm-6 col-xl-4">';
		data += '<div class="product--box"><a href="'+arr.url+'"><img src="'+arr.img+'" alt=""><h4>'+arr.title+'</h4></a><p class="text-center" data-title="'+arr.describe+'">'+addDots(arr.describe,97)+'</p><div class="produc--box-price">$'+arr.price+'</div><div class="product--box-submit" data-idProduct="'+arr.idProduct+'"><i class="fa fa-shopping-cart"></i><span>Add to cart</span></div></div></div>';
		$(".related-products").append(data);
	}
	funcSeeMore();

});