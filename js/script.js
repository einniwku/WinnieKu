var home ={
	setupYouTubeFeed: function() {
        var username = "UCuDVVIU_fclQzLHprqSziMA";
        var maxResults = "6";
        var key = "AIzaSyAZFmQ9LzSgHiGu66JtT1qkSAV-ysY3ceY";
        var channelQuery = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&callback=?&forUsername=" + username + "&key=" + key;

        $.getJSON(
           channelQuery, 
           function(data) {
            
              $.each( data.items, function( i, item ) {
                  pid = item.contentDetails.relatedPlaylists.uploads;
                  getVids(pid);
              });
          }
        );

        //Get Videos
        function getVids(pid){
            var playlistItems = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults="+maxResults+"&playlistId="+pid+"&callback=?&key="+key;

            $.getJSON(
                playlistItems,
                function(data) {
                    var results ="";
                    var thumbnailsList = "<div class='thumbnails-container'><div class='thumbnails-list'>";
                    $.each( data.items, function( i, item ) {

                        var videoId = item.snippet.resourceId.videoId;
                        //change medium to "high" or "default" if needed
                        //Setting the thumbnails to medium will remove the bars on top/bottom of the bars
                        var thumbnail = item.snippet.thumbnails.medium.url;

                        var title = item.snippet.title;
                        
                         if (i == 0) {
                            results += "<div class='iframe-container'><iframe src='//www.youtube.com/embed/"+ videoId + "' allowfullscreen></iframe></div>";
                            thumbnailsList +="<div class='thumbnail'><a class='video video"+i+"' title=\""+title+"\" name='video' href='#' targetVid='"+ videoId +"'><img src='" + thumbnail + "' alt='"+title+"'></a></div>";
                        } else {
                            thumbnailsList +="<div class='thumbnail'><a class='video video"+i+"' title=\""+title+"\" name='video' href='#' targetVid='"+ videoId +"'><img src='" + thumbnail + "' alt='"+title+"'></a></div>";
                        }
                        
                    });
                    thumbnailsList += "</div></div>";
                    results += thumbnailsList;

                    $(results).appendTo('#video-player');

                    //GET THE TITLE FOR THE MAIN VIDE
                    //change the "#title" to the div you want to show the title 
                    // $("#title").text($('#video-player .video0').attr('title'));


                    $('a[name=video]').click(function(e) {
                        e.preventDefault();

                        var videoID = $(this).attr('targetVid');
                        var embedURL = "//www.youtube.com/embed/"

                        url = embedURL + videoID;

                        $("#video-player iframe").attr("src",url);

                        //$("#title").text($(this).attr('title'));
                    });

                    /*This is where the scroll widget is initiated. Add your options here. 
                    More details can be found on this website: http://kenwheeler.github.io/slick/ or 
                    on our intranet site. */
                    $('.thumbnails-list').slick({
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: true,
                        infinite: false
                    })
                }
            );
        }
    },

    /* 
        will just need a div with the ID of "instafeed" where you want the feed,
        uncomment the instafeed.min.js line in the Main.Master,
        and to call this function in the document.ready 

        If you need the first image from the instagram feed to have a different class
        (ie if you want it to have different styles), add the  addLargeClasstoInstagram() 
        function to in the window.load

    */
    getInsta: function() {
        var feed = new Instafeed({
            get: 'user',
            userId: '1111093104',
            accessToken: '1111093104.d22e066.3878962ac7584a66bdbda0a9d72d3649',
            limit: '12',
            template: '<a href="{{link}}" target="_blank" class="{{orientation}}"><div style="background-image:url({{image}});" class="instaimage" ></div></a>'
        });
        feed.run();

    }
}

$(document).ready(function() {
	home.getInsta();
});