$(function(){
    initArtCateList()

    var form = layui.form

    // 获取文章
    function initArtCateList(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                var htmlStr = template('tpl-table',res)
                $("tbody").html(htmlStr)
            }
        })
    }

    var indexAdd = null
    // 为添加按钮绑定事件
    $("#btnAddCate").on('click',function(){
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        })
    })

    // 通过代理形式 添加分类
    $("body").on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/article/addcates',
            data: $(this).serialize(),
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                // $(".layui-form")[0].reset()
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    // 类型编辑功能
    $("tbody").on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            type:'get',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
    })
    $("body").on("submit",'#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 删除功能
    $("tbody").on("click",".btn-delete",function(){
        var id = $(this).attr('data-id')
        $.ajax({
            type:'get',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                initArtCateList()
            }
        })
    })
})