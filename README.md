Better Google Analytics Cross-domain Tracking
==============

A safe, simple alternative to GA's recommended _link function that breaks pages. 

<h2>The Problem</h2>

Google Analytics uses first party cookies. As a result, sites that want to track across top-level domains (say, your-site.com to yoursite.shopify.com) aren't able to. Google Analytics provides a function called `_link` that works around this problem by appending the cookies from the first domain onto the URL when the user transfers from one site to another. 

The recommended method here looks like:

    <a href="https://your-ecommerce-site.com" onclick="_gaq.push(["_link]); return false">Give us your money</a>
    
<h2>Why this is destructive</h2> 

What GA is doing here is completely interrupting your click action -- that's what `return false` means. It then, on its own, grabs the information from the link, appends the cookie information to the URL, and does a `window.location` redirect to that URL. 

This means a few things:

  - If GA fails to load (the user blocks GA, GA's servers are down or slow to respond, etc), `_gaq.push(["_link"]);` just adds an array containing the string `_link` to the `_gaq` array, which is meaningless. Your user clicks the link, and nothing happens. 
  - The user gets a diminished user experience; if they try to force the link to open in a new window, it won't. 
  - If the site's GA isn't properly configured, it breaks. 
  - You need to manually add this `onclick` handler to each link you wish to track, which is a maintenance nightmare. 

<h2>The alternative</h2>

This plugin helps manage all of your cross-domain tracking code in one place, without any of the safety pitfalls listed above.

  - Fails silently if GA is blocked or fails to load; links continue to work just normally.
  - Doesn't interrupt or override a user's click.

<h2>Usage</h2>

Here's an example usage. You have 3 domains, and you'd like the traffic between the 3 domains to be tracked seamlessly for any link between them. So, you'd do:

        $("a,area").filter("[href^='http']")._link(["yourdomain1.com", "yourdomain2.com", "yourdomain3.com"]);
        
        
<h3>I don't want to use GA's _link, but I don't need jQuery and your plugin is too complex</h2>

You can still use an onclick handler to do your cross domain tracking. It would look like this:

    onclick="if(window._gat){this.href= _gat._getTrackerByName()._getLinkerUrl(this.href);};"


