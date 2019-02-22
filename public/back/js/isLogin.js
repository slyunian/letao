// 登录保持
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function( info ) {
      // console.log( info )
      if (info.error === 400) {
        // 用户未登录, 拦截到登录页
        location.href = 'login.html';
      }
    }
  })
