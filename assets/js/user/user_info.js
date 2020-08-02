$(function(){
    // 定义校验规则
    var form = layui.form
    form.verify({
        nickname: function(value){
            if(value.trim().length >6)return "昵称要在1~6个字符"
        }
    })
    initUserInfo()
    // 初始化用户的基本性息
    function initUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                // console.log(res)
                if(res.status != 0)return layer.msg(res.message)
                // 展示用户信息
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单数据
    $("#btnReset").on('click',function(e){
        e.preventDefault()
        // 初始化用户信息
        initUserInfo()
        layer.msg("已重置！")
    })

    // 表单的提交功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                if(res.status != 0)return layer.msg(res.message)
                // 找到父框架里面的方法
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})