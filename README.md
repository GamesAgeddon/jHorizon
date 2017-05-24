# jHorizon
jQuery plugin for horizontal scrolling by GamesAgeddon

## Installation

Include the css as the last stylesheet.

	<link rel="stylesheet" type="text/css" href="./css/jHorizon.css" />

Include script after the jQuery libraries.

	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
	<script src="./js/jHorizon.js"></script>
	
## Usage

Create a wrapper element with the css class *jHorizon_wrapper*. Add a content element with the css class *jHorizon_content* to the wrapper element.
Add the elements, which you want to scroll horizontally, to the content element. Add the css class *jHorizon_item* to all scrolling elements.

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