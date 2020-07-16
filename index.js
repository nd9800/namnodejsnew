const express = require("express");
const app = express();
const PORT=process.env.PORT || 5000;
app.listen(PORT,function () {
    console.log("sever is running...");
});
app.use(express.static("public"));
app.set("view engine","ejs");
//app.use app.use () hoạt động như thế:
//
// 1.Yêu cầu sự kiện truy tìm trên ví dụ máy chủ http.
// 2.express thực hiện một số thao tác bên trong của nó với đối tượng req.
// 3.Đây là khi express bắt đầu làm những việc bạn đã chỉ định với app.use
//app.set chạy view engine là ejs như city.ejs , head.ejs
var counter =0;
app.get("/",function (req,res) {
    counter++;
    let city=req.query.cityname;
    if(city == undefined){
        city = "Hanoi,VietNam";
    }
    res.render("home",{
        count: counter,
        city:city
    });
   // res.sendFile(__dirname+"/views/home.ejs");
});
app.get("/about-us",function (req,res) {
    res.send("Giới thiệu về chúng tôi");
});
const fs = require("fs");
app.get("/danh-sach-thanh-pho",function (req,res) {
        let data = fs.readFileSync("data/thanhpho.json","utf-8");
        let cities = JSON.parse(data);
        //hàm trên là chuyển về json
        res.render("cities",{
            cities:cities
    })
   // res.send(data);
});
//views lưu html
//public lưu css , js,img
//app.get tạo một trang mới
// ? là tham số  mềm còn :id là tham số cứng
//res send là in ra
//res.render làm giao diện
app.get("/thanh-pho/:id",function (req,res) {
    let cityId= req.params.id;
    let city ={};
    //res.send("cityId");
    let data = fs.readFileSync("data/thanhpho.json","utf-8");
    let cities = JSON.parse(data);
    cities.map(function (e) {
        if(e.id==cityId) {
            city = e;
        }
    });
    res.render("city",{
        city:city
    });
});
app.get("/api/messages",function(req,res) {
    let data = [
        {
            msg: "Xin Chao",
            name: "Luna"
        },
        {
            msg: "Hi",
            name: "Long"
        },
        {
            msg: "Di choi khong",
            name: "Luna"
        },
    ];
    let rs={
        status:true,
        message:"Success",
        data:data
    }
    res.send(data);
});