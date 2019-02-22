// 进度条
$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)
})


$(function () {
    // 点击按钮显示隐藏侧边栏
    $('.icon_menu').on('click', function () {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_title').toggleClass('hidemenu');
    })


    // 点击显示二级菜单
    $('.lt_aside .category').on('click', function () {
        $('.child').slideToggle();
    })

    // 点击显示模态框
    $('.icon_logout').on('click', function () {
        $('#modalbox').modal("show");
    })

    // 点击退出发送请求
    $('#logoutBtn').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                if (info.success) {
                    location.href = 'login.html';
                }

            }
        })
    })
})