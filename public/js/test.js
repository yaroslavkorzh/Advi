function createPopup(target){
  var container = $( "<div />", {
    id: 'adPopup',
    class: 'adpopup',
    style: 'position: absolute; top: 15px; left: 15px; height: 100px; width: 100px; line-height: 1px; background-color: white;'
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



$( document ).ready(function() {
    console.log( "ready!" );
    setTimeout(function(){
      createPopup();
    }, 6000);
});



