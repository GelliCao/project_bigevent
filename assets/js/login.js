$(function(){
    // 点击按钮，切换登录和注册部分页面
    $("#link_reg").on("click",function(){
        $(".login-box").hide()
        $(".reg-box").show()
    })

    $("#link_login").on("click",function(){
        $(".login-box").show()
        $(".reg-box").hide()
    })


    // 从layui中获取form对象
    var form = layui.form

    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6-12位，且中间不能有空格'],
        // 校验两次密码是否一致
        repwd:function(value) {
            // value 拿到的是确认密码框中的内容
            // 还需要拿到输入密码框的内容
            var pwd = $('.reg-box [name=password]').val()
            if(pwd != value)return "两次密码输入不一致"
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            data:{
                // $("#form_reg").serialize()
                username:$("#form_reg [name=username]").val(),
                password:$("#form_reg [name=password]").val()
            },
            url:'/api/reguser',
            success:function(res){
                if(res.status != 0)return alert(res.message)
                layer.msg(res.message)
                // reset方法清空表单 reset是原生方法
                $("#form_reg")[0].reset()
                // $("#form_reg [name=username]").val('')
                // $("#form_reg [name=password]").val('')

                // 使用js点击a连接
                $("#link_login").click()
            }
        })
    })

    // 监听登录表单
    $("#form_login").on("submit",function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data: $("#form_login").serialize(),
            success:function(res){
                if(res.status != 0)return layer.msg(res.message)

                layer.msg(res.message)
                // 保存token
                localStorage.setItem("token",res.token)
                // 页面跳转
                location.href = "/index.html"
            }
        })
    })
})