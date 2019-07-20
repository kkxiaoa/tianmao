
/**
 * @param  {string} classname //"one two first"  "box"
 * @param  {Object} obj
 * 
 */
function getClass(classname, obj){
  if(document.getElementsByClassName){
     return document.getElementsByClassName(classname);
  }else{
    var all=document.getElementsByTagName("*");//集合[<div class="one two fisrt" id=""></div>,<p>]
    var arr=[];
    for(var i=0;i<all.length;i++){
      if(checkRel(all[i].className,classname)){
        arr.push(all[i]);
      }
    }
    return arr;
  }
}
function checkRel(str,val){
  var arr = str.split(" ");
  for(var i in arr){
    if(arr[i] == val){
      return true;
    }
  }
  return false;
}

/*
  可以获取与设置纯文本的兼容函数
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
//获取样式
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
//获取元素的函数$()
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
getChilds(parent,type);
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

//获得第一个子节点
function getFirst(parent){
  return getChilds(parent)[0];
}

//获得最后一个子节点
function getLast(parent){
  return getChilds(parent)[getChilds(parent).length-1];
}
//获得一个指定子节点
function getNum(parent,num){
  return getChilds(parent)[num];
}

//获得下一个兄弟节点
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

//获得上一个兄弟节点
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


//插入到某个对象之后
Object.prototype.insertAfter= function(obj1,obj2){
  var newobj=getNext(obj2);
  if(newobj){
    this.insertBefore(obj1,newobj);
  }else{
    this.appendChild(obj1);
  }
}

//获取滚动条走了的距离
function getScrollT () {
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  var scrollT=obj.scrollTop;
  return scrollT;
}
/**
 * @param  {(string|number)} number
 */
let toThousands = (number) => {
  var num = Number(number || 0).toFixed(2).toString(), tail = num.slice(-3),
  realNumber = num.substring(0, num.indexOf('.')), result = ''
  while (realNumber.length > 3) {
    result = ',' + realNumber.slice(-3) + result
    realNumber = realNumber.slice(0, realNumber.length - 3)
  }
  if (realNumber) { result = realNumber + result }
  return result + tail
}
/**
 * 判断浏览器类型
 */
let checkBrowser = () => {
  let ua = navigator.userAgent.toLocaleLowerCase()
  let browserType = null
  let _mime = function (option, value) {
    var mimeTypes = navigator.mimeTypes
    for (var mt in mimeTypes) {
    if (mimeTypes[mt][option] == value) {
        return true
      }
    }
    return false
  }
  if (ua.match(/edge/) != null || ua.match(/NET/) != null) {
    browserType = "Edge"
  } else if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE"
    browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1]
  } else if (ua.match(/firefox/) != null) {
    browserType = "火狐"
  } else if (ua.match(/ubrowser/) != null) {
    browserType = "UC"
  } else if (ua.match(/opera/) != null) {
    browserType = "欧朋"
  } else if (ua.match(/bidubrowser/) != null) {
    browserType = "百度"  
  } else if (ua.match(/metasr/) != null) {
    browserType = "搜狗"  
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    browserType = "QQ"
  } else if (ua.match(/maxthon/) != null) {
    browserType = "遨游"
  } else if (ua.match(/chrome/) != null) {
    var is360 = _mime("type", "application/vnd.chromium.remoting-viewer")
    if (is360) {               
      browserType = '360'  
    } else {  
      browserType = "谷歌" 
    }      
  } else if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") < 1) {
    browserType = "Safari"
  }
  return browserType
}
/**
 * 绑定事件
 * @param  {HTMLElement} dom //dom对象
 * @param  {string} type // click、input、hover...
 * @param  {} fn callback
 */
let addEvent = (dom, type, fn) => {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}
/**
 * 移除事件
 * @param  {HTMLElement} dom //dom对象
 * @param  {string} type // click、input、hover...
 * @param  {} fn callback
 */
let removeEvent = (dom, type, fn) => {
  if (dom.removeEventListener) {
    dom.removeEventListener(type, fn, false) 
  } else if (target.detachEvent) {
    dom.detachEvent("on" + type, fn)
  } else {
    dom["on" + type] = null 
  }
}
/**
 * 获取事件
 */
let getEvent = event => event || window.event

/**
 * 获取事件
 */
let getTarget = (event) => {
  var event = getEvent(event)
  return event.target || event.srcElement
}


/**
 * 阻止默认事件
 */
let preventDefault = event => {
  var event = getEvent(event)
  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }
}

//轮播
function swiper (a) {
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