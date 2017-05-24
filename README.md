# jHorizon
jQuery plugin for horizontal scrolling by GamesAgeddon

## Installation

Include the css as the last stylesheet.

	<link rel="stylesheet" type="text/css" href="/path/to/jHorizon.css" />

Or include the minified veriosn.

	<link rel="stylesheet" type="text/css" href="/path/to/jHorizon.min.css" />
	
Or include the minified veriosn with jsDelivr.

	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/gamesageddon/jHorizon@1.0/min/jHorizon.min.css" />
	
Include script after the jQuery libraries.

	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<script src="/path/to/jHorizon.js"></script>

Or include the minified veriosn.
	
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<script src="/path/to/jHorizon.min.js"></script>
	
Or include the minified veriosn with jsDelivr.

	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/gamesageddon/jHorizon@1.0/min/jHorizon.min.js"></script>
	
## Usage

Create a wrapper element with the css class *jHorizon_wrapper*. This element needs a unique id. Add a content element with the css class *jHorizon_content* to the wrapper element.
Add the elements, which you want to scroll horizontally, to the content element. Add the css class *jHorizon_item* to all scrolling elements. To remove the little gab between all scrolling elements 
add a html comment *<!-- -->* between them.

	<div id="example1" class="jHorizon_wrapper">
		<div class="jHorizon_content">
			<div class="example_item jHorizon_item">
			<span>1</span>
			</div><!--
			--><div class="example_item jHorizon_item">
			<span>2</span>
			</div><!--
			--><div class="example_item jHorizon_item">
			<span>3</span>
			</div><!--
			--><div class="example_item jHorizon_item">
			<span>4</span>
			</div><!--
			--><div class="example_item jHorizon_item">
			<span>5</span>
			</div>
		</div>
	</div>

Place the javascript in your html document.

	<script>
		$("#example1").jHorizon();
	</script>
	
### Author: [GamesAgeddon](https://github.com/GamesAgeddon)