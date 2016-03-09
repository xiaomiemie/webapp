// $(function() {

// })
var list = [{
  height: 950,
  width: 800,
  img: "imgs/1.jpg"
}, {
  height: 1187,
  width: 900,
  img: "imgs/2.jpg"
}, {
  height: 766,
  width: 980,
  img: "imgs/3.jpg"
}, {
  height: 754,
  width: 980,
  img: "imgs/4.jpg"
}, {
  height: 493,
  img: "imgs/5.jpg",
  width: 750
}, {
  height: 500,
  img: "imgs/6.jpg",
  width: 750
}, {
  height: 600,
  img: "imgs/7.jpg",
  width: 400
}];

function Silder(opts) {
  this.wrap = opts.wrap;
  this.list = opts.list;
  this.init();
  this.renderDOM();
  this.bindEvent();
}
Silder.prototype.init = function() {

  var self = this;

  this.ratio = (window.innerWidth / window.innerHeight).toFixed(2);
  this.widthImg = parseInt(getComputedStyle(self.list, '').width);

  console.log(this.widthImg)
    // this.widthImg = parseInt(self.list.offsetWidth);
  this.heightImg = parseInt(getComputedStyle(self.list, '').height);
  this.indexNum = 0;
  this.count = list.length;
};
Silder.prototype.renderDOM = function() {
  var self = this;
  var len = list.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    var data = list[i];
    var trans = i * self.widthImg;
    if (data.width / data.height > this.ratio) {
      arr.push('<li style="-webkit-transform:translate(' + trans + 'px,0)"><img width="' + self.widthImg + '" src="' + data.img + '"/></li>')
    } else {
      arr.push('<li style="-webkit-transform:translate(' + trans + 'px,0)"><img height="' + self.heightImg + '" src="' + data.img + '"/></li>')
    }
  }
  self.list.innerHTML = arr.join('');
}
Silder.prototype.bindEvent = function() {
  var self = this;
  var locLast, locNow;
  var locOff;
  var lis = self.list.getElementsByTagName('li');
  var startHandle = function(e) {
    e.preventDefault();
    var evt = e.targetTouches[0];
    locLast = evt.pageX;
  }
  var moveHandle = function(e) {
    e.preventDefault();
    var evt = e.targetTouches[0];

    locNow = evt.pageX;
    locOff = locNow - locLast;
    scrollAimate(locOff);
  }
  var endHandle = function(e) {
    e.preventDefault();
    AimiteStop(locOff);
  }

  function scrollAimate(offs) {
    var tempBefore = -self.widthImg + offs;
    var tempAfter = self.widthImg + offs;
    var i = self.indexNum;
    lis[self.indexNum].style.webkitTransform = 'translate(' + offs + 'px,0)';
    if (lis[self.indexNum - 1]) {
      lis[self.indexNum - 1].style.webkitTransform = 'translate(' + tempBefore + 'px,0)';
    }
    if (lis[self.indexNum + 1]) {
      lis[self.indexNum + 1].style.webkitTransform = 'translate(' + tempAfter + 'px,0)';
    }
  }

  function AimiteStop(offs) {
    if (offs > 0) { //倒着
      if (self.indexNum == 0) {
        lis[self.indexNum].style.webkitTransform = 'translate(' + 0 + 'px,0)';
      } else {
        if (offs > 200) {
          lis[self.indexNum].style.webkitTransform = 'translate(' + self.widthImg + 'px,0)';
          lis[self.indexNum - 1].style.webkitTransform = 'translate(' + 0 + 'px,0)';
          self.indexNum--;
        } else {
          lis[self.indexNum].style.webkitTransform = 'translate(' + 0 + 'px,0)';
          lis[self.indexNum - 1].style.webkitTransform = 'translate(' + (-self.widthImg) + 'px,0)';
        }
      }
    } else {
      if (self.indexNum == self.count - 1) {
        lis[self.indexNum].style.webkitTransform = 'translate(' + 0 + 'px,0)';
      } else {
        if (offs < -200) {
          lis[self.indexNum].style.webkitTransform = 'translate(' + (-self.widthImg) + 'px,0)';
          lis[self.indexNum + 1].style.webkitTransform = 'translate(' + 0 + 'px,0)';
          self.indexNum++;
        } else {
          lis[self.indexNum].style.webkitTransform = 'translate(' + 0 + 'px,0)';
          lis[self.indexNum + 1].style.webkitTransform = 'translate(' + self.widthImg + 'px,0)';

        }
      }
    }

  }
  self.wrap.addEventListener('touchstart', startHandle)
  self.wrap.addEventListener('touchmove', moveHandle)
  self.wrap.addEventListener('touchend', endHandle)
}


var s = new Silder({
  wrap: document.getElementById('canvas'),
  list: document.getElementById('canvas').getElementsByTagName('ul')[0]
})