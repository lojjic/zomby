
zomby.model.shape.Path = zomby.model.shape.Fillable.extend(
{
	segments : null,
	closed : false,

	constructor : function(props) {
		this.base(props);
		this.segments = props.segments || [];
	}
}, {
	TYPE : "path"
});