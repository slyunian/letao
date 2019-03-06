$(function () {
    // 获取搜索关键字
    var key = getSearch('key');
    $('.search-txt').val(key);
    render();
    // 发送ajax请求
    function render() {
        $('.productList').html('<div class="loading"></div>');
        var paramsObj = {};

        // 三个必传的参数
        paramsObj.proName = $('.search-txt').val();
        paramsObj.page = 1;
        paramsObj.pageSize = 100;

        // 可传的参数, 根据是否需要排序, 决定是否传参
        // 根据是否有高亮的 a, 决定是否需要传参, 进行排序
        var $current = $('.lt_sort a.current');

        if ($current.length === 1) {
            // 有高亮的 a, 需要排序
            // 获取给后台传递的参数名, 根据自定义属性存储的 data-type 值
            var sortName = $current.data('type'); // price

            // 获取给后台传递的参数值, 根据箭头的方向决定  1升序，2降序
            var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;

            // 将参数拼接到对象中
            paramsObj[sortName] = sortValue;
        }
        setTimeout(function () {
            $.ajax({
                type: 'get',
                url: '/product/queryProduct',
                data: paramsObj,
                dataType: 'json',
                success: function (info) {
                    var htmlStr = template('proList', info);
                    $('.productList').html(htmlStr);
                }
            });
        }, 1000);
    }

    // 点击按钮发送ajax请求
    $('.btn-search').on('click', function () {
        render();
    })


    //实现点击切换高亮效果
    $('.lt_sort').on('click', 'a', function () {
        // 如果没有添加,如果有改变箭头方向
        if ($(this).hasClass('current')) {
            $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');

        } else {
            $(this).addClass('current');
            $(this).siblings().removeClass('current')
        }
        render()
    })
})