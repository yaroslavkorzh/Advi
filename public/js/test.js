function createPopup(target){
  var position = $('#testvideo').position()
  var height = $('#testvideo').height();
  var width = $('#testvideo').width();
  var style = 'position: absolute; top: '+ (parseInt(position.top) + height*0.1)+'px; left: ' +
    (parseInt(position.left) + width*0.1)+'px; height: 100px; width: 100px; line-height: 1px; background-color: white; opacity: 0.8;'
  var container = $( "<div />", {
    id: 'adPopup',
    class: 'adpopup',
    style: style
  });
  var content = $( "<img />", {
    class: 'content logo',
    src: "/res/img/duck_logo.png"
  });
  container.append(content);
  console.log('add popup');
  container.appendTo($('body'));

  setTimeout(function(){
    console.log('clear popup');
    $('#adPopup').remove();
  }, 6000);

}


var myVideo;

function playPause() { 
    if (myVideo.paused) {
      myVideo.play(); 
      setTimeout(function(){
        createPopup($('#testvideo'));
      }, 6000);
    }
    else {
      myVideo.pause(); 
    }

} 

function makeBig() { 
    myVideo.width = 960; //width="960" height="720"
} 

function makeSmall() { 
    myVideo.width = 320; 
} 

function makeNormal() { 
    myVideo.width = 640; 
} 


$( document ).ready(function() {
    console.log( "ready!" );
    myVideo = document.getElementById("testvideo");
    setTimeout(function(){
      createPopup($('#testvideo'));
    }, 6000);
});



