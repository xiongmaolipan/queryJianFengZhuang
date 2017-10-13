$(function() {
	$('#tab').myTab({
		content: '#tabContent',
		active: 'tab2',
		e_active: function(name) {
			alert(name)
		}
	});
})