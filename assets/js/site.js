///import js.dom.INodeEvent;
///import elf.~shortcut.~dispatcher.string;
///import elf.~shortcut.~dispatcher.function;
///import elf.~shortcut.loadScript;
///import elf.~shortcut.template;
///import elf.~shortcut.ajax;
///import elf.~namespace.URL;

var site = {
	InitMap: {
		
		list: function () {
			hljs.initHighlighting();
			site.VAR_AUTO_LOAD_ON_SCROLL && elf(window).on('scroll', site.Handlers.scrolling);
		},
		
		post: function () {
			hljs.initHighlighting();
			var disqusUrl = site.URL_DISCUS_COMMENT;
			disqusUrl && elf().loadScript(disqusUrl, {});
		},
		
		search: function () {
			site.URL_GOOGLE_API &&
			site.VAR_GOOGLE_CUSTOM_SEARCH_ID &&
			elf().loadScript(site.URL_GOOGLE_API, {
				onload: site.Handlers.onGCSEAPILoad
			});
		}

		timeline: function () {
			elf('#timeline div.meta').forEach(function (item) {
				var metaNode = elf(item);
				metaNode.scrollFollow({
					side: 'left',
					minWidth: 640,
					sideOffset: -150,
					marginTop: 10,
					referId: elf().mark(item.parentNode),
					wrapId: elf().mark(metaNode.parent().query('div.content')[0])
				});
			});
		}
	},
	
	Handlers: {
		deferLoad: function () {
			elf('article').toArray()
				.filter(site.Util.isViewable)
				.filter(function (item) {
					return item.getAttribute('content-loaded') != 1;
				}).slice(0, site.VAR_AUTO_LOAD_ON_SCROLL).forEach(site.Handlers.loadArticle);
			
		},
		
		loadArticle: function (item) {
			elf().ajax({
				url: elf(item).firstChild().firstChild().attr('href'),
				onsuccess: function (response) {
					site.Handlers.showAjaxContent(item, response);
				}
			});
		},
		
		showAjaxContent: function (node, response) {
			var article = elf(node);
			var content = response.split('<p class="meta">')[1].split('</p>');
			content.shift();
			content = content.join('</p>');
			content = content.split(/<\/article>/)[0];
			article.query('>.article-content').html(content);
			article.attr('content-loaded', 1);
			article.query('pre').forEach(function (item) {
				hljs.highlightBlock(item);
			});
		},
		
		scrolling: function () {
			var timer = site.scrollingTimer;
			if (timer) {
				clearTimeout(timer);
			}
			site.scrollingTimer = setTimeout(site.Handlers.deferLoad, 1000);
		},
		
		onGCSEAPILoad: function () {
			google.load('search', '1', {
				language: 'zh-CN',
				style: google.loader.themes.V2_DEFAULT,
				callback: site.Handlers.onGCSEReady
			});
		},
		
		onGCSEReady: function() {
			var customSearchControl = new google.search.CustomSearchControl(site.VAR_GOOGLE_CUSTOM_SEARCH_ID, {});
			customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
			
			var options = new google.search.DrawOptions();
			options.setAutoComplete(true);
			customSearchControl.draw('cse', options);
			
			var url = new elf.URL(location);
			var query = url.getParameter('q');
			if (query) {
				query = decodeURIComponent(query);
				document.title = elf().template(
					site.TPL_SEARCH_TITLE,
					site.VAR_SITE_NAME,
					query
				);
				customSearchControl.execute(query);
			}
		}
	}

	
	Util: {
		
		isViewable: function (element) {
			var pos = element.getBoundingClientRect();
			var doc = js.dom.Stage.getDocumentElement();
			var winHeight = doc.clientHeight;
			var winWidth = doc.clientWidth;
			var scrollLeft = document.body.scrollLeft || doc.scrollLeft;
			var scrollTop = document.body.scrollTop || doc.scrollTop;
			
			return (pos.right > 0 &&
				pos.left < winWidth &&
				pos.bottom > 0 &&
				pos.top < winHeight);
		}
	}
};

