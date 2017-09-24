// function BAIDUMAP() {
//
//
//   var opt={mapType:BMAP_NORMAL_MAP,minZoom:3,}
//   var map=new BMap.Map("map",opt);
//   //初始化地图
//   // map.disableDragging();
//   map.disableDoubleClickZoom();
//   // map.enableScrollWheelZoom();
//   var center=new BMap.Point(116.404,39.915);
//   //经纬度查找
//   map.centerAndZoom("北京市",18);//数字为缩放等级
//
//   var location=new BMap.GeolocationControl(true);
//   location.setAnchor(BMAP_ANCHOR_TOP_RIGHT);
//   map.addControl(location);
//
//   // map.addEventListener("rightclick",function () {
//   //     location.isVisible()?location.hide():location.show();
//   // })
//   setTimeout(function () {
//     location.location();
//   },3000);
//   // alert(location.getAddressComponent());
//   // var mapTypeControl=new  BMap.MapTypeControl({type:BMAP_MAPTYPE_CONTROL_DROPDOWN});
//   // map.addControl(mapTypeControl);
//
//   var CopyrightControl=new BMap.CopyrightControl({anchor:BMAP_ANCHOR_TOP_RIGHT});
//   CopyrightControl.addCopyright({id:8,content:"ShareTime"});
//
//   map.addControl(CopyrightControl);
//   var OverviewMapControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_TOP_RIGHT});
//   map.addControl(OverviewMapControl);
//
//   // var dsdsd=new Umap();
//   // map.addControl(dsdsd);
//   var icon=new BMap.Icon("ss",new BMap.Size(50,50));
//   icon.setImageSize(new BMap.Size(50,50));
//   var marker=new BMap.Marker(center,{
//     icon:icon,
//     offset:new BMap.Size(50,50)
//
//
//   });
//
//   map.addOverlay(marker);
//
//
//
// }
/**
 * Created by 韩吉鑫 on 2017/8/4.
 */
(function () {
  function BAIDUBMAP() {

    this.init();
  }
  BAIDUBMAP.prototype.start=function () {
    var self=this;
    var opt={mapType:BMAP_NORMAL_MAP,minZoom:3,enableHighResolution	:true};
    this.map=new BMap.Map("map",opt);

       this.map.zoom=18;
    //初始化地图
    // map.disableDragging();
    this.map.disableDoubleClickZoom();
    // map.enableScrollWheelZoom();
    // this.map.highResolutionEnabled(true);
    this.map.centerAndZoom("北京市",18);
    this.Geolocation().then(function (result) {
      self.map.centerAndZoom(result.point,18);//数字为缩放等级

    })


    //经纬度查找

  }
  BAIDUBMAP.prototype.CopyrightControl=function () {
    var CopyrightControl=new BMap.CopyrightControl({anchor:BMAP_ANCHOR_TOP_RIGHT});
    CopyrightControl.addCopyright({id:8,content:"ShareTime"});
    this.map.addControl(CopyrightControl);
    return CopyrightControl;
  }
  BAIDUBMAP.prototype.addMaker=function () {

  }
  BAIDUBMAP.prototype.geocoder=function (point,marker) {
    var self=this;
    var coder = new BMap.Geocoder();
    coder.getLocation(point,function (result) {
      console.log(result.address);

    })

    // coder.getPoint("天安门",function (resu) {
    //     console.log(resu);
    // })

  }
  BAIDUBMAP.prototype.infoWindow=function (info,open,close) {
    var point=new BMap.Point(info.lng,info.lat)
    var inforWindow=new BMap.InfoWindow(info.des+"",{width:220,height:50});
    var types=["跑腿","家政","代练","洗车","授课"];
    inforWindow.setTitle(types[info.type]+"");
    var marker=new BMap.Marker(point);
    marker.enableDragging();
    marker.addEventListener("click",function () {
      marker.openInfoWindow(inforWindow);
      open();

    });

    inforWindow.addEventListener("clickclose",function ($rootScope) {
      close();
    });
    this.map.addOverlay(marker);
    // this.map.addOverlay(inforWindow);

  }
  BAIDUBMAP.prototype.GeolocationControl =function () {
    var location=new BMap.GeolocationControl({

    });
    location.setAnchor(BMAP_ANCHOR_TOP_RIGHT);
    this.map.addControl(location);
    setTimeout(function () {
      location.location();
    },2000)

    return location;
  }
  BAIDUBMAP.prototype.Geocoder=function (lng,lat,fun) {
    var Geocoder=new BMap.Geocoder();
    var point= new BMap.Point(lng,lat);
    Geocoder.getLocation(point,fun)
  }
  BAIDUBMAP.prototype.Geolocation=function () {
    var geo= new BMap.Geolocation;
    return new Promise(function (succ,fail){
      geo.getCurrentPosition(function (result) {
        // console.log(result);
       succ(result);
      })
    });

  }
  BAIDUBMAP.prototype.init=function () {
    this.start();
  }


  window.BAIDUBMAP=BAIDUBMAP;

})();
