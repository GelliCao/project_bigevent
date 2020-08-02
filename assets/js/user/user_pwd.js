$(function(){
    // 获取layui提供的成员
    var form = layui.form
    // 自定义form校验
    form.verify({
        // 密码长度
        pwd:[/^\S{6,12}$/,'密码需要6-12位'],
        // 新旧密码不能相同
        samePwd:function(value){
            if(value === $("[name=oldPwd]").val())return '新密码不能和旧密码相同'
        },
        rePwd:function(value){
            if(value !== $("[name=newPwd]").val())return '两次输入密码不一致'
        }
    })

    // 修改密码
    $(".layui-form").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                // 重置表单
                $(".layui-form")[0].reset()
            }
        })
    })


})