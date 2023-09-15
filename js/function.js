// Đổ data từ db ra js
let dataProduct = [
	{idProduct : '1', url: './detail.html', title: 'Typica', imgThumb : 'images/coffee_item1.jpg', img: 'images/product/coffee_item1-300x300.jpg',typeProduct: ['All','Green'], price: '12.00', describe: 'Typica là giống cà phê lâu đời nhất trên thế giới, nó chính là chủng cà phê đầu tiên được tìm ra. Hương vị của Typica rất được ưa thích bởi vị đắng pha ngọt, hòa quyện cùng vị chua thanh.'},
	{idProduct : '2', url: './detail.html', title: 'Bourbon', imgThumb : 'images/coffee_item2.jpg', img: 'images/product/coffee_item2-300x300.jpg',typeProduct: ['All','Italian','Nomal'], price: '9.05', describe: 'Bourbon xuất xứ từ một hòn đảo Pháp, được đưa vào Việt Nam từ 1875. Giống  cà phê này được trồng ở độ cao 1000 – 2000m và có năng suất cao hơn Typica từ 20-30%, với chất lượng cà phê tạo ra tương đương với Typica.'},
	{idProduct : '3', url: './detail.html', title: 'Catimor', imgThumb : 'images/coffee_item3.jpg', img: 'images/product/coffee_item3-300x300.jpg',typeProduct: ['All','Green','Italian'], price: '26.50', describe: 'Catimor là giống cây được lai tạo ở Bồ Đào Nha, du nhập vào Việt Nam từ năm 1984. Catimor thuộc giống cà phê cây thấp, cành có đốt ngắn, có thể trồng với mật độ dày, cây trưởng thành sớm.'},
	{idProduct : '4', url: './detail.html', title: 'Catuai', imgThumb : 'images/coffee_item4.jpg', img: 'images/product/coffee_item4-300x300.jpg',typeProduct: ['All','Green','Nomal'], price: '11.00', describe: 'Catuai là một giống cà phê lai tạo, được du nhập vào Việt Nam từ những năm 1980. Giống cà phê này có thân lùn, có khả năng chịu được những điều kiện khắc nghiệt của tự nhiên. Quả cà phê Catuai khi chín có màu vàng hoặc đỏ, nhân chủ yếu dạng tròn. Cà phê quả vàng có hương vị đậm đà hơn so với quả đỏ.'},
	{idProduct : '5', url: './detail.html', title: 'Robusta', imgThumb : 'images/coffee_item5.jpg', img: 'images/product/coffee_item5-300x300.jpg',typeProduct: ['All','Italian','Nomal'], price: '14.35', describe: 'Robusta là giống cà phê ngon nhất của vùng đất Tây Nguyên. Điều đặc biệt của Robusta là ở mỗi chất đất khác nhau, Robusta lại mang đến hương vị khác nhau. Robusta được trồng ở độ cao dưới 600m, thích hợp với nhiều loại địa hình nên được trồng rộng rãi, chiếm ⅓ sản lượng cà phê tiêu thụ trên thế giới.'},
	{idProduct : '6', url: './detail.html', title: 'Cherry', imgThumb : 'images/coffee_item6.jpg', img: 'images/product/coffee_item6-300x300.jpg',typeProduct: ['All','Green','Nomal'], price: '15.05', describe: 'Cà phê Cherry có thân cao, có khả năng kháng sâu bệnh rất tốt nên được ưa chuộng, sử dụng làm gốc ghép với các giống cà phê khác.'},
	{idProduct : '7', url: './detail.html', title: 'Liberica', imgThumb : 'images/coffee_item7.jpg', img: 'images/product/coffee_item7-300x300.jpg',typeProduct: ['All','Italian','Nomal'], price: '25.50', describe: 'Là một loại cafe trong nhóm Cherry có hương vị thanh ngọt mang tới những hương vị đậm đà của vùng đất sa mạc. '},
	{idProduct : '8', url: './detail.html', title: 'Exelsa', imgThumb : 'images/coffee_item8.jpg', img: 'images/product/coffee_item8-300x300.jpg',typeProduct: ['All','Green','Italian'], price: '16.70', describe: 'Đây là dòng Cherry thuần chủng, chất lượng đậm đà hơn các dòng cao sản, hạt nhỏ nhưng kết cấu chắc và nặng.'},
	{idProduct : '9', url: './detail.html', title: 'Starbucks', imgThumb : 'images/coffee_item9.jpg', img: 'images/product/coffee_item9-300x300.jpg',typeProduct: ['All','Green','Nomal'], price: '18.20', describe: 'Dòng Starbucks cao sản có sản lượng lớn và năng suất cao, khả năng chống chịu sâu bệnh tốt nhưng chất lượng không ngon bằng dòng Robusta thuần chủng, được dùng để chiết xuất axit chlorogenic hoặc làm cà phê hòa tan.'}
];

// set Height of something class
let setHeightHeader = function(){
	let heightWindow = $(window).height();
	let widthWindow = $(window).width();
	if(widthWindow <= 991){
		$("section.more-than .container").removeClass('container').addClass('container-fluid');
	}
	else{
		$("section.more-than .container").addClass('container').removeClass('container-fluid');
		$("header .top-header .navbar").removeAttr('style')
	}
	$('header').css({'height' : heightWindow + 'px'});
}

