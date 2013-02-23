;(function (window, $, undefined) {
	$.mobile.listview.prototype.options.xFilter = false;
	// $.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
	// $.mobile.listview.prototype.options.filterTheme = "c";
	$.mobile.listview.prototype.options.filterTypes = {};
	$.mobile.listview.prototype.options.filterTypesTheme = "d";
	$.mobile.listview.prototype.options.filterTypeCallback = function (type, searchType) {
		return type !== searchType;
	};
	/* $.mobile.listview.prototype.options.filterCallback = function (text, searchValue) {
		return text.toLowerCase().indexOf(searchValue) === -1;
	}; */

	// Actually, both filters look quite similar.. someone may want to think about this..
	$(document).delegate(":jqmData(role='listview')", "listviewcreate", function() {
		var list = $(this);
			listview = list.data("listview");

		if (!listview.options.xFilter) {
			return;
		}

		var wrapper = $("<form>", {
				"role": "search"
			});

		var textWrapper = $("<div>", {
				"class": "ui-listview-filter ui-bar-" + listview.options.filterTheme
			})
			.appendTo(wrapper),
			text = $("<input>", {
				"placeholder": listview.options.filterPlaceholder,
			})
			.attr("data-" + $.mobile.ns + "type", "search")
			.attr("data-" + $.mobile.ns + "mini", "true")
			.jqmData("lastval", "")
			.on("keyup change", function() {
				var $this = $(this);

				var val = this.value.toLowerCase(),
					lastval = $this.jqmData("lastval");

				$this.jqmData("lastval", val);

				var items;

				if (val.length < lastval.length || val.indexOf(lastval) !== 0) {
					// Removed characters or pasted something totally different, filter all items.
					items = list.children();
				} else {
					// Appended characters (nothing changed or removed), filter yet unfiltered items.
					items = list.children(":not(.ui-filter-text)");
				}

				if (val) {
					// Any children in the bucket?
					var children = false;

					for (var i = items.length - 1; i >= 0; i--) {
						var item = $(items[i]),
							itemtext = item.jqmData("filtertext") || item.text();

						if (item.is("li:jqmData(role='list-divider')")) {
							item.toggleClass("ui-filter-hidequeue", !children);

							// Create a new bucket.
							children = false;	
						} else if (listview.options.filterCallback(itemtext, val)) {
							item.toggleClass("ui-filter-hidequeue", true);
						} else {
							// At least one child in the bucket.
							children = true;
						}
					}

					// Show items not marked to be hidden (by text) and not hidden by type.
					items
						.filter(":not(.ui-filter-hidequeue)")
						.toggleClass("ui-filter-text", false)
						.filter(":not(.ui-filter-type)")
						.toggleClass("ui-screen-hidden", false);

					// Hide items marked to be hidden (by text).
					items
						.filter(".ui-filter-hidequeue")
						.toggleClass("ui-filter-text", true)
						.toggleClass("ui-screen-hidden", true)
						.toggleClass("ui-filter-hidequeue", false);
				} else {
					// Show items not hidden by type.
					items
						.toggleClass("ui-filter-text", false)
						.filter(":not(.ui-filter-type)")
						.toggleClass("ui-screen-hidden", false);
				}

				listview._refreshCorners();
			})
//			.on("focus", function () {
//				typeWrapper.toggleClass("ui-screen-hidden", false);
//			})
//			.on("blur", function () {
//				var hidden = $(this).jqmData("lastval").length === 0;
//				
//				typeWrapper
//					.toggleClass("ui-screen-hidden", hidden);
//				typeFieldset
//					.find("input[value='all']")
//					.prop("checked", true)
//					.trigger("change");
//				typeFieldset
//					.find("input")
//					.checkboxradio("refresh");
//			})
			.appendTo(textWrapper)
			.textinput();

		var typeWrapper = $("<div>", {
				"class": "ui-listview-filter-types ui-bar-" + listview.options.filterTypesTheme // ui-screen-hidden
			})
			.appendTo(wrapper),
			typeFieldset = $("<fieldset>")
			.attr("data-" + $.mobile.ns + "type", "horizontal")
			.attr("data-" + $.mobile.ns + "mini", "true")
			.appendTo(typeWrapper);

		var createFiltertype = function (id, value, label) {
			var input = $("<input>", {
					"type": "radio",
					"name": "filtertype",
					"id": "filtertype-" + id,
					"value": value
				})
				.appendTo(typeFieldset);

			var label = $("<label>", {
					"for": "filtertype-" + id
				})
				.text(label)
				.appendTo(typeFieldset);

			input.checkboxradio();
		};

		if (listview.options.filterTypes["all"] === undefined) {
			// Create default "all" type.
			createFiltertype(0, "all", "All");
		}

		var id = 1;
		for (key in listview.options.filterTypes) {
			createFiltertype(id++, key, listview.options.filterTypes[key]);
		}

		typeFieldset
			.find("input[value='all']")
			.prop("checked", true)
			.checkboxradio("refresh");
		typeFieldset
			.controlgroup({
				// direction: "horizontal",
				// "mini": true,
				excludeInvisible: false
			});

		typeFieldset
			.find("input")
			.on("change", function () {
				var items = list.children();

				if (this.value !== "all") {
					// Any children in the bucket?
					var children = false;

					for (var i = items.length - 1; i >= 0; i--) {
						var item = $(items[i]), 
							itemtype = item.jqmData("filtertype") || null;

						if (item.is("li:jqmData(role='list-divider')")) {
							item.toggleClass("ui-filter-hidequeue", !children);

							// Create a new bucket.
							children = false;
						} else if (itemtype === null || listview.options.filterTypeCallback(itemtype, this.value)) {
							item.toggleClass("ui-filter-hidequeue", true);
						} else {
							// At least one child in the bucket.
							children = true;
						}
					}

					// Show items not marked to be hidden (by type) and not hidden by text.
					items
						.filter(":not(.ui-filter-hidequeue)")
						.toggleClass("ui-filter-type", false)
						.filter(":not(.ui-filter-text)")
						.toggleClass("ui-screen-hidden", false);

					// Hide items marked to be hidden (by type).
					items
						.filter(".ui-filter-hidequeue")
						.toggleClass("ui-filter-type", true)
						.toggleClass("ui-screen-hidden", true)
						.toggleClass("ui-filter-hidequeue", false);
				} else {
					// Show items not hidden by text.
					items
						.toggleClass("ui-filter-type", false)
						.filter(":not(.ui-filter-text)")
						.toggleClass("ui-screen-hidden", false);
				}

				listview._refreshCorners();
			});

		if (listview.options.inset) {
			textWrapper.addClass("ui-listview-filter-inset");
			typeWrapper.addClass("ui-listview-filter-types-inset");
		}

		/* var MutationObserver = window.WebKitMutationObserver || window.MozMutationObserver;

		var observer = new MutationObserver(function (mutations, observer) {
			var refresh = false;

			for (var i = 0; i < mutations.length; i++) {
				if (mutations[i].type === "childList") {
					refresh = true;

					break;
				}
			}

			if (refresh) {
				// TODO Do this more efficiently...
				text.triggerHandler("change");
				typeFieldset.find("input:checked").triggerHandler("change");
			}
		});

		observer.observe(this, {
			childList: true
		}); */

		wrapper.on("submit", function() {
				return false;
			})
			.insertBefore(list);
	});
})(window, jQuery);
