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


	// function sort
	function sortData(arr,index,other=null){
		let compare = (a, b)=> {
		 	// Dùng toUpperCase() để không phân biệt ký tự hoa thường
		 	let A,B;
		 	let res = 1;
		 	if(index == 'title'){
		 		A = a.title.toUpperCase();
		 		B = b.title.toUpperCase();
		 	}
		 	if(index == 'default'){
		 		A = a.idProduct.toUpperCase();
		 		B = b.idProduct.toUpperCase();
		 	}
		 	if(index == 'price-minmax' || index == 'price-maxmin' || index == 'filter-price-range'){
		 		A = parseFloat(a.price);
		 		B = parseFloat(b.price);
		 		if(index == 'price-maxmin') res = -1;
		 	}

		 	let comparison = 0;
		 	if (A > B) {
		   		comparison = res;
			}
			else if (A < B) {
		   		comparison = 0 - res;
			}
		 	return comparison;
		}
		arr.sort(compare);
		return arr;
	}
	// import data to DOM
	let appendData = (sort = 'default')=>{
		if(sort == 'default'){
			sortData(dataProduct,'default');
		}
		if(sort == 'name'){
			sortData(dataProduct,'title');
		}
		if(sort == 'price-minmax'){
			sortData(dataProduct,'price-minmax');
		}
		if(sort == 'price-maxmin'){
			sortData(dataProduct,'price-maxmin');
		}
		for(let i in dataProduct){
			createAndImportData('.--area-product', dataProduct[i],'product');
		}
		$('.--area-product').animate({'opacity' : '1'},200);
	}
	appendData();
	funcSeeMore();

	// set slide range value
	sortData(dataProduct,'price-minmax');
	let minPrice = Math.floor(parseFloat(dataProduct[0].price));
	let maxPrice = Math.ceil(parseFloat(dataProduct[dataProduct.length - 1].price));
	$("#slider-range").slider({
    	range: true,
	    orientation: "horizontal",
	    min: minPrice,
	    max: maxPrice,
	    values: [minPrice, maxPrice],
	    step: 1,
	    slide: function (event, ui) {
	      	if (ui.values[0] == ui.values[1]) {
	        	return false;
	      	}
	      	$("#min_price").text(ui.values[0]);
	      	$("#max_price").text(ui.values[1]);
		}
  	});
  	$("#min_price").text($("#slider-range").slider("values", 0));
  	$("#max_price").text($("#slider-range").slider("values", 1));

  	// set length product show
  	$(".lengthProduct").text(dataProduct.length);

  	// Set data for Cart Area
  	//Mảng lưu những gì ng dùng mua
  	var arrSelectBuy = getItemLocal('storeCart') == null ? [] : getItemLocal('storeCart'); 
	$(".cart span").text(arrSelectBuy.length);
	if(arrSelectBuy.length == 0){
		$(".area-cart").empty().addClass('noProduct').append('<span>No Product</span>');
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

	// function check sản phẩm đã được mua
	checkBuied = (arr,id) =>{
		if(arr.length == 0) return -1;
		for(var i in arr){
			if(arr[i].id == id){
				return parseInt(i);
			}
		}
		return -1;
	}

  	// onchange sort select
	$(".product--right-sort").change(function(){
		let val = $(this).val();
		$(".--area-product").animate({'opacity' : '0'},200);
		setTimeout(function(){
			$(".--area-product").empty();
			appendData(val);
		},200);
	});

	// onclick button filter price
	$(".filter--submit").click(function(){
		let min = $("#min_price").text();
		let max = $("#max_price").text();
		$(".--area-product").animate({'opacity' : '0'},200);
		sortData(dataProduct,'filter-price-range');
		let arr = [];
		for(let i in dataProduct){
			if(parseFloat(dataProduct[i].price) >= parseFloat(min) && parseFloat(dataProduct[i].price) <= parseFloat(max)){
				arr.push(dataProduct[i]);
			}
		}
		setTimeout(function(){
			$(".--area-product").empty();
			for(let i in arr){
				createAndImportData('.--area-product', arr[i],'product');
			}
			$('.--area-product').animate({'opacity' : '1'},200);
			// set length product show
  			$(".lengthProduct").text(arr.length);
		},200);
	});

	// onclick add to cart
	// function check index of product selected
	let checkIndex = (arr,item)=>{
		for(let i in arr){
			if(arr[i].idProduct == item) return parseInt(i);
		}
		return -1;
	}
	$('.product--box-submit').click(function(){
		let $this = $(this);
		let idProduct = ''+$this.data('idproduct');
		let title = $this.parents('.product--box').find('h4').text();
		let index = checkIndex(dataProduct,idProduct);
		let indexBuied = checkBuied(arrSelectBuy,idProduct);
		if(indexBuied != -1){
			let sl = parseInt(arrSelectBuy[indexBuied].sum) + 1;
			let price = sl * parseFloat(dataProduct[index].price);
			arrSelectBuy[indexBuied].sum = '' + sl;
			arrSelectBuy[indexBuied].price = '' + price;
			$(".area-cart tr[data-id='"+idProduct+"']").find('td:nth-child(2)').text(sl);
			$(".area-cart tr[data-id='"+idProduct+"']").find('td:nth-child(3)').text('$' + price.toFixed(2));
		}
		else{
			let price = parseFloat(dataProduct[index].price);
			let data = {
				id : idProduct,
				title : title,
				sum : '1',
				price : price
			};
			arrSelectBuy.push(data);
			if($(".area-cart").hasClass('noProduct')){
				$(".area-cart").removeClass('noProduct');
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
				return;
			}
			let html = '<tr data-id="'+idProduct+'"><td>' + title + '</td><td>1</td><td>$' + price + '</td></tr>';
			$(".area-cart").find('.del-cart').parents('tr').before(html);
			let lengthProduct = $(".cart span").text();	
			$(".cart span").text(parseInt(lengthProduct)+1);
		}
		importLocal(arrSelectBuy,'storeCart');
	});

});