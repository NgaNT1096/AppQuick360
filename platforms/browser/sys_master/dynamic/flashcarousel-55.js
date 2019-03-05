function flashSalePgNEW(element) {
 var currentPageNo, isDisabled, componentId, $pagingContainer, productGroup;
 componentId = $(element).attr('data-component-id');
 console.log(componentId);
 componentSelected = $('#' + componentId);
 $pagingContainer = $('#productGroupPagination' + componentId);
 var pageOps = {};
 $('.js-product-group-loader').each(function() {
  if (pageOps[componentId] == null) {
   productGroup = ACC.productGroup[componentId];
   if (parseInt(productGroup.data.numberOfPages) > 1) {
    pageOps[componentId] = {
     currentPage: 0,
     numberOfPages: productGroup.data.numberOfPages,
     numberPagesShown: productGroup.data.numberPagesShown,
     componentId: componentId
    };
   }
  }
 });
 if (pageOps[componentId] == null) {
  var productGroup = ACC.productGroup[componentId];
  if (parseInt(productGroup.data.numberOfPages) > 1) {
   pageOps[componentId] = {
    currentPage: 0,
    numberOfPages: productGroup.data.numberOfPages,
    numberPagesShown: productGroup.data.numberPagesShown,
    componentId: componentId
   };
  }
 }
 console.log(pageOps[componentId]);
 pageOps[componentId].currentPage = $(element).data("current-page-number");
 $pagingContainer.html(ACC.template.pagination(pageOps[componentId], componentId));
 statusForMainComponent = componentSelected.attr('data-status');
 currentPageNo = $(element).data('current-page-number');
 ACC.requests.requestProductGroup(currentPageNo, componentId, statusForMainComponent);
 document.getElementById(componentId).scrollIntoView()
 bindFlashsaleEvent();
 return false;
}

function bindFlashsaleEvent() {
 $('.js-ajax-pagination a').click(function() {
  flashSalePgNEW(this);
  return false;
 });
}

function bindEventsFortimeFrameTab(){
$(document).off('click', '.timeFrameTab');
$(document).off('click', '.js-rounded-btn');

$(document).on('click', '.timeFrameTab', function(){
	  var css = $(this).attr("class");
	  console.log(css);
	  if(css != null && css.indexOf("clicked") != -1){
		  return;
	  }
	  $('.timeFrameTab').addClass('clicked');
	  $('.nav-tabs li').addClass('clicked');

	  var mb = $(this).attr("data-mainbanner-id");
	  var fh = $(this).attr("data-flashheader-id");
	  var mc = $(this).attr("data-maincontent-id");
	  var ds = $(this).attr("data-statusForMainComponent");
	  var ld = $(this).attr("data-loading-id");
	  $("#"+ld).show();
	  ACC.requests.loadCmsComponent(mb,"flashSaleMB", "");
	  //ACC.requests.loadCmsComponent(fh,"flashSaleFH", "");

	  var url1 = "/loadcmscomponent/"+fh+"?statusForMainComponent="+ds;
	  var $container1 = $("#flashSaleFH");
	  var req1 = $.get(url1);
	  req1.done(function (res) {
		  $("#flashSaleFH").removeClass('hide');
		  $container1.html(res);
		  ACC.flashsalecomponent.bindCountDownClock();

	  });

	  var url = "/loadcmscomponent/"+mc+"?statusForMainComponent="+ds;
	  var $container = $("#flashSaleMC");
	  var req = $.get(url);
	  req.done(function (res) {
		  $('.timeFrameTab').removeClass('clicked');
		  $('.nav-tabs li').removeClass('clicked');
		  $("#"+ld).hide();
		  $container.html(res);

	  });
	  ACC.carousel.bindCarousel();

  });

$(document).on('click', '.js-rounded-btn', function(){
  var css = $(this).attr("class");
  if(css.indexOf("clicked") != -1){
	  return;
  }
  $('.js-rounded-btn').attr('disabled', "disabled");
  var mb = $(this).attr("product-component");
  var ds = $(this).attr("data-statusForMainComponent");
  var url = "/loadcmscomponent/"+mb+"?statusForMainComponent="+ds;
  var $container = $("#flashsalePGC");
  var req = $.get(url);
  req.done(function (res) {
	  $('.js-rounded-btn').removeAttr('disabled');
	  $container.html(res);

  });
  ACC.carousel.bindCarousel();ACC.config.themeResourcePath
});
}

function fixSwiperLazyload() {
		$('.adr-flash-sale__tabs--box').find('.swiper-slide .product-item img').each(function() {
			if(!$(this).hasClass('imagelazyloaded')) {
				$(this).attr('src', $(this).attr('data-original'));
				$(this).addClass('imagelazyloaded');
			}
		});
	}
$(function(){
bindEventsFortimeFrameTab();
fixSwiperLazyload();
});