

d3.xhr('./fake-patient_data.csv', function(err, resp) {
    if (window.location.search === '?data') {
        d3.select('#output')
            //.text(JSON.stringify(data.response, null, 2))
            .text(resp.response);
    }
    var data = d3.csv.parse(resp.response);
    if (window.location.search === '?json') {
        d3.select('#output')
            .text(JSON.stringify(data).fixJSON('json'));
                //.replace(/{/g,'\n   {')
                //.replace(/]/,'\n]'))
    }
    if (window.location.search === '?sgphysunit') {
        var sg = _.supergroup(data, ['Physician','Unit']);
        d3.select('#output')
            .text(
                [
                "var sg = _.supergroup(data, ['Physician','Unit']);" +
                    '  // returns an Array of String objects representing top level group\n' +
                    '   ==>' + JSON.stringify(sg),
                'sg.leafNodes()\n   ==>' + 
                    JSON.stringify(sg.leafNodes()),
                'sg.flattenTree()\n   ==>' + 
                    JSON.stringify(sg.flattenTree()),
                '_(sg.leafNodes()).invoke("namePath")\n   ==>' + 
                    JSON.stringify(_(sg.leafNodes()).invoke("namePath"))
                ].join('\n\n'))
    }
    if (window.location.search === '?d3nest') {
        var physunitNest = d3.nest()
                        .key(function(d) { return d.Physician; })
                        .key(function(d) { return d.Unit; });
        d3.select('#output')
            .text(
                [
                //"var physunitNest = d3.nest()\n   .key(function(d) { return d.Physician; })\n   .key(function(d) { return d.Unit; });",
                //'physunitNest.entries(data) ==>' + 
                JSON.stringify(physunitNest.entries(data), null, 2).fixJSON('nest'),
                ].join('\n\n'))
    }
    if (window.location.search === '?d3map') {
        var physunitNest = d3.nest()
                        .key(function(d) { return d.Physician; })
                        .key(function(d) { return d.Unit; });
        d3.select('#output')
            .text(
                [
                //'physunitNest.map(data) ==>' + 
                JSON.stringify(physunitNest.map(data),null,2)//.fixJSON('nest'),
                ].join('\n\n'))
    }
    Prism.highlightAll();
});
String.prototype.fixJSON = function(which) {
    if (which === 'json')
        return this.replace(/{/g,'\n   {').replace(/]/,'\n]');
    if (which === 'nest')
        return this.replace(/,\n/g,', ').replace(/("key".*, )/g,'$1\n').replace(/,   */g,', ')
    return this;
};
