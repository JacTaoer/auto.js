//请在下方BookName引号内输入对应书籍名
var BookName="人间失格";
var startTime = new Date().getTime();
var excTime = 0;
var sleepTime = 0;
var i = 0;
var xPoint=650;
var yPoint=1250;
var height = device.height;
var width = device.width;

console.show();
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release);
setScreenMetrics(width, height);
readBook();
sign();


//进入咪咕进行阅读任务
function readBook(){
        
        //自动打开咪咕阅读APP，考虑到部分机型及广告，所以设置为15秒等待
        app.launchApp("咪咕阅读");
        log("正在打开咪咕阅读,等待15秒");
        sleep(15000);
        log("**正在进入书架**");
        
        //通过“书架”控件属性进行点击
        //packageName("com.ophone.reader.ui").clickable().className("android.widget.FrameLayout").drawingOrder(24).find().click();
        //或者采用返回键，也可以进入到书架
        back();
        sleep(1500);
        
        //获取用户输入图书名，点击
        var Book = rawInput("请输入书架上的图书名：");
        text(Book).findOne().parent().click();
        sleep(3000); 
        //开始自动阅读模式
        while(true){
                i++;
                excTime = new Date().getTime()-startTime;
                //随机X轴 0.8-0.85
                xPoint = Math.floor(Math.random() * (width*0.85 - width*0.8 + 1) ) + width*0.8;
                //随机Y轴 0.8-0.85
                yPoint = Math.floor(Math.random() * (height*0.85 - height*0.8 + 1) ) + height*0.8;
                sleepTime = 10000 + Math.random()*5000;
                        log("第" + i + "次点击，已经执行时间：" + Math.round(excTime/600)/100
                + "分钟,点击("+xPoint +"," + yPoint +")");             
                click(xPoint,yPoint);
                log("沉睡时间：" + Math.round(sleepTime/10)/100 + "秒");
                sleep(sleepTime);  
                //17分钟退出 1020000
                if(excTime > 1020000){ 
                        //exit();                       
                        toastLog("阅读时间已超过15分钟，正前往签到");
                        back();
                        break;
                }                                           
         }  
   
 }
//完成阅读任务，进入签到页面
 function sign(){  
         //点击“书架”左上角“搜索”控件
        id("btn_bookshelf_search").findOne().click();
        sleep(3000);
        toastLog("**进入活动页面签到**");
         
        //设置剪切板的内容，并输入
         setClip("天天爱阅读")
         var et=id("etSearch").findOne();
          et.paste();
         sleep(1500);
         
         //点击“搜索”控件
         text("搜索").findOne().click();
        sleep(3500);
         
         //点击“天天爱阅读”进入
        //click(400,height/5);
        className("android.view.View").text("%E6%90%9C%E7%B4%A2%E5%8F%A3%E4%BB%A4%E5%9B%BE").findOne().click();
        sleep(3000);
         
        //找到“签到”控件点击
        text("签到").findOne().click();
         
         //获取当前任务完成时间
        var time=new Date();
        var hour=time.getHours();
        var minutes= time.getMinutes();
        var seconds=time.getSeconds();
        toastLog("完成时间："+hour+":"+minutes+":"+seconds);
        exit();
 }
