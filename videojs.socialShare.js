/**
 * Video.js Social Share
 * Created by Justin McCraw
 * License information: https://github.com/jmccraw/videojs-socialShare/blob/master/LICENSE
 * Plugin details: https://github.com/jmccraw/videojs-socialShare
 */

(function(videojs) {
  'use strict';

  videojs.plugin('socialShare', function(opts) {
    opts = opts || {};
    var player = this;
    var _ss;
    var fbIcon = '<svg class="vjs-social-share-svg" xmlns="http://www.w3.org/2000/svg" role="presentation" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet"><path fill-rule="evenodd" clip-rule="evenodd" fill="#3E5C9B" d="M5.4 0h25.2c3 0 5.4 2.4 5.4 5.4v25.2c0 3-2.4 5.4-5.4 5.4h-25.2c-3 0-5.4-2.4-5.4-5.4v-25.2c0-3 2.4-5.4 5.4-5.4z"></path><path fill="#fff" d="M19.4 28v-9.2h4l.6-3.3h-4.6v-2.4c0-1.1.3-1.8 2-1.8h2.6v-3.1c-.4 0-1.1-.2-2.6-.2-3.1 0-5.7 1.8-5.7 5v2.5h-3.7v3.3h3.7v9.2h3.7z"></path></svg>';
    var twIcon = '<svg class="vjs-social-share-svg" xmlns="http://www.w3.org/2000/svg" role="presentation" width="36" height="36" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet"><path fill-rule="evenodd" clip-rule="evenodd" fill="#28A9E1" d="M5.4 0h25.2c3 0 5.4 2.4 5.4 5.4v25.2c0 3-2.4 5.4-5.4 5.4h-25.2c-3 0-5.4-2.4-5.4-5.4v-25.2c0-3 2.4-5.4 5.4-5.4z"></path><path fill="#fff" d="M28.2 12.3c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.5.7-2.4.9-.7-.7-1.7-1.2-2.8-1.2-2.1 0-3.8 1.7-3.8 3.8 0 .3 0 .6.1.9-3.1-.2-5.9-1.7-7.8-3.9-.3.6-.5 1.2-.5 1.9 0 1.3.7 2.5 1.7 3.1-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.3 3 3.7-.3.1-.6.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.5 2.6-1.3 1-2.9 1.6-4.7 1.6-.3 0-.6 0-.9-.1 1.7 1.1 3.6 1.7 5.8 1.7 6.9 0 10.7-5.7 10.7-10.7v-.5c.8-.4 1.5-1 2-1.8z"></path></svg>';
    var embedIcon = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 36 36" height="36" width="36" role="presentation" class="vjs-social-share-svg"><path fill-rule="evenodd" clip-rule="evenodd" fill="#666" d="M5.4 0h25.2c3 0 5.4 2.4 5.4 5.4v25.2c0 3-2.4 5.4-5.4 5.4h-25.2c-3 0-5.4-2.4-5.4-5.4v-25.2c0-3 2.4-5.4 5.4-5.4z"></path><path fill="#fff" d="m 15.110455,24.59026 -1.59668,1.611328 -9.8437499,-8.217774 9.8437499,-8.2177732 1.59668,1.6259762 -7.9833986,6.5625 7.9833986,6.635743 z"></path><path fill="#fff" d="m 21.24815,11.392017 1.582031,-1.6259762 9.84375,8.2177732 -9.84375,8.217774 -1.582031,-1.611328 7.983399,-6.577149 -7.983399,-6.621094 z" ></path></svg>';

    /**
     * Launches the Twitter Web Intent form in a new window
     * @type {function}
     */
    function launchTweet(e) {
      e.preventDefault();
      var twitter_url = 'http://twitter.com/intent/tweet' +
                        '?text=' + encodeURIComponent(opts.twitter.shareText ? opts.twitter.shareText : '') +
                        '&url=' + encodeURIComponent(opts.twitter.shareUrl ? opts.twitter.shareUrl : window.location.href)
 
      if (opts.twitter.handle !== '' && typeof opts.twitter.handle !== 'undefined') {
        twitter_url += '&via=' + opts.twitter.handle
      }

      window.open(
        twitter_url,
        'Share This Video to Twitter',
        'width=600,height=300,left=' + Math.ceil((window.innerWidth / 2) - 300) + ',top=' +
          Math.ceil((window.innerHeight / 2) - 127)
      );
    }

    /**
     * Launches the Facebook modal
     * @type {function}
     */
    function launchFacebook(e) {
      e.preventDefault();
      var url = opts.facebook.shareUrl ? opts.facebook.shareUrl : window.location.href;
      var fb_app_id = opts.facebook.app_id ? opts.facebook.app_id : '';
      if (fb_app_id == '') {
            if (!!document.querySelector('meta[property="fb:app_id"]')) {
                fb_app_id = document.querySelector('meta[property="fb:app_id"]').content;
            }
      }

      if (typeof FB !== 'undefined') {
        // assumes you have the proper og metadata filled out for your site
        FB.ui({
          method: 'share',
          href: url,
          picture: opts.facebook.shareImage ? opts.facebook.shareImage : '',
          name: '',
          caption: '',
          description: opts.facebook.shareText ? opts.facebook.shareText : ''
        }, function (response) {
        });
      } else if (fb_app_id !== '') {
        // since the FB object doesn't exist, try to scrape the page for og information and use a new window URL method
        window.open(
          'https://www.facebook.com/dialog/share' +
            '?app_id=' + fb_app_id +
            '&display=popup' +
            '&href=' + encodeURIComponent(url) +
            '&redirect_uri=' + encodeURIComponent(url),
          'Share This Video to Facebook',
          'width=600,height=300,left=' + Math.ceil((window.innerWidth / 2) - 300) + ',top=' +
            Math.ceil((window.innerHeight / 2) - 127)
        );
      } else {
        // Facebook isn't implemented properly in your site's metadata, so we'll just hide this element
        // a little jarring, but better than failing, perhaps
        this.style.display = 'none';
      }
    }

    var _embed_window = null;
    function launchEmbed(e) {
      e.preventDefault();

      if (_embed_window === null) {
        _embed_window = document.createElement('div');
        _embed_window.className = 'embed-window';
        _embed_window.innerHTML = '<input type="text" name="embed-code" class="embed-code" readonly="readonly"><br /><button id="btn-copy">Copy</button>';

        var embed_close = document.createElement('div');
        embed_close.className = "embed-window-close";
        embed_close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><path fill="#fff" id="path9812" d="m 3.9425039,20.057495 c -4.45165455,-4.451654 -4.45165455,-11.6633357 0,-16.1149908 4.4516552,-4.45165472 11.6633371,-4.45165472 16.1149911,0 4.451656,4.4516551 4.451656,11.6633368 0,16.1149908 -4.451654,4.451656 -11.6633359,4.451656 -16.1149911,0 z M 18.054251,5.9457492 c -3.338741,-3.3387414 -8.7697602,-3.3387414 -12.1085023,0 -3.338741,3.338741 -3.338741,8.7697618 0,12.1085018 3.3387421,3.338741 8.7697613,3.338741 12.1085023,0 3.338741,-3.33874 3.338741,-8.7697608 0,-12.1085018 z M 8.9728744,17.030371 6.9696295,15.027126 9.996756,12 6.9696295,8.9728742 8.9728744,6.9696296 12.000001,9.9967548 15.027127,6.9696296 17.030371,8.9728742 14.003246,12 l 3.027125,3.027126 -2.003244,2.003245 -3.027126,-3.027126 z" /></svg>';

        embed_close.onclick = launchEmbed;
        _embed_window.insertBefore(embed_close, _embed_window.firstChild);

        var embed_title = document.createElement('span');
        embed_title.className = 'embed-window-title';
        embed_title.innerHTML = 'Embed Video';
        _embed_window.insertBefore(embed_title, _embed_window.firstChild);

        player.el().appendChild(_embed_window);

        var el_btn = _embed_window.getElementsByTagName('button')[0];
        el_btn.addEventListener('click', function(event) {
          var el_input = _embed_window.getElementsByTagName('input')[0];
          el_input.focus ();
          el_input.setSelectionRange (0, opts.embed.embedMarkup.length);

          var result = false;
          try {
            result = document.queryCommandSupported('copy');
            if (result) {
                console.log ("copy is supported");
            } else {
                console.log ("copy is not supported");
            }
            result = document.execCommand('copy');
          }
          catch (err) {
            result = false;
          }

          if (result) {
            console.log('copied embed code to clipboard.');
          } else {
            console.log('unable to copy embed code to clipboard.');
          }

          _embed_window.style.display = 'none';
        });
      }

      if (_embed_window.style.display === 'block') {
        _embed_window.style.display = 'none';
      } else {
        var el_input = _embed_window.getElementsByTagName('input')[0];
        el_input.value = opts.embed.embedMarkup;
        el_input.setSelectionRange (0, opts.embed.embedMarkup.length);

        _embed_window.getElementsByTagName('input')[0].value = opts.embed.embedMarkup;
        _embed_window.style.display = 'block';
      }
    }

    /**
     * Generate the DOM elements for the social share tool
     * @type {function}
     */
    function constructSocialShareContent() {
      var _frag = document.createDocumentFragment();
      var _aside = document.createElement('aside');
      var _button;

      var channel = '';
      for (channel in opts) {
        switch (channel) {
          case 'twitter':
            _button = document.createElement('a');
            _button.className = 'vjs-social-share-link';
            _button.setAttribute('data-network', 'twitter');
            _button.innerHTML = twIcon;
            _button.addEventListener('click', launchTweet, false);
            _aside.appendChild(_button);
            break;

          case 'facebook':
            _button = document.createElement('a');
            _button.className = 'vjs-social-share-link';
            _button.setAttribute('data-network', 'facebook');
            _button.innerHTML = fbIcon;
            _button.addEventListener('click', launchFacebook, false);
            _aside.appendChild(_button);
            break;

          case 'embed':
            _button = document.createElement('a');
            _button.className = 'vjs-social-share-link';
            _button.setAttribute('data-network', 'embed');
            _button.innerHTML = embedIcon;
            _button.addEventListener('click', launchEmbed, false);
            _aside.appendChild(_button);
            break;

          default:
            if ((typeof opts[channel].iconsvg !== 'undefined')
                && (typeof opts[channel].callback === 'function')) {
                var network = 'custom';

                if (typeof opts[channel].network !== 'undefined') {
                    network = opts[channel].network;
                }

                _button = document.createElement('a');
                _button.className = 'vjs-social-share-link';
                _button.setAttribute('data-network', network);
                _button.innerHTML = opts[channel].iconsvg;
                _button.addEventListener('click', function(e) {
                  opts[channel].callback (e);
                }, false);
                _aside.appendChild(_button);
            }
            break;
        }
      }

      // remove previously created elements (e.g. the user calls the plugin multiple
      // times as videos are changed out)
      var el = player.el().querySelector('.vjs-social-share');
      if (el) {
        el.remove ();
      }

      _aside.className = 'vjs-social-share';
      _ss = _aside;
      _frag.appendChild(_aside);

      player.el().appendChild(_frag);
    }

    // attach VideoJS event handlers
    player.on('mouseover', function() {
      // on hover, fade in the social share tools
      if (typeof _ss !== 'undefined') {
          _ss.classList.add('is-visible');
      }
    });

    player.on('mouseout', function() {
      // when not hovering, fade share tools back out
      if (typeof _ss !== 'undefined') {
          _ss.classList.remove('is-visible');
      }
    });

    player.ready(function() {
      if (opts.facebook || opts.twitter) {
        constructSocialShareContent();
      }
    });

  });
}(window.videojs));
