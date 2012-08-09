/*!
* jQuery.tabNavigator
*
* @version beta
* @author Kazuhito Shiba
*/


(function($){
	$.JTabNavigator = function(_this,opt){
		this.content = _this;
		this.setting = $.extend(this.setting,opt);
		this.$nav = $('.'+this.setting.navClass, this.content).find('a');
		this.isImage = this.$nav.children('img').length ? true : false;
		this._hash = location.hash;
		this.hashSwitch = $(this._hash,this.content).length ? true : false;		
		this.init();
	};
	
	$.JTabNavigator.prototype = {
		init: function(){
			var self = this;
			
			this.$nav.each(function(i){
				var target = new String,
					img = new Object;
				
				target = $(this).attr('href');
				if( self.isImage ){
					img = $(this).children('img');
					img.rollover({
						suffix : self.setting.imgSuffix
					});
				};
				
				if( (!self.hashSwitch && i==0) || (self.hashSwitch && target == self._hash) ){
					self.show(this,target,img);
					if(self.hashSwitch){
						var _top = $('body').offset().top;
						var _body = $.support.boxModel ? navigator.appName.match(/Opera/) ? "html" : "html,body" : "body";
						$(_body).scrollTop(_top);
					};
				}else{
					self.hide(this,target,img);
				};
				
			}).click(function(){
				var $target = new String,
					$img = new Object,
					$other = new Object,
					$otherTarget = new String,
					$otherImg = new Object;
				
				$target = $(this).attr('href');
				$other = self.$nav.not($(this));
				$other.each(function(){
					$otherTarget += $(this).attr('href')+',';
				});
								
				if(self.isImage){
					$img = $(this).children('img');
					$otherImg = $other.children('img');
				};
				
				self.show(this,$target,$img);
				self.hide($other,$otherTarget,$otherImg);
				
				return false;
			});
		},
		show : function(nav,target,img){
			if(this.isImage){
				$(img).addClass('keep').trigger('mouseover');
			};
			
			$(target)
				.css({
					"position": "static",
					"top": null,
					"left": null
				})
				.add(nav)
				.addClass(this.setting.activeClass);
		},
		hide : function(nav,target,img){
			if(this.isImage){
				$(img).removeClass('keep').trigger('mouseout');
			};
			
			$(target)
				.css({
					"position": "absolute",
					"top": "-9999px",
					"left": "-9999px"
				})
				.add(nav)
				.removeClass(this.setting.activeClass);
		},
		setting : {
			activeClass : "active",
			navClass : "tab",
			imgSuffix : '_on'
		}
	};
	
	$.fn.jTabNavigator = function(options){
		if( $(this).length < 1 ){
			return false;
		};
		var opt = options ? options : {};
		return this.each(function(){
			new $.JTabNavigator(this,opt);
		});	
	};
	
})(jQuery);



/*!
* jQuery.Rollover
*
* @version beta
* @author Kazuhito Shiba
*/
 
(function($){
	$.fn.rollover = function(options){
		var opt = options ? options : {};
		return this.each(function(){
			new $.Rollover(this,opt);
		});
	};
	
	$.Rollover = function(_this,opt){
		this.$elem = $(_this);
		this.setting = $.extend(this.setting,opt);
		this.src = this.$elem.attr('src');
		this.ovSrc = this.src.replace(/\.[a-z]+$/, this.setting.suffix + '$&');
		this.init();
	};
	
	$.Rollover.prototype = {
		init : function(){
			var self = this;
			this.preload();
			
						
			this.$elem.mouseover(function(){
				self.over();
			}).mouseout(function(){
				if( !$(this).is('.keep') ){
					self.out();
				};
			});
		},
		preload : function(){
			$('<img />').attr('src',this.ovSrc);
		},
		over : function(){
			this.$elem.attr('src',this.ovSrc);
		},
		out : function(keep){
			if( !keep ){
				this.$elem.attr('src',this.src);
			};
		},
		setting : {
			suffix: "_on",
			keep: false
		}
	};
})(jQuery);
