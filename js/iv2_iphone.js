/*
 * IC2::Viewer - DOM�𑀍삵��iPhone�ɍœK������
 */

// {{{ GLOBALS

var _IV2_IPHONE_JS_OLD_ONLOAD = window.onload;
var _IV2_IPHONE_JS_OLD_ONORIENTATIONCHANGE;

// }}}
// {{{ window.onload()

/*
 * iPhone�p�ɗv�f�𒲐�����
 *
 * @return void
 */
window.onload = (function(){
	if (_IV2_IPHONE_JS_OLD_ONLOAD) {
		_IV2_IPHONE_JS_OLD_ONLOAD();
	}

	// �T���l�C�����^�b�v�����Ƃ��A�V�����^�u�ŊJ���悤�ɂ���
	var anchors = document.evaluate('.//td[@class="iv2-image-thumb"]/a[@href]',
	                                document.body,
	                                null,
	                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	                                null
	                                );

	for (var i = 0; i < anchors.snapshotLength; i++) {
		anchors.snapshotItem(i).setAttribute('target', '_blank');
	}

	if (typeof window.orientation != 'undefined') {
		// �e�[�u���̑傫���𒲐�
		resize_image_table();

		// �Â���]���̃C�x���g�n���h����ۑ�
		_IV2_IPHONE_JS_OLD_ONORIENTATIONCHANGE = document.body.onorientationchange;

		// ��]���̃C�x���g�n���h����ݒ�
		document.body.onorientationchange = (function(){
			if (_IV2_IPHONE_JS_OLD_ONORIENTATIONCHANGE) {
				_IV2_IPHONE_JS_OLD_ONORIENTATIONCHANGE();
			}
			resize_image_table();
		});
	} else {
		// ��]���T�|�[�g���Ȃ��u���E�U
		var table = document.getElementById('iv2-images');
		if (table) {
			var width = document.body.clientWidth;
			var css = document.styleSheets[document.styleSheets.length - 3];
			css.insertRule('table#iv2-images { width: ' + width.toString() + 'px; }');

			var cells = table.getElementsByTagName('td');
			if (cells && cells.length) {
				width -= (cells[0].clientWidth + 20);
				css.insertRule('div.iv2-image-title { width: ' + width.toString() + 'px; }');
			}
		}

		document.styleSheets[document.styleSheets.length - 2].disabled = true;
		document.styleSheets[document.styleSheets.length - 1].disabled = true;
	}
});

// }}}
// {{{ resize_image_table()

/*
 * �摜�e�[�u���̃T�C�Y�𒲐�����
 *
 * @return void
 */
function resize_image_table()
{
	if (window.orientation % 180 == 0) {
		document.styleSheets[document.styleSheets.length - 1].disabled = false;
		document.styleSheets[document.styleSheets.length - 2].disabled = true;
	} else {
		document.styleSheets[document.styleSheets.length - 2].disabled = false;
		document.styleSheets[document.styleSheets.length - 1].disabled = true;
	}
}

// }}}

/*
 * Local Variables:
 * mode: javascript
 * coding: cp932
 * tab-width: 4
 * c-basic-offset: 4
 * indent-tabs-mode: t
 * End:
 */
/* vim: set syn=javascript fenc=cp932 ai noet ts=4 sw=4 sts=4 fdm=marker: */