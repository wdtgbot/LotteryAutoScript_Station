// 打开新增模板
function addTmplFile() {
    // 将主页面隐身
    var total1 = document.getElementById("total1").style;
    total1.display = "none";
    // 将添加信息页面显示
    var total2 = document.getElementById("total2").style;
    total2.display = "block";

    // 显示提交1按钮，隐藏提交2按钮
    document.getElementById("submit1").style.display = "block";
    document.getElementById("submit2").style.display = "none";

    // 将input中的值变为空
    document.getElementById("name").value = null;
    document.getElementById("id").value = null;
    document.getElementById("title").value = null;
    document.getElementById("address").value = null;
    document.getElementById("remarks").value = null;
}

// 提交1
function submit1() {
    // 获取输入的值（即input中的value值）
    var name = document.getElementById("name").value;
    var onlyId = document.getElementById("id").value;
    var title = document.getElementById("title").value;
    var address = document.getElementById("address").value;
    var remarks = document.getElementById("remarks").value;

    // 改变原本得到的数据格式为textNode格式
    name = document.createTextNode(name);
    onlyId = document.createTextNode(onlyId);
    title = document.createTextNode(title);
    address = document.createTextNode(address);
    remarks = document.createTextNode(remarks);

    // 创建tr（创建行）
    var tr = document.createElement("tr");
    // 创建td，并赋于class和值（创建单元格，并输入值）
    var td1 = document.createElement("td");
    td1.className = "col1";
    td1.appendChild(name);
    var idTd = document.createElement("td");
    idTd.style.display = "none";
    idTd.appendChild(onlyId);
    var td2 = document.createElement("td");
    td2.className = "col2";
    td2.appendChild(title);
    var td3 = document.createElement("td");
    td3.className = "col3";
    td3.appendChild(address);
    var td4 = document.createElement("td");
    td4.className = "col4";
    td4.appendChild(remarks);
    var td5 = document.createElement("td");
    td5.className = "col5";
    td5.style.textAlign = "center";
    // 创建input，并设置按键反应（编辑、删除 按钮）
    var input1 = document.createElement('input');
    var input2 = document.createElement('input');
    input1.setAttribute('type','button');
    input1.setAttribute('value','编辑');
    input1.setAttribute('onclick','modify(this)');
    input1.id = 'btn1';
    input2.setAttribute('type','button');
    input2.setAttribute('value','删除');
    input2.setAttribute('onclick','del(this)');
    input2.id = 'btn2';
    td5.appendChild(input1);
    td5.appendChild(input2);

    // 获取table1
    var table = document.getElementById("table1");
    // 将tr加入table中
    table.appendChild(tr);
    // 将td依次加入tr中
    tr.appendChild(td1);
    tr.appendChild(idTd);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    // 改变当前共多少条数
    // 获取table有多少行
    var num = table.rows.length -1;
    // 将行数写入
    var rowsNumber = document.getElementById("rowsNum");
    rowsNumber.innerHTML = num;

    // 获取一页显示多少条数据
    var index = document.getElementById("sel").selectedIndex;
    var opt = document.getElementById("opt" + index).value;
    opt = parseInt(opt);

    // 获取当前页面
    var page = document.getElementById("pno").innerText;
    page = parseInt(page);

    // 超过该页面显示数量的数据，不显示
    for (var i=(page*opt)+1; i<num+1; i++){
        table.rows[i].style.display = "none";
    }

    // 将主页面显示
    var total1 = document.getElementById("total1").style;
    total1.display = "block";
    // 将添加信息页面隐藏
    var total2 = document.getElementById("total2").style;
    total2.display = "none";
}

// 删除函数
function del(obj){
    // 获取待删除行
    var objParentnode = obj.parentNode.parentNode;
    // 删除
    objParentnode.remove();
    // 改变当前共多少条数
    // 获取table1
    var table = document.getElementById("table1");
    // 获取table有多少行
    var num = table.rows.length -1;
    // 将行数写入
    var rowsNumber = document.getElementById("rowsNum");
    rowsNumber.innerHTML = num;

    // 获取一页显示多少条数据
    var index = document.getElementById("sel").selectedIndex;
    var opt = document.getElementById("opt" + index).value;
    opt = parseInt(opt);

    // 获取当前页面
    var page = document.getElementById("pno").innerText;
    page = parseInt(page);

    // 删除数据后，数据自动补齐
    if (num > (page*opt)+1){
        for (var i=((page-1)*opt)+1; i<(page*opt)+1; i++){
            table.rows[i].style.display = "table-row";
        }
    }
    else {
        for (var i=((page-1)*opt)+1; i<num+1; i++){
            table.rows[i].style.display = "table-row";
        }
    }
}

// 编辑函数
function modify(obj) {
    // 将主页面隐身
    var total1 = document.getElementById("total1").style;
    total1.display = "none";
    // 将添加信息页面显示
    var total2 = document.getElementById("total2").style;
    total2.display = "block";

    // 显示提交1按钮，隐藏提交2按钮
    document.getElementById("submit1").style.display = "none";
    document.getElementById("submit2").style.display = "block";

    // 获取待编辑数据
    objTr = obj.parentNode.parentNode;
    objTd = objTr.getElementsByTagName('td');

    // 将输入的值变为这一行的数据
    var name = document.getElementById("name").value = objTd[0].innerText;
    var onlyId = document.getElementById("id").value = objTd[1].innerText;
    var title = document.getElementById("title").value = objTd[2].innerText;
    var address = document.getElementById("address").value = objTd[3].innerText;
    var remarks = document.getElementById("remarks").value = objTd[4].innerText;
}

