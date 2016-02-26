<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="author" content="{{ site.meta.author.name }}" />
<meta name="keywords" content="{{ page.tags | join: ',' }}" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>{{ site.name }}{% if page.title %} / {{ page.title }}{% endif %}</title>
<link href="http://{{ site.host }}/feed.xml" rel="alternate" title="{{ site.name }}" type="application/atom+xml" />
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css" />
<link rel="stylesheet" type="text/css" href="/assets/css/site.css" />
<link rel="stylesheet" type="text/css" href="/assets/css/code/zenburn.css" />
{% for style in page.styles %}<link rel="stylesheet" type="text/css" href="{{ style }}" />
{% endfor %}
</head>

<body class="{{ layout.class }}">

<div class="main">
	{{ content }}

	<footer>
		<p>&copy; Since 2016 <a href="http://doerlbh.github.io/">doerlbh.github.io</a></p>
	</footer>
</div>

<aside>
<!--
	<h2><a href="/">Baihan Lin</a><a href="/feed.xml" class="feed-link" title="Subscribe"><i class="fa fa-rss-square"></i></a></h2>
-->	
	<figure>
			{% if site.meta.author.gravatar %}<img src="{{ site.meta.gravatar}}{{ site.meta.author.gravatar }}?s=1000" height="200" width="200"/>{% endif %}
	<!--		
			<figcaption><strong>Baihan Lin (University_of_Washington)</strong></figcaption>
	-->
	</figure>

	<h2>Baihan Lin <sub>(DoerLBH@gmail.com)</sub></h2>
	<p><b>Code life with design~ </b> </p>
	<p><b>生物狗，程序猿，设计狮</b></p>

<!--
	<form action="/search/" class="block block-search">
		<h3>Search</h3> 
		<p><input type="search" name="q" placeholder="Search" /></p>
	</form>
-->

	<nav class="block">
		<ul>
		{% for category in site.custom.categories %}<li class="{{ category.name }}"><a href="/category/{{ category.name }}/">{{ category.title }}</a></li>
		{% endfor %}
		</ul>
	</nav>
	
	<div class="block block-contact">
		<p> </p>
			<a href="https://github.com/doerlbh" target="_blank"><img src="/logos/github.png" height="28" width="28"/></a>
			<a href="https://orcid.org/0000-0002-7979-5509" target="_blank"><img src="/logos/orcid.png" height="28" width="28"/></a>
			<a href="https://www.linkedin.com/in/doerlbh" target="_blank"><img src="/logos/linkedin.png" height="28" width="28"/></a>
			<a href="https://www.facebook.com/doerlbh" target="_blank"><img src="/logos/facebook.png" height="28" width="28"/></a>
			<a href="/logos/wechatQRC.html" target="_blank"><img src="/logos/wechat.png" height="28" width="28"/></a>
            <a href="/feed.xml" class="feed-link" title="Subscribe"><img src="/logos/rss.png" height="28" width="28"/></a>
<!--			<link href="atom.xml" type="application/atom+xml" rel="alternate" title="Sitewide ATOM Feed" />
-->
		</p>
	</div>
	
<!--
	{% if site.meta.author.github %}
	<div class="block block-fork">
		<a href="https://github.com/{{ site.meta.author.github }}"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>
	</div>
	{% endif %}
-->
	
	<div class="block block-thank">
		<h3>Powered by</h3>
		<p>
<!--
			<a href="http://elfjs.com/" target="_blank">elf+js</a>,
-->
			<a href="https://github.com/" target="_blank">GitHub</a>,
			<a href="http://disqus.com/" target="_blank" title="Comment">Disqus</a>,
			<a href="http://www.google.com/cse/" target="_blank" title="In-site-search">Google_CSE</a>,
			<a href="http://en.gravatar.com/" target="_blank" title="avatar">Gravatar</a>,
<!--
			<a href="http://softwaremaniacs.org/soft/highlight/en/">HighlightJS</a>,
-->
			<a href="https://github.com/mojombo/jekyll" target="_blank">jekyll</a>,
			<a href="https://github.com/mytharcher/SimpleGray" target="_blank">SimpleGray</a>
		</p>
			<script type="text/javascript">
			function googleTranslateElementInit() {
  				new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true, gaTrack: true, gaId: 'UA-74038161-1'}, 'google_translate_element');
			}
			</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
	</div>

<!--
	<div id="google_translate_element"></div><script type="text/javascript">
	function googleTranslateElementInit() {
  		new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, multilanguagePage: true, gaTrack: true, gaId: 'UA-74038161-1'}, 'google_translate_element');
	}
	</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
-->

	<div class="block block-license">
		<h3>Copyright</h3>
		<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a>This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a></p>
	</div>


</aside>

<script src="http://elfjs.qiniudn.com/code/elf-0.5.0.min.js"></script>
<script src="http://yandex.st/highlightjs/7.3/highlight.min.js"></script>

<script src="/assets/js/site.js"></script>
{% for script in page.scripts %}<script src="{{ script }}"></script>
{% endfor %}
<script>
site.URL_GOOGLE_API = '{{site.meta.gapi}}';

site.URL_DISCUS_COMMENT = '{{ site.meta.author.disqus }}' ? 'http://{{ site.meta.author.disqus }}.{{ site.meta.disqus }}' : '';
site.VAR_SITE_NAME = "{{ site.name | replace:'"','\"' }}";
site.VAR_GOOGLE_CUSTOM_SEARCH_ID = '{{ site.meta.author.gcse }}';
site.TPL_SEARCH_TITLE = '#{0} / Search: #{1}';
site.VAR_AUTO_LOAD_ON_SCROLL = {{ site.custom.scrollingLoadCount }};
</script>
</body>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-74038161-1', 'auto');
  ga('send', 'pageview');

</script>

</html>
