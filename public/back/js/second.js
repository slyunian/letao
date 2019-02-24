var currentPage = 1;
var size = 5;
render();

function render() {
    // 发送ajax请求
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: currentPage,
            pageSize: size
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('secondTb', info);
            $('tbody').html(htmlStr);
            // 渲染分页
            $('#pageTwo').bootstrapPaginator({
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

// 点击添加分类弹出弹出框
$('#addItem').on('click', function () {
    $('#addModal').modal('show');
    // 发送ajax渲染下拉框
    $.ajax({
        type: 'get',
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);

            var htmlStr = template('downBar', info);
            $('.dropdown-menu').html(htmlStr);
        }
    })
})

// 点击ul选中
$('.dropdown-menu').on('click', 'li', function () {
    $('#dropdownText').text($(this).text());
    $('[name="categoryId"]').val($(this).data("id"));
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
})

// 配置图片上传
$('#fileupload').fileupload({
    // 指定数据类型为 json
    dataType: "json",
    // done, 当图片上传完成, 响应回来时调用
    done: function (e, data) {
        console.log(data)
        // 获取上传成功的图片地址
        var picAddr = data.result.picAddr;
        // 设置图片地址
        $('#imgBox img').attr("src", picAddr);
        // 将图片地址存在隐藏域中
        $('[name="brandLogo"]').val(picAddr);

        // 重置校验状态
        $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
});

$('#form').bootstrapValidator({

    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
        // 品牌名称
        brandName: {
            //校验规则
            validators: {
                notEmpty: {
                    message: "请输入二级分类名称"
                }
            }
        },
        // 一级分类的id
        categoryId: {
            validators: {
                notEmpty: {
                    message: "请选择一级分类"
                }
            }
        },
        // 图片的地址
        brandLogo: {
            validators: {
                notEmpty: {
                    message: "请上传图片"
                }
            }
        }
    }
});