// 提交2
function submit2() {
    // 将主页面显示
    var total1 = document.getElementById("total1").style;
    total1.display = "block";
    // 将添加信息页面隐藏
    var total2 = document.getElementById("total2").style;
    total2.display = "none";

    // 修改编辑行的数据
    objTd[0].innerText = document.getElementById("name").value;
    objTd[1].innerText = document.getElementById("id").value;
    objTd[2].innerText = document.getElementById("title").value;
    objTd[3].innerText = document.getElementById("address").value;
    objTd[4].innerText = document.getElementById("remarks").value;
}

// 下一页
function next() {
    // 获取table1
    var table = document.getElementById("table1");
    var num = table.rows.length -1;

    // 获取当前页面
    var page = document.getElementById("pno").innerText;
    page = parseInt(page);

    // 获取每页显示多少条数据
    var index = document.getElementById("sel").selectedIndex;
    var opt = document.getElementById("opt" + index).value;
    opt = parseInt(opt);

    // 总页数
    var pageSum = Math.ceil((num) / opt);

    // 如果下一页小于总页数，则跳转到下一页，否则报出提示
    if (page < pageSum) {
        page = page + 1;
        document.getElementById("pno").innerText = page;
        for (var i=((page-2)*opt)+1; i<((page-1)*opt)+1; i++){
            table.rows[i].style.display = "none";
        }
        for (var i=((page-1)*opt)+1; i<(page*opt)+1; i++){
            table.rows[i].style.display = "table-row";
        }
    }
    else {
        window.alert("该页为最后一页，无法前往下一页！")
    }
}

// 上一页
function last() {
    // 获取table1
    var table = document.getElementById("table1");
    var num = table.rows.length -1;

    // 获取当前页面
    var page = document.getElementById("pno").innerText;
    page = parseInt(page);

    // 获取每页显示多少条数据
    var index = document.getElementById("sel").selectedIndex;
    var opt = document.getElementById("opt" + index).value;
    opt = parseInt(opt);

    // 如果是首页，则报出提示，否则跳转到上一页
    if (page > 1) {
        document.getElementById("pno").innerText = page - 1;
        for (var i=((page-2)*opt)+1; i<((page-1)*opt)+1; i++){
            table.rows[i].style.display = "table-row";
        }
        for (var i=((page-1)*opt)+1; i<(page*opt)+1; i++){
            table.rows[i].style.display = "none";
        }
    }
    else {
        window.alert("该页为首页，无法前往上一页！")
    }
}

// 分页
function pagination() {
    // 获取table1
    var table = document.getElementById("table1");
    var num = table.rows.length -1;

    // 获取每页显示多少条数据
    var index = document.getElementById("sel").selectedIndex;
    var opt = document.getElementById("opt" + index).value;
    opt = parseInt(opt);

    // 跳转到首页
    document.getElementById("pno").innerText = 1;
    for (var i=1; i<opt+1; i++){
        table.rows[i].style.display = "table-row";
    }
    for (var i=opt+1; i<num+1; i++){
        table.rows[i].style.display = "none";
    }
}

function seach() {
    // 获取table1
    var table = document.getElementById("table1");
    // 获取查找关键字
    var seach = document.getElementById("seach").value;
    // 以什么查找
    var index = document.getElementById("s").selectedIndex;

    // 获取table有多少行
    var num = table.rows.length -1;

    document.getElementById("pno").innerText = 1;

    if (num>1){
        for (var i=1; i<num+1; i++){
            var content = table.rows[i].cells[index].innerText;
            if (content.indexOf(seach) != -1){
                table.rows[i].style.display = 'table-row';
            }
            else {
                table.rows[i].style.display = 'none';
            }
        }
    }
}

function gopage() {
    // 获取table1
    var table = document.getElementById("table1");
    var num = table.rows.length -1;

    // 获取跳转页面
    var page = document.getElementById("gopg").value;
    page = parseInt(page);

    // 获取每页显示多少条数据
    var index = document.getElementById("sel").selectedIndex;
    var opt = document.getElementById("opt" + index).value;
    opt = parseInt(opt);

    // 总页数
    var pageSum = Math.ceil((num) / opt);

    if (page < pageSum) {
        for (var i=((page-1)*opt)+1; i<(page*opt)+1; i++){
            table.rows[i].style.display = "table-row";
        }
        for (var i=1; i<((page-1)*opt)+1; i++) {
            table.rows[i].style.display = "none";
        }
        for (var i=(page*opt)+1; i<num+1; i++){
            table.rows[i].style.display = "none";
        }
        document.getElementById("pno").innerText = page;
    }
    if (page == pageSum) {
        for (var i=((page-1)*opt)+1; i<num+1; i++){
            table.rows[i].style.display = "table-row";
        }
        for (var i=1; i<((page-1)*opt)+1; i++) {
            table.rows[i].style.display = "none";
        }
        document.getElementById("pno").innerText = page;
    }
    if (page > pageSum) {
        window.alert("您输入的页码超出总页码，请重新输入！")
    }
}
