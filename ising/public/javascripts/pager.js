/**
 * js 分页插件<br>
 * 使用在页面引入如下div 设置相关属性
 * <div class="pagination"  total="$num" cpage="$num" pageSize="$num" bindForm="formId"></div>
 * total:总记录数
 * cpage：当前页
 * pageSize；每页大小
 * bindForm：要绑定的表单id，不设置，默认取当前url地址
 * pageParam : 分页参数名，用于后台获取是第几页，如果bindForm有设置的<input type="hidden" name="pageNum">只设值，否则自动添加
 **/

(function ($) {
    function getTotalPage(total, pageSize) {
        return total % pageSize == 0 ? total / pageSize : (parseInt(total / pageSize) + 1);
    }

    $.fn.pagination = function () {
        console.info(1);
        var ele = $(this);
        var total = (ele.attr("total") == undefined || ele.attr("total") <= 0) ? 0 : parseInt(ele.attr("total"));
        var cpage = (ele.attr("cpage") == undefined || ele.attr("cpage") < 0) ? 1 : parseInt(ele.attr("cpage"));
        var pageSize = (ele.attr("pageSize") == undefined || ele.attr("pageSize") < 0) ? 20 : parseInt(ele.attr("pageSize"));
        var formEleId = ele.attr("bindForm");
        var pageParam = ele.attr("pageParam") == undefined ? "pageNum" : ele.attr("pageParam");
        //清除
        ele.html("");
        if (total <= pageSize) {
            return;
        }
        var totalPage = getTotalPage(total, pageSize);

        if (cpage >= 1) {
            ele.append("<a href='javascript:;' goto='1'>首页</a>");
        }
        if (cpage - 1 >= 1) {
            ele.append("<a href='javascript:;' goto='" + (cpage - 1) + "'>上一页</a>");
        }

        for (var i = cpage - 5; i < cpage + 5; i++) {

            if (i > 0 && i <= totalPage) {
                if (i == cpage) {
                    ele.append("<a href='javascript:;' class='active' goto='" + i + "'>" + i + "</a>");
                } else {
                    ele.append("<a href='javascript:;'  goto='" + i + "'>" + i + "</a>")
                }

            }
        }
        if (cpage + 1 <= totalPage) {
            ele.append("<a href='javascript:;' goto='" + (cpage + 1) + "'>下一页</a>");
        }
        if (cpage <= totalPage) {
            ele.append("<a href='javascript:;' goto='" + totalPage + "'>尾页</a>");
        }

        ele.find("a").click(function () {
            if ($(this).hasClass("active")) {
                return;
            }
            var goto = $(this).attr("goto");
            if (formEleId) {
                //检测form
                if($("#" + formEleId).length==0){
                    console.error("对应的formId未找到，分页退出");
                    return ;
                }
                var param = $("#" + formEleId).find("input[name='" + pageParam + "']");
                if (param.length <=  0) {
                    param = $('<input>').attr({
                        type: 'hidden',
                        name: pageParam
                    }).appendTo($("#" + formEleId));
                }

                param.val(goto);
                $("#" + formEleId).submit();
            }else{
                var baseUrl = window.location.href;
                if(baseUrl.indexOf(pageParam+"=")>0) {
                    var reg =new RegExp(pageParam + "=\\d+","g")
                    baseUrl = baseUrl.replace(reg, pageParam + "=" + goto)
                }else if(baseUrl.indexOf("?")>0){
                    baseUrl =window.location.href+"&"+pageParam+ "=" + goto;
                }else{
                    baseUrl =window.location.href+"?"+pageParam+ "=" + goto;
                }
                window.location.href = baseUrl;
            }
        })

    };
})(jQuery);