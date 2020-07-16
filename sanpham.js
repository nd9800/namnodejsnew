const express = require("express");
const app = express();
app.listen(3000,function () {
    console.log("sever is running...");
});
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/about-us",function (req,res) {
    res.send("Giới thiệu về chúng tôi");
});
const fs = require("fs");
app.get("/danh-sach-san-pham",function (req,res) {
    let data = fs.readFileSync("data/sanpham.json","utf-8");
    let sps = JSON.parse(data);
    //hàm trên là chuyển về json
    res.render("sps",{
        sps:sps
    })
});
app.get("/san-pham/:id",function (req,res) {
    let sanphamId= req.params.id;
    let sp ={};
    //res.send("cityId");
    let data = fs.readFileSync("data/sanpham.json","utf-8");
    let sps = JSON.parse(data);
    sps.map(function (e) {
        if(e.id==sanphamId) {
            sp = e;
        }
    });
    res.render("sp",{
        sp:sp
    });
})