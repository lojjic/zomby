/**
 * @class The main Zomby editor user interface
 * @extends zomby.editor.Widget
 */
zomby.editor.ui.Editor = zomby.editor.Widget.extend(
/** @scope zomby.editor.ui.Editor.prototype */
{
	/**
	 * Create the editor interface element
	 */
	create : function() {
		var el = $.create("div").addClass("editor");
		this.setup(el);
		return el;
	},

	/**
	 * Set up the various editor UI components
	 * @param {Element} el The main editor element
	 */
	setup : function(el) {
		var toolbox = new zomby.editor.ui.toolbox.Toolbox(el);
		var canvas = new zomby.editor.ui.canvas.Canvas(el);
		canvas.setShapeViewFactory(new zomby.view.shape.ShapeViewFactory());
		$.each(["dragstart","drag","dragend","mousedown","keypress"], function(i,type) {
			canvas["on"+type].subscribe(function(e) {
				toolbox.getSelectedTool()["handle"+type](e);
			});
		});
	}
});
