# Track Clicks
Get info on each user click on your website and pass that info to Google Analytics. 

## Getting Started
I have made it as simple as possible to start tracking website clicks on your Google Analytics account. First thing you have to do, is include your Google Analytics tracking script in the head of the page:

```
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('send', 'pageview');
</script>
```
For the next and final step, include the trackClicks.js script at the bottom of the page:

```
<script src="trackClicks.js"></script>
```
You are now tracking clicks on your website!

## What Is Being Tracked
Every time a user clicks anywhere on your website, the script examines the click and determines if anything of importance was clicked. These important elements include: links, buttons, images, and input elements. I determined these to be important elements because the user is able to interact with them.

The script gets information from the clicked element for you to able to identify that element. You will then be able to see how users are interacting with your site and be able to improve on the site's design if necessary.

## Author
Josan Iracheta

## License
MIT License
