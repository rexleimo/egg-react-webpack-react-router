; $(function () {
    /**
     * 点击搜索按钮
     */
    $('#seachBtn').on('click', function () {
        $('#seachBoxInput').addClass('seach-box-input-actice');
    })
    /**
     * 关闭搜索按钮
     */
    $('#seachIconClose').on('click', function () {
        $('#seachBoxInput').removeClass('seach-box-input-actice');
    });
    /**
     * 搜索框 回车搜索事件
     */
    $('#seachBoxInput').find('input').on('keydown', function () {
        if (event.keyCode == "13") {
            var url = "/seach?q=" + $.trim($(this).val());
            window.location.href = url;
        }
    });
});