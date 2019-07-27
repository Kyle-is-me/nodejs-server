/**
 * 先封装一个根据form表单的收集数据的方法
 * 原理是根据name属性和value属性
 * 
 * 1.获取form表达-通过一个选择器
 * 2.获取所有带name的元素
 * 3.遍历得到的所有带name的后代元素，组成name和value
 * 
 */

function serialize(formSelector) {
   // 先创建一个数组，用来储存所有的键值对
   let arr = []
   let form = document.querySelector(formSelector);
   // 根据父元素选择所有满足条件的后代
   let eles = form.querySelectorAll('[name]');
   // 遍历所有带name的后代元素-此处的伪数组是nodeList，可以使用forEach
   eles.forEach(e => {
      // 判断单选框是否被选中
      if(e.type == 'radio' && e.checked){
         let key = e.name;
         let value = e.value;
         arr.push(key+'='+value);
      }
      if(e.type != 'radio'){
         let key = e.name;
         let value = e.value;
         arr.push(key+'='+value);
      }
   });
   return arr.join('&');
}



// 注册新增的点击事件
let btn = document.querySelector('#sub');
btn.onclick =  function(){
   let data = serialize('#myform');
   let xhr = new XMLHttpRequest();
   xhr.open('get','http://127.0.0.1:8080/addHero?'+data)
   xhr.send();
   xhr.onreadystatechange=function(){
      console.log(xhr.responseText);
   }

};

