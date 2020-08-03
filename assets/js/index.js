$(function(){
    // 调用函数获取用户的基本信息
    getUserInfo()

    // 退出功能
    var layer = layui.layer
    $("#btnLogout").on('click',function(){
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
        });
    })
})

// 封装获取用户的基本信息函数
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers 就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if( res.status != 0 )return layui.layer.msg(res.message)
            // 调用 renderAvatar 渲染头像
            renderAvatar(res.data)
        },
    })
}

// 封装渲染用户头像的函数
function renderAvatar (user){
    // 获取用户名称
    var uname = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;' + uname)
    // 获取用户头像
    // 判断是否有设置头像
    if(user.user_pic != null){
        $(".layui-nav-img").show().attr("src",user.user_pic)
        $(".text-avatar").hide()
    }else {
        $(".layui-nav-img").hide()
        $(".text-avatar").show().html(uname[0].toUpperCase())
    }
}

