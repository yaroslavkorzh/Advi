function getFormData(form) {
  var obj = {}, i, ii, j, jj, parents, current;
    inputs = $(form).find('input'), input;
  
  for (i = 0, ii = inputs.length; i < ii; ++i) {
    input = $(inputs[i]);
    parents = input.parents('fieldset, form').toArray().reverse();
    current = obj;
    
    for (j = 0, jj = parents.length; j < jj; ++j) {
      if (current[parents[j].name] == null) {
        current[parents[j].name] = {};
      }
      current = current[parents[j].name];
    }
    
    if (input[0].type == "checkbox") {
      current[input[0].name] = input[0].checked;
    } else {
      current[input[0].name] = input.val();
    }
  }

  return obj;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var result = "Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude; 
    console.log(result);
}

function initBackGround(){
    var BV = new $.BigVideo();
    var vids = [
        'res/video/dock.mp4',
        'res/video/river.mp4',
        'res/video/frontier.mp4'
    ];
    vids.sort(function() { return 0.5 - Math.random() }); // random order on load
    BV.init();
    BV.showPlaylist(vids,{ambient:false});
}


function initForm(){
    $('#sign-up').form({
        fields: {
          // name: {
          //   identifier  : 'name',
          //   rules: [
          //     {
          //       type   : 'empty',
          //       prompt : 'Please enter your name'
          //     }
          //   ]
          // },
          email: {
            identifier  : 'email',
            rules: [
              {
                type   : 'email',
                prompt : 'Please enter a valid e-mail'
              }
            ]
          },
          name: {
            identifier  : 'rentreq',
            rules: [
              {
                type   : 'empty',
                prompt : 'Please enter your request'
              }
            ]
          }
        }
    });
    $("#sign-up").on('submit',function( event ) {
      event.preventDefault();
      console.log( "Handler for .submit() called." );
      getLocation();
      console.log(this);
      var $this = $(this)
      var scope = $this;
      //var data = $this.serialize();
      var url = "/users";//+ '?' + data;
      var data = $this.serializeArray().reduce(function(obj, item) {
          obj[item.name] = item.value;
          return obj;
      }, {});
      var payload = {
                    name: $('#user-name').val()
                };

                $.ajax({
                    url: url,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    complete: function (data) {
                      console.log(data.responseText);
                      scope.trigger('reset');
                        //$('#output').html(data.responseText);
                    }
                });
        
    });
    $('#submit-btn').on('click', function(){ console.log(this);});
}


$( document ).ready(function() {
    console.log( "ready!" );
    initBackGround();
    initForm();
});



