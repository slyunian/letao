var currentPage = 1;
var pageSize = 5;
render();

function render() {
    // 发送ajax请求
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        success: function (info) {
            // console.log(info);
            var htmlStr = template('firstTb', info);
            $('tbody').html(htmlStr);
            $('#pageOne').bootstrapPaginator({
                bootstrapMajorVersion: 3,
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

// 点击按钮弹出模态框
$('#addItem').on('click', function () {
    $('#addModal').modal("show");
});
// 表单验证
$("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    // 校验的字段
    fields: {
        categoryName: {
            // 校验规则
            validators: {
                // 非空检验
                notEmpty: {
                    // 提示信息
                    message: "请输入一级分类名称"
                }
            }
        }
    }
});

// 注册点击事件添加分类
$('#form').on("success.form.bv", function (e) {
    // 阻止默认事件
    e.preventDefault();
    // 发送ajax
    $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        dataType: 'json',
        // 获取表单数据
        data: $('#form').serialize(),
        success: function (info) {
            if (info.success) {
                // 隐藏弹框
                $('#addModal').modal("hide");
                // 重新渲染页面(新添加的页面在最前面)
                currentPage = 1;
                render();
                // 清除状态
                $('#form').data('bootstrapValidator').resetForm(true);
            }
        }
    })
})