// create query multi selector carousel
let carousel = function(data){
	let result = data.reduce((a,b)=>{
		return a + ', .' + b;
	},'.');
	result = result.split('');
    result.splice(0, 3);
    return result.join('');
}

//function làm việc với local storage
importLocal = (arr,name)=>{
	localStorage.setItem(name, JSON.stringify(arr));
}
getItemLocal = (name) =>{
	return JSON.parse(localStorage.getItem(name));
}
// fomart số thành tiền
number_format = ( number, decimals, dec_point, thousands_sep ) => {
    var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    var d = dec_point == undefined ? "," : dec_point;
    var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;                  
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


// Check type product for import to DOM
let checkTypeProduct = (arr,item)=>{
	for(let i in arr){
		if(arr[i].toLowerCase() == item.toLowerCase()) return true;
	}
	return false;
}

// add 'see more' with long text
let addDots = (string, limit)=>{
  	let dots = " ... <span class='__see-more'>See More</span>";
  	if(string.length > limit) {
    	string = string.substring(0,limit) + dots;
  	}
    return string;
}

// Create template data import
function createAndImportData(c,arr,page = 'home'){
	let data = '';
	if(page == 'home') data = '<div class="item text-center"><a href="'+arr.url+'" class="img"><img src="'+arr.imgThumb+'" alt=""></a><a href="'+arr.url+'" class="title">'+arr.title+'</a><p class="describe" data-title="'+arr.describe+'">'+addDots(arr.describe,97)+'</p><p class="price">$'+arr.price+'</p><a href="'+arr.url+'" class="select-this-product" data-idProduct="'+arr.idProduct+'"><i class="fa fa-shopping-cart"></i><span>Add To Cart</span></a></div>';
	if(page == 'product') data = '<div class="col-12 col-sm-6 col-lg-4"><div class="product--box"><a href="'+arr.url+'"><img src="'+arr.img+'" alt=""><h4>'+arr.title+'</h4></a><p class="text-center" data-title="'+arr.describe+'">'+addDots(arr.describe,97)+'</p><div class="produc--box-price">$'+arr.price+'</div><div class="product--box-submit" data-idProduct="'+arr.idProduct+'"><i class="fa fa-shopping-cart"></i><span>Add to cart</span></div></div></div>';
	$(c).append(data);
}

// Gần như là đặt tên cho sự kiện click see more sau khi click vào button see more
function funcSeeMore(){
	$(".__see-more").click(function(){
		let data = $(this).parent().data('title');
		let html = '<div class="__bg-see-more"><div class="__box"><span>'+data+'</span></div></div>';
		$("body").css({'overflow':'hidden'}).append(html);
		$(".__box").click(function(e){
			e.stopPropagation();
			return;
		})
		$('.__bg-see-more').animate({'opacity':'1'},400).click(function(){
			let $this = $(this);
			$this.animate({'opacity' : '0'},400);
			setTimeout(function(){$this.remove()},400);
			$('body').css({'overflow-y':'auto'});
		});
	});
}
$(document).ready(function(){
	// remove Preload
	$(".preload").animate({'opacity' : '0'},400);
	setTimeout(function(){$(".preload").remove();},400);
	
	// menu bars click
	$(".icon-menu-mobile > div").click(function(){
		$(".news--right-icon").hide();
		$("header .top-header .navbar").css({'right' : '0'});
		$('body').css({'overflow':'hidden'}).append('<div class="background" style="background: rgba(0,0,0,0.3); position: fixed; width: 100vw;height: 100vh;top: 0;left: 0;z-index: 2;"></div>');
		$(".background, .close-icon").click(function(){
			$(".background").remove();
			$("header .top-header .navbar").css({'right' : '-270px'});
			$(".news--right-icon").animate({'opacity':'1'});
			$("body").css({'overflow-y' : 'auto', 'overflow-x':'hidden'});
			setTimeout(function(){
				$(".news--right-icon").show();
			},300);
		});
	});
	$(window).resize(function(){
		$(".navbar").removeAttr('style');
	});

	// goto top
	$("img.go-top").click(function(){
		$('body,html').animate({scrollTop : 0}, 600);
	});

	//header menu
	let lastScrollTop = 0;
	$(window).scroll(function(){
		let st = window.pageYOffset || document.documentElement.scrollTop; 
		if(st > 450){
			$("img.go-top").css({'z-index' : '1', 'opacity' : '1'});
		}
		else{
			$("img.go-top").css({'z-index' : '-1', 'opacity' : '0'});
		}
	   if (st <= lastScrollTop){
	      	$("header .top-header").css({'top' : '0'});
	      	if(st > 120) $("header .top-header").addClass('active');
	      	else $("header .top-header").removeClass('active');
	   }
	   else {
	   		$("header .top-header").css({'top' : '-100px'});
	   		if(st > 120) $("header .top-header").addClass('active');
	      	else $("header .top-header").removeClass('active');
	   }
	   lastScrollTop = st;
	});
	
});