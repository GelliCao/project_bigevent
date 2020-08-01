// 每次调用ajax的时候会先调用这个函数
// 在这个函数中，可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 判断，请求路径是否包含/my/
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    // 所有的请求完成后都要进行身份验证
    options.complete = function(res){
        var data = res.responseJSON
        if(data.status == 1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})