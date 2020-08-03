$(function(){
    var form = layui.form
    var laypage = layui.laypage
    // 定义一个全局变量，储存分页参数
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    initTable()
    function initTable(){
        $.ajax({
            type:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
                // console.log(htmlStr)
                // console.log(res)
                renderPage(res.total)
            }
        })
    }

    initCate()
    function initCate(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                var htmlStr = template('tpl-cate',res)
                $("[name=cate_id]").html(htmlStr)
                form.render()
            }
        })
    }

    // 绑定submit事件
    $("#form-search").on("submit",function(e){
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $("[name=cate_id]").val()
        var state = $("[name=state]").val()
        // 为查询参数对象q中相应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total){
        // 调用laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem:'pageBox',// 分页容器的id
            count:total, // 总数据条数
            limit:q.pagesize, // 每页显示几条数据
            curr:q.pagenum, // 设置默认页数

            // 给页面添加自定义组件
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5],

            // 页面发生切换时，触发jump
            // 触发jump方式有两种
                // - 点击页码的时候，触发
                // - 调用laypage.render() 方法的时候，触发
            jump:function(obj,first){
                // 可以通过first的值来判断是哪种触发形式
                // 如果first的值是true，证明是第二种方式触发

                // 把最新的页码 赋值到q这个查询参数对象中
                q.pagenum = obj.curr

                // 把最新的条目数 赋值到q这个查询参数的pagesize属性中
                q.pagesize = obj.limit
                // 根据最新的q 获取对应的数据列表，并渲染表格
                if(!first)initTable()
            }
        })
    }

    // 删除功能
    $("body").on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        var length = $(".btn-delete").length
        // console.log(length)
        $.ajax({
            type:'get',
            url:'/my/article/delete/' + id,
            success:function(res){
                if(res.status != 0)return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                // 判断当前数据是否为页面最后一个数据
                // 如果是则页码减一
                if(length == 1) q.pagenum = q.pagenum == 1? 1 : q.pagenum -1
                initTable()
            }
        })
    })

    // 编辑功能
})