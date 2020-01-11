$(function(){
    //读取本地存储的函数
    function getData() { 
        var data = localStorage.getItem("todolist");
        if(data!=null) {
            return JSON.parse(data);//将本地存储的字符串格式数据转换成对象数组格式
        } else {
            return [];//为空则创建新数组
        }
     }
     //保存数据到本地存储的函数
     function saveData(data) { 
         localStorage.setItem("todolist",JSON.stringify(data));//对象改成字符串格式存储
      }
      //渲染加载数据
      function loadData() {
          var data = getData();//获取本地存储的数据
          $("ul").empty();//清空数据
          $("ol").empty();//清空数据
          var todocount = 0;
          var donecount = 0;
          $.each(data,function (i,n) {
             
              if(n.done){//每个对象的done
                var li = "<li><input type = 'checkbox' checked = 'checked'>"+n.title+"<a href='javascript:;' id = "+i+"></a></li>";
                  $("ol").prepend(li);
                  donecount++;
              }
              else {
                var li = "<li><input type = 'checkbox'>"+n.title+"<a href='javascript:;' id = "+i+"></a></li>";
                  $("ul").prepend(li);
                  todocount++;
              }
            });
            $("#todocount").html(todocount);
            $("#donecount").html(donecount);        
      }
      loadData();
    $("#title").on("keydown",function (event) {
        if(event.keyCode == 13) {//判断是否按下回车键
            //先读取本地数据
           // console.log(getData());
           var local = getData();
           local.push({title: $(this).val(),done:false });
           //保存输入框的数据到本地存储
           saveData(local);
           //清空输入框里的内容
           $(this).val("");
           //更新下方显示
           loadData();
        }
      });
    //删除操作
    $("ul,ol").on("click","a",function(){
        var data = getData();
        //修改数据
        var index = $(this).attr("id");
        //console.log(index);
        //保存到本地存储,删掉本地存储里的信息 splice(从哪个位置，删除几个)数组！！
        data.splice(index,1);
        saveData(data);
        //渲染到页面
        loadData();
    });
    //切换到已经完成
    $("ul ,ol").on("click","input",function(){
        var data  = getData();
        //自定义属性用attr
        var index = $(this).siblings("a").attr("id");
        //固有属性用prop
        data[index].done  = $(this).prop("checked");
        saveData(data);
        loadData();

    })
})