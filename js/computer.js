//获取显示屏
var express = $(".express");

var result=0;
var flag = false;

var operation;  
//result -> 最终结果
//flag -> 区分输入的左右两个数字
//operation -> 定义运算符

//对显示屏进行值设置
function setValue(val){
	express.text(val);
	console.log(`这是当前设置的值${express.text()}`);
}

// 获取显示的值，每次进行操作
function getValue(){
	return express.text();
	console.log(`这是当前显示的值${express.text()}`);
}

//对按钮点击事件进行处理
function calculater(keys){
	//获取按钮类型，判断是数字还是运算符号
	var mark = keys.dataset['number'];
	console.log(`这是当前点击按钮的类型${mark}`);

	//获取当期按钮的值
	var curVal = keys.innerText;

	//获取当前显示屏的值
	var mes = getValue();

	//点击的是数字
	if(mark == "figure"){
		if(mes == '0' || flag){
			// 输入值为0或者操作符显示当前数字
			setValue(curVal);
			flag = false;
			return;
		}
		var showVal = String(mes).concat(curVal);
		setValue(showVal);
	}else if(mark == 'op'){
		if(flag)
			return;
		flag = true;
		// 如果输入的是个运算符，flag置true
		if(!operation){
			result = +mes;
			operation = curVal;
			return;
		}
		result = getOper(result,mes,operation);
		setValue(result);
		operation = curVal;

	}else if(mark == '.'){
		var point = String(mes).indexOf('.') > -1;
		if (point) { //如果小数点前没有数字输出时添加零
            if (flag) {
                setValue("0" + curVal);
                flag = false;
                return;
            }
            return;
        }
        setValue(String(mes).concat(curVal));
	}else if(mark == "±"){
		 setValue(-mes);
	}else if (mark == "C") {
        setValue(0);
        flag = false;
    } else if (mark == "=") {
        if (!operation){
        	return;
        }
        result = getOper(result, mes, operation);
        setValue(result);
        operation = null;
        flag = false;
    }  else if (mark == "Del") {
        var curNum = String(Math.abs(mes));
        if ((curNum.length < 2) || mes == 0) {
            setValue(0);
        } else {
            setValue(String(mes).slice(0, -1)); //显示前0到Length-1之间的数字，即删除最后一个数字
        }
    }
}


//两个值进行运算
var counter = {
	'+':function(x,y){
		return x + y;
	},
	'-':function(x,y){
		return x - y;
	},
	'×':function(x,y){
		return x * y;
	},
	'÷':function(x,y){
		return parseFloat(x / y).toFixed(2);
	}

}

//计算函数
function getOper(x,y,oper){
	// 计算时两个值都得为数字，否则加法运算执行字符串连接功能
	x = Number(x);
	y = Number(y);
	return counter[oper](x,y);
}

