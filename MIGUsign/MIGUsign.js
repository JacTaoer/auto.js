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
//setScreenMetrics(1080, 2280);
readBook();
sign();

function readBook(){
        app.launchApp("咪咕阅读");
        log("正在打开咪咕阅读,等待10秒");
        sleep(14000);
        log("**正在进入书架**");
        var a=packageName("com.ophone.reader.ui").clickable().className("android.widget.FrameLayout").drawingOrder(24).find();
        a.click();
         
       

        sleep(1500);
        var Book = rawInput("请输入书架上的图书名：");
        text(Book).findOne().parent().click();
        sleep(3000);  
            
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
                if(excTime > 1020000){ //17分钟退出 1020000
                        //exit();                       
                        toastLog("阅读时间已超过15分钟，正前往签到");
                        back();
                        break;
                }                                           
         }  
   
 }
 function sign(){       
        id("btn_bookshelf_search").findOne().click();
        sleep(3000);
        toastLog("**进入活动页面签到**");
         setClip("天天爱阅读")
         var et=id("etSearch").findOne();
          et.paste();
         sleep(1500);
         text("搜索").findOne().click();
        sleep(3500);         
        click(400,height/5);
        sleep(3000);
        //click(900,1300);
        text("签到").findOne().click();
        var time=new Date();
        var hour=time.getHours();
        var minutes= time.getMinutes();
        var seconds=time.getSeconds();
        toastLog("完成时间："+hour+":"+minutes+":"+seconds);
        exit();
 }
