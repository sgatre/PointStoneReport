var beforeMoney;

function getQueryString(name) 
{
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

function validMoney(money)
{
	var reg = new RegExp("^[0-9]+(.[0-9]{1})?$");
	return reg.test(money);
}

$(document).ready(function() {
	var openid = getQueryString("openid");
	var password = "";

	$("#money-page").hide();
	$("#success").hide();
	$("#money-text").focus(function(event) {
		$("span").hide();
		//$("input.weui-check [checked=checked]").removeAttr("checked");
	}).focusout(function(event) {
		$("span").show();
	});

	$("#password-sure").click(function() {
		password = $("#password").val();
		console.log(password);
		
		// 以下两行为了测试，可以连接服务器后删掉
		$("#password-page").toggle();
		$("#money-page").toggle();

		$.ajax({
			url: "http://card-service.icug.net.cn/accountinformation?" + "openid=" + openid + "&pwd=" + password,
			type: "GET",
			dataType: "json",
			success: function(res) {
				if (res.status == 0) {
					$.toast("登录成功")
					$("#password-page").toggle();
					$("#money-page").toggle();
					balance = parseInt(res.db_balance);
					beforeMoney = balance / 100;
					dislplay_balance = (balance / 100) + " 元";
					$("#left-money").replaceWith(dislplay_balance);
				} else {
					$.toast("查找不到用户", "cancel");
					return;
				}
			}
		})
	});
	$("#charge-button").click(function() {
		var money = $("#money-text").val();
		if (!validMoney(money)&&money!="") {
			$.toast("请输入正确格式的金额", "cancel");
			return;
		}
		if (parseInt(money)>500) {
			$.toast("金额过大", "cancel");
			return;
		}
		//如果没有填写，则找到选择的金额
		if (money == ""){
			var money = $(":checked").parent().prev().children('p').text();;
		}

		money = parseFloat(money);
		money *= 100;
		password = $("#password").val();
		console.log(money);

		$.confirm("确认充值"+money/100+"元吗？充值成功后金额会写到过渡余额内，下一次刷卡消费后才能写入卡余额中",   
			function() {
				$.ajax({
					url: "http://card-service.icug.net.cn/accountmoney",
					type: "POST",
					dataType: "json",
					data: {
						"openid": openid,
						"pwd": password,
						"money": money
					},
					success: function(res) {
                //$.hideIndicator();
                if (res.status == 0) {
                	$("#money-page").hide();
                	$("#success").show();
                	var newMoney = parseInt(beforeMoney) + parseInt(money);
                	$("#success-left-money").html("当前余额为：" + newMoney + "元");
                } else {
                	$("#money-page").hide();
                	$("#success").show();
                	$.toast("充值失败","cancel");
                }
            },
            error: function(res) {
                //$.hideIndicator();
                $.toast("网络故障，请重试","cancel");
            }
        })
			}, function() {});

		
        //$.showIndicator();



    });
	$("#close").click(function(event) {
		window.close();
	});
	$("#return").click(function(event) {
		//继续充值，
		$.ajax({
			url: "http://card-service.icug.net.cn/accountinformation?" + "openid=" + openid + "&pwd=" + password,
			type: "GET",
			dataType: "json",
			success: function(res) {
				if (res.status == 0) {
					$.toast("刷新成功")
					$("#success").toggle();
					$("#money-page").toggle();
					balance = parseInt(res.db_balance);
					beforeMoney = balance / 100;
					dislplay_balance = (balance / 100) + " 元";
					$("#left-money").replaceWith(dislplay_balance);
				} else {
					$.toast("返回失败", "cancel");
					return;
				}
			}
		})

	});
});