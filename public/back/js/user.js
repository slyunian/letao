//定义当前页
var currentPage = 1;
//定义显示条数
var pageSize = 5;
render();
// 发送ajax请求数据渲染页面
function render() {
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlstr = template('userTb', info);
            $('tbody').html(htmlstr);
            // 分页
            $('#pagebox').bootstrapPaginator({
                // 版本号
                bootstrapMajorVersion: 3,
                // 当前页
                currentPage: info.page,
                totalPages: Math.ceil(info.total / info.size),
                onPageClicked: function (a, b, c, page) {
                    currentPage = page;
                    render();
                }
            })
        }
    })
}
// 注册点击事件
$('tbody').on('click', '.btn', function () {
    // 弹出模态框
    $('#modalbox2').modal('show');
    var currentId = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;

    // 点击按钮发送ajax请求
    $('#confirm').on('click', function () {
        // 发送ajax请求
        $.ajax({
            type: "POST",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete
            },
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    $('#modalbox2').modal('hide');
                    render();
                }
            }

        })
    })

})