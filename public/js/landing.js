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

      console.log(data);

                // $.ajax({
                //     url: url,
                //     type: "POST",
                //     contentType: "application/json",
                //     data: JSON.stringify(data),
                //     complete: function (data) {
                //       console.log(data.responseText);
                //       scope.trigger('reset');
                //         //$('#output').html(data.responseText);
                //     }
                // });
        
    });
    
    // $('#submit-btn').on('click', function(){ console.log(this);});

    $('#register-btn').on('click', function(){ 
      $('.sign-up-form').removeClass('hidden');
      $('#register-btn').addClass('hidden');
      $("#login-btn").addClass('hidden');
    });
    $('#login-btn').on('click', function(){ 
      $('.login-form').removeClass('hidden');
      $('#register-btn').addClass('hidden');
      $("#login-btn").addClass('hidden');
    });

    
}

function initHelp(){
  $('.help').on('click', function(){ 
  var $this = $(this)
  $('.how_it_works').toggleClass("how_it_works_active")
  });
  $('.help_close').on('click', function(){ 
  var $this = $(this)
  $('.how_it_works').toggleClass("how_it_works_active")
  });
}

function initAPI(){
  $('#test-btn').on('click', function(){ 
    var request = new XMLHttpRequest();
    request.open('POST', 'http://kote.videogorillas.com:8042/api/1/media');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
      console.log('test', this);
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    var body = {
      'url': 'https://www.dropbox.com/s/sdqg1a03vo2hggl/11043435_10152889047648640_3006656993036528196_o.jpg?dl=1',
      'commands': [
        'mal9k'
      ]
    };
    request.send(JSON.stringify(body));

    // $.ajax({
    //   url: 'http://kote.videogorillas.com:8042/api/1/media',
    //   type: "POST",
    //   contentType: "application/json",
    //   data: JSON.stringify(data),
    //   beforeSend: function(){
    //     // Handle the beforeSend event

    //   },
    //   complete: function (data) {
    //     console.log(data.responseText);
    //     scope.trigger('reset');
    //     //$('#output').html(data.responseText);
    //   }
    // });

  });
}

// $(document).on('click', function(e){ console.log(e.target);});

$( document ).ready(function() {
    console.log( "ready!" );
    //initBackGround();
    initHelp();
    initForm();
    initAPI();
});