/*
site.ScrollFollow = elf().Class({
	constructor: function (node, args) {
		this.node = node;
		elf().copy(args, this);
		this.marginTop = this.marginTop || 0;
		var boundle = this._handler.bind(this);
		if (document.body.offsetWidth > this.minWidth) {
			elf(window).on('scroll', boundle);
			elf(window).on('resize', boundle);
			boundle();
		}
	},
	
	getDocumentElement: function () {
		return elf().Chrome || elf().Safari ? document.body : document.documentElement;
	},
	
	getScrollTop: function () {
		return this.getDocumentElement().scrollTop;
	},
	
	getStartTop: function () {
		return this.node.getPosition(this.getDocumentElement()).y;
	},
	
	getOriginTop: function () {
		return typeof this.originTop != 'undefined' ? this.originTop
			: (this.originTop = this.node.getPosition(this.getDocumentElement()).y -
				elf().getPosition(elf().g(this.wrapId), this.getDocumentElement()).y);
	},

	getStartLeft: function () {
		return this.node.getPosition(this.getDocumentElement()).x;
	},
	
	getOriginLeft: function () {
		return typeof this.originLeft != 'undefined' ? this.originLeft
			: (this.originLeft = this.node.getPosition(this.getDocumentElement()).x -
				elf().getPosition(elf().g(this.wrapId), this.getDocumentElement()).x);
	},
	
	getFollowingBottom: function () {
		var content = elf().g(this.referId);
		return (content.offsetHeight +
			elf().getPosition(elf().g(this.referId), this.getDocumentElement()).y -
			elf().getPosition(elf().g(this.wrapId), this.getDocumentElement()).y -
			this.getFollowingHeight());
	},
	
	getFollowingAbsBottom: function () {
		var content = elf().g(this.referId);
		return elf().getPosition(content, this.getDocumentElement()).y + content.offsetHeight;
	},
	
	getFollowingHeight: function () {
		return this.node[0].offsetHeight;
	},
	
	getFollowingWidth: function () {
		return this.node[0].offsetWidth;
	},
	
	getFollowingMargin: function () {
		return 0;
	},
	
	getContentWidth: function () {
		return elf().g(this.wrapId).offsetWidth;
	},
	
	sideMap: {
		left: -1,
		right: 1
	},
	
	_handler: function (ev) {
		var scrollTop = this.getScrollTop();
		var startTop = typeof this.startTop != 'undefined' ?
			this.startTop :
			(this.startTop = this.getStartTop());
		var startLeft = typeof this.startLeft != 'undefined' ?
			this.startLeft :
			(this.startLeft = this.getStartLeft());
		var originTop = this.getOriginTop();
		var originLeft = this.getOriginLeft();
		var followingBottom = this.followingBottom = this.getFollowingAbsBottom();
		var followingWidth = this.followingWidth || (this.followingWidth = this.getFollowingWidth());
		var followingHeight = this.getFollowingHeight();
		var followingMargin = this.getFollowingMargin();
		var docElem = this.getDocumentElement();
		var pageWidth = docElem.offsetWidth;
		var contentWidth = this.contentWidth || (this.contentWidth = this.getContentWidth());
		var side = this.sideMap[this.side];
		var props = {};
		if (scrollTop >= startTop - this.marginTop) {
			if (followingBottom < scrollTop + followingHeight + this.marginTop) {
				elf().mix(props, {position: 'absolute', top: this.getFollowingBottom() + 'px'});
				props[this.side] = '';
			} else {
				props.position = 'fixed';
				props.top = this.marginTop + 'px';
				props.left = startLeft + 'px';
				// var screenSub = pageWidth - contentWidth - 46;
				// var sideOffset = Math.max(0, screenSub) + (this.sideOffset + docElem.scrollLeft * side);
				// if (pageWidth < contentWidth && side > 0) {
				// 	sideOffset += screenSub;
				// }
				// props[this.side] = sideOffset + 'px';
			}
		} else if (pageWidth > this.minWidth) {
			props.position = 'absolute';
			props.top = originTop + 'px';
			props[this.side] = this.sideOffset + 'px';
		} else {
			props[this.side] = originLeft;
		}
		props && this.node.css(props);
	}
});

elf().implement(js.dom.Node, {
	scrollFollow: function (options) {
		this.scrollFollow = new site.ScrollFollow(this, options);
	}
});

elf(function () {
	if (elf.client.Device) {
		elf(document.body).addClass('device-mobile');
	}
	site.Translation.translate(navigator.language || 'zh-CN');

	elf('a.mail').attr('href', elf().template('mailto:#{0}@#{1}', 'mytharcher', 'gmail.com'));

	var module = document.body.className.replace(/page-type-/g, '').split(' ');
	module.forEach(function (item) {
		var initer = site.InitMap[item];
		initer && elf(initer);
	});
});

*/

elf(function () {
	hljs.initHighlighting();
	
	var module = document.body.className.replace(/page-type-/g, '').split(' ');
	module.forEach(function (item) {
		var initer = site.InitMap[item];
		initer && elf(initer);
	});
});
