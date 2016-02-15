# videojs-socialShare
Adds social sharing buttons to the video widget for Facebook and Twitter.
____

### Purpose
Share your embeded video URL directly from the unit itself. This plugin adds a Facebook and Twitter (more possible) widget to your player to share the page URL without having to scroll to your page’s own share tools.

![Suggested Social Share Screenshot](https://lh3.googleusercontent.com/-Lm8716TKNAI/Vo2K97wnD5I/AAAAAAAAGOs/xWGffoJrwYI/s800-Ic42/videojs-socialshare.png)

### Usage
This plugin requires [Video.js](https://github.com/videojs/video.js) and was created with version 5.4.4.

It also uses [flexbox](http://caniuse.com/flexbox).

1. Install [Video.js](https://github.com/videojs/video.js)
2. Add the [videojs-socialShare](https://github.com/jmccraw/videojs-socialShare/blob/master/videojs.socialShare.css) CSS to your page
3. Add the [videojs-socialShare](https://github.com/jmccraw/videojs-socialShare/blob/master/videojs.socialShare.js) JavaScript to your page
4. Initialize the plugin with some social sharing information in JSON format
5. Test to see that the social sharing tools appear

### Example
Below is a sample use case. Feel free to add the videojs-socialShare CSS/JS to your own project how you see fit. Separated here as an example.

```html
<link rel="stylesheet" href="videojs-socialShare.css">
<video id="my-video" data-setup="{}" preload="auto" controls">
  <source src="my-video.mp4">
  <source src="my-video.webm">
</video>
<script src="videojs-socialShare.js"></script>
<script>
  'use strict';
  
  var video = videojs('my-video');
  video.socialShare({
    facebook: { // optional, includes a Facebook share button (See the [Facebook documentation](https://developers.facebook.com/docs/sharing/reference/share-dialog) for more information)
      shareUrl: '', // optional, defaults to window.location.href
      shareImage: '', // optional, defaults to the Facebook-scraped image
      shareText: '',  // optional
      app_id: '', // optional, facebook app_id to use (if not specified, the plugin will try to 
                  // use an existing FB Javascript object, or it will try to scrape the app_id from the 
                  // <meta property="fb:app_id"> element in the document
    },
    twitter: { // optional, includes a Twitter share button (See the [Twitter documentation](https://dev.twitter.com/web/tweet-button/web-intent) for more information)
      handle: '', // optional, appends `via @handle` to the end of the tweet 
      shareUrl: '', // optional, defaults to window.location.href
      shareText: '' 
    },
    embed: { // optional, includes an embed code button
      embedMarkup: 'YOURMARKUPHERE' // required
    }
  });
</script>
```

The order in which the options are listed in the configuration object governs
the order in which the buttons will appear.

You can also specify additional sharing mechanisms.  These are specified with 
an icon (in SVG format) and a callback function, as shown below:

```html
<script>
  'use strict';
  
  var video = videojs('my-video');
  video.socialShare({
    email: { 
      iconsvg: '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 36 36" height="36" width="36" role="presentation" class="vjs-social-share-svg"><path fill="#759e26" clip-rule="evenodd" fill-rule="evenodd" d="M5.4 0h25.2c3 0 5.4 2.4 5.4 5.4v25.2c0 3-2.4 5.4-5.4 5.4h-25.2c-3 0-5.4-2.4-5.4-5.4v-25.2c0-3 2.4-5.4 5.4-5.4z" /><path style="fill:#ffffff" d="m 28.278854,15.149222 0,9.114453 c 0,0.481822 -0.160607,0.923492 -0.521972,1.284858 -0.361366,0.361366 -0.803036,0.521973 -1.325009,0.521973 l -16.8637459,0 c -0.5219722,0 -0.9636407,-0.160607 -1.3250063,-0.521973 C 7.8817529,25.187167 7.7211456,24.745497 7.7211456,24.263675 l 0,-9.114453 c 0.3212146,0.361369 0.7227335,0.68258 1.164402,1.003795 2.7704734,1.887135 4.6576064,3.171991 5.7015514,3.934875 0.441671,0.321215 0.803037,0.602276 1.043946,0.762883 0.281064,0.160607 0.642429,0.361365 1.084099,0.562124 0.48182,0.160607 0.883339,0.281063 1.284856,0.281063 l 0,0 c 0.401519,0 0.803036,-0.120456 1.284858,-0.281063 0.441668,-0.200759 0.803036,-0.401517 1.084097,-0.562124 0.240911,-0.160607 0.602277,-0.441668 1.043945,-0.762883 1.325009,-0.923492 3.212142,-2.248501 5.701553,-3.934875 0.44167,-0.321215 0.843187,-0.642426 1.164401,-1.003795 z m 0,-3.372749 c 0,0.602278 -0.200758,1.164402 -0.562124,1.726528 -0.361365,0.562124 -0.843186,1.003795 -1.405313,1.405312 -2.850774,2.007588 -4.657605,3.252293 -5.380336,3.734114 -0.04015,0.04015 -0.240912,0.160608 -0.481822,0.361366 -0.240912,0.160607 -0.44167,0.321215 -0.602277,0.441671 -0.160607,0.0803 -0.361366,0.200758 -0.602275,0.361365 -0.240913,0.120456 -0.441671,0.24091 -0.642429,0.321215 -0.240913,0.04015 -0.40152,0.0803 -0.602278,0.0803 l 0,0 c -0.200759,0 -0.361366,-0.04015 -0.602275,-0.0803 -0.200761,-0.0803 -0.401519,-0.200759 -0.64243,-0.321215 -0.240911,-0.160607 -0.44167,-0.281063 -0.602277,-0.361365 C 15.992411,19.325008 15.791653,19.1644 15.550743,19.003793 15.309831,18.803035 15.109072,18.682579 15.068921,18.642427 14.34619,18.160606 13.342395,17.437874 12.057538,16.554536 10.732529,15.631044 9.9696464,15.109071 9.6885833,14.908313 9.2067622,14.587098 8.7650937,14.145427 8.3635747,13.583303 7.921907,13.021179 7.7211456,12.499207 7.7211456,12.017385 c 0,-0.602278 0.1606073,-1.084097 0.4818218,-1.485616 C 8.524182,10.130252 8.965852,9.9294937 9.5681271,9.9294937 l 16.8637459,0 c 0.521973,0 0.923492,0.2007583 1.284857,0.5621233 0.361366,0.361366 0.562124,0.762883 0.562124,1.284856 z" /></svg>',
      callback: function (e)
      {
        // implement the actual sharing here...
        alert ("you clicked the share via email button!");
      }
    }
  });
</script>
```

You can use any legal Javascript property name you want for these additional
sharing options; you just can't use any of the pre-defined names (facebook,
twitter, embed).

### Notes
For Facebook to work to the best of its ability, you need to have implemented the Facebook SDK or at least the og metadata, include the `fb:app_id`.

You should also style this to work across viewports, since this is only a cursory example for desktop, although it'll probably work fine on smaller screens. It also doesn't have a fallback for mobile, for example, appearing under or over the video itself, since it appears on hover and mobile devices don't do that.

Let me know if you run into any bugs or recommendations.
