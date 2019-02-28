// 渲染一级列表
$.ajax({
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (info) {
        console.log(info);
        var strHtml = template("leftTe", info);
        $('.lt_left ul').html(strHtml);
        renderById(info.rows[0].id);
    }
})

function renderById(id) {
    $.ajax({
        url: "/category/querySecondCategory",
        dataType: "json",
        data: {
            id: id
        },
        success: function (info) {
            // console.log(info);
            var strHtml = template('rightTe', info);
            $('.lt_right ul').html(strHtml);
        }
    })
}

// 注册点击事件
$('.lt_left ul').on('click', 'a', function () {
    $('.lt_left ul a').removeClass('current');
    $(this).addClass('current');
    var id = $(this).data('id');
    // console.log(id);

    renderById(id);
})