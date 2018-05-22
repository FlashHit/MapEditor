$("#menubar").menu({
	position: {
		at: "left bottom"
	},
	items: "> :not(.ui-widget-seperator)"
});

$('#worldView').selectmenu({
	change: worldViewChanged
});

$('#tools').find('input').checkboxradio({
	icon: false
}).on("change", toolsChanged);
$('#wo').find('input').checkboxradio({
	icon: false
}).on("change", worldChanged);

$("#inspector").draggable({
	handle: ".header",
	containment: "parent"
}).resizable({
	handles: "n, e, s, w, ne, se, sw, nw",
	minHeight: 200,
	minWidth: 200,
	containment: "#page"

});


function toolsChanged(e) {
    SetGizmoMode(e.target.id);
}

function worldChanged(e) {
	SetWorldSpace(e.target.id);
}

function worldViewChanged(e, ui) {
	SendEvent('DispatchEventLocal', 'MapEditor:SetViewmode', ui.item.value)
}