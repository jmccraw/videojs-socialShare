# videojs-socialShare
Adds social sharing buttons to the video widget for Facebook and Twitter.
____

### Purpose
Share your embeded video URL directly from the unit itself. This plugin adds a Facebook and Twitter (more possible) widget to your player to share the page URL without having to scroll to your page’s own share tools.

![Suggested Social Share Screenshot](TKTK)

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
    facebook: {
      shareUrl: '', // optional 
      shareImage: '',
      shareText: ''
    },
    twitter: {
      handle: '',
      shareUrl: '',
      shareText: ''
    }
  });
</script>
```

### Notes
Let me know if you run into any bugs or recommendations.