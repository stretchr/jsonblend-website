$(document).ready(function() {
	var editor = ace.edit("json");

	$("#post-json").submit(function(e) {
		e.preventDefault();
		var j = editor.getValue();
		try {
			JSON.parse(j);
		} catch(e) {
			$("#error").html("<div class='alert alert-danger'><h4>There was an error parsing your input:</h4>" + e.message + "</div>");
			return;
		}
		$.ajax({
			type: "post",
			url: "https://jsonblend.com/blend",
			data: j,
			dataType: "json",
			success: function(response) {
				$("#results").html("<pre class='response'><code>" + JSON.stringify(response, null, "  ") + "</code></pre>");
			},
			error: function(response) {
				$("#results").html(response);
			}
		})

	});

	$(".merge").click(function(e) {
		e.preventDefault();
		var t = $(e.currentTarget),
			target = t.data("example"),
			example = $("#" + target).text();

		t.html("Running...").attr("disabled", true);

		$.ajax({
			type: "post",
			url: "https://jsonblend.com/blend",
			data: example,
			dataType: "json",
			success: function(response) {
				t.after("<h5>Response</h5><pre><code>" + JSON.stringify(response) + "</code></pre>");
				t.remove();
			},
			error: function(response) {
				t.after(response);
				t.html("Try again").attr("disabled", false);
			}
		});
	});
});