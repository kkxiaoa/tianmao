//1.兼容函数 //功能： 
//参数说明:

function getClass(classname,obj){
  if(document.getElementsByClassName){
     return document.getElementsByClassName(classname);
  }else{//IE//"one two first"["one","two","first"]  "one" 3
    var all=document.getElementsByTagName("*");//集合[<div class="one two fisrt" id=""></div>,<p>]
    var arr=[];
    for(var i=0;i<all.length;i++){
      if(checkRel(all[i].className,classname)){
        arr.push(all[i]);
      }
    }
    return arr;
  }
}//"one two first"  "box"

function checkRel(str,val){
  var arr=str.split(" ");
  for(var i in arr){
    if(arr[i]==val){
      return true;
    }
  }
  return false;
}
/****************************************/




/*
  2.可以获取与设置纯文本的兼容函数
     obj:哪个对象用这个方法
     val:接收第二个实参，表示设置一个文本
*/
function getText(obj,val){
  if(val==undefined){//获取
    if(obj.innerText){//IE8
      return obj.innerText;
    }else{//W3C
      return obj.textContent;
    }
  }else{
    if(obj.innerText||obj.innerText==""){//IE8,当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
      obj.innerText=val;
    }else{//W3C
      obj.textContent=val;
    }
  }
}

/*********************************/
//3.获取样式
//obj:哪个对象   attr:哪个属性
//对象.属性    对象["属性"]
function getStyle(obj,attr){
  if(obj.currentStyle){//IE8
    return obj.currentStyle[attr];
  }else{
    return getComputedStyle(obj,null)[attr];
  }
}


/*********************************/
//4.获取元素的函数$()
/*
    $(".box");  类名
    $("#fisrt"); ID名
    $("a");    标签名
*/
//"  .box   " "box"   box" getClass("box")
function $(select,obj){
  var obj=obj||document;
   if(typeof select=="string"){
    //去掉字符串前后的空格
      select=select.replace(/^\s*|\s*$/g,"");
      if(select.charAt(0)=="."){// 类名
        return getClass(select.slice(1),obj);
      }else if(select.charAt(0)=="#"){
        return obj.getElementById(select.slice(1));
      }else if(/^[a-z|1-6]{1,10}$/g.test(select)){//标签名
         return obj.getElementsByTagName(select);
      }
   }else if(typeof select=="function"){//表示是一个函数
      window.onload=function(){
        select();
      }
   }
}

/***********************************/
/*
5.getChilds(parent,type);
 "a": 获取元素子节点的兼容函数
 "b": 获取元素+文本节点

  原理:先获取所有的儿子，然后根据节点的类型判断，如果为1，表示是元素节点，保存到数组里。

*/
function getChilds(parent,type){
  var type=type||"a";
  var childs=parent.childNodes//所有儿子
  var arr=[];
  for(var i=0;i<childs.length;i++){
    if(type=="a"){
      if(childs[i].nodeType==1){//元素
         arr.push(childs[i]);
      }
    }else if(type=="b"){//元素+文本
      if(childs[i].nodeType==1||(childs[i].nodeType==3&& childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){//元素
        arr.push(childs[i]);
      }
    }    
  }
  return arr;
}

//6.获得第一个子节点
function getFirst(parent){
  return getChilds(parent)[0];
}

//7.获得最后一个子节点
function getLast(parent){
  return getChilds(parent)[getChilds(parent).length-1];
}
//8.获得一个指定子节点
function getNum(parent,num){
  return getChilds(parent)[num];
}

//9.获得下一个兄弟节点
function getNext(obj){
  var next=obj.nextSibling;//null
  while(next.nodeType==3||next.nodeType==8){ 
    next=next.nextSibling;  
    if(next==null){
      return false;
    }    
  }
  return next;
}

//10.获得上一个兄弟节点
function getUp(obj){
  var up=obj.previousSibling;//null
  if(up==null){
    return false;
  }
  while(up.nodeType==3||up.nodeType==8){ 
    up=up.previousSibling;  
    if(up==null){
      return false;
    }    
  }
  return up;
}


//11.插入到某个对象之后
Object.prototype.insertAfter=function(obj1,obj2){
  var newobj=getNext(obj2);
  if(newobj){
    this.insertBefore(obj1,newobj);
  }else{
    this.appendChild(obj1);
  }
}


//12.获取滚动条走了的距离
function getScrollT(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  var scrollT=obj.scrollTop;
  return scrollT;
}

//轮播
function lunbo(a){
  var t=setInterval(moveleft,2000);
    function moveleft(){
      var father=$(".imgs")[a];
      var first=getFirst(father);
      animate(father,{left:-130},600,Tween.Linear,function()
      {//用回调函数来等动画执行完成在运行恢复功能，如果写在外边会导致在执行动画的过程中会同时执行下边的代码导致效果错误
        father.appendChild(first);
        father.style.left=0+"px";
      });   
    }
    function moveright(){
      var father=$(".imgs")[a];
      var last=getLast(father);
      var first=getFirst(father);
      father.style.left=-130+"px";
      father.insertBefore(last,first);
      animate(father,{left:130},600,Tween.Linear);
      animate(father,{left:0},600,Tween.Linear);
    }
    var left=$(".left-img")[a];
    var right=$(".right-img")[a];
    left.onmouseover=right.onmouseover=function(){
      clearInterval(t);
    }
    left.onmouseout=right.onmouseout=function(){
      t=setInterval(moveleft,2000);
    }
    left.onclick=function(){
      moveleft();
    }
    right.onclick=function(){
      moveright();
    }
}