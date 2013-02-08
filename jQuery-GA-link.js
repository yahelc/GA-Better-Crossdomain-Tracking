jQuery.fn._link = function(domains, useHash) {
    var domain = location.hostname.split(".").slice( - 2).join(".");
    this.bind("click", function(e) {
        if (~jQuery.inArray(domain, domains) && domain != this.hostname.split(".").slice( - 2).join(".")) {
                $this = jQuery(this);
                _gaq.push(function() {
                    $this.attr('href',
                    function(i, old) {
                        return _gat._getTrackerByName()._getLinkerUrl(old, useHash);
                    });
                });
        }
    });
};
