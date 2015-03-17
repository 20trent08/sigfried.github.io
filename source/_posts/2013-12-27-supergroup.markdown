---
layout: post
title: "supergroup"
date: 2013-12-27 00:07:00 -0500
comments: true
categories: [repo]
source: https://github.com/Sigfried/supergroup
---


<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.js"></script>
<script src="https://rawgit.com/Sigfried/supergroup/master/supergroup.js"></script>
<script src="/supergroup/examples_gist/prism.js"></script>
<!-- more -->

{% capture my_include %}{% include README.md %}{% endcapture %}
{{ my_include | markdownify }}

Just to be clear about the problem&mdash;you start with tabular data from a CSV
file, a SQL query, or some AJAX call:
<p><span class="iframe">Some very fake hospital data in a CSV file...</span>
<iframe width="100%" height="70px" src="/supergroup/examples_gist/examples.html?data">
</iframe></p>

<p><span class="iframe">...turned into canonical array of Objects (using d3.csv, for instance)</span>
<iframe width="100%" height="80px" src="/supergroup/examples_gist/examples.html?json">
</iframe></p>

You group the records on the values of one or more fields with a standard
grouping function, giving you data like:

<p><span class="iframe">d3.nest().key(function(d) { return d.Physician; }).key(function(d) { return d.Unit; }).map(data)</span>
<iframe width="100%" height="150px" src="/supergroup/examples_gist/examples.html?d3map">
</iframe></p>
<p><span class="iframe">d3.nest().key(function(d) { return d.Physician; }).key(function(d) { return d.Unit; }).entries(data)</span>
<iframe width="100%" height="150px" src="/supergroup/examples_gist/examples.html?d3nest">
</iframe></p>

To my mind, these are awkward data structures (not to mention the awkwardness
of the calling functions.) The ```map``` version looks ok in the console, but
D3 wants data in arrays, not as objects. The ```entries``` version gives us
arrays of key/value pairs, but on upper levels ```values``` is another array of
key/value pairs while on the bottom level ```values``` is an array of records. In
both ```entries``` and ```map```, you can't tell from a node at any level what
dimension was being grouped at that level. 

Supergroup gives you almost everything you'd want for every item in your nest
(or in your single array if you have a one-level grouping):

  - An array of the values grouped on (could be strings, numbers, or dates) ([example](#sgphysunit))
  - The records associated with each group ([example](#records))
  - Information about the values at any level
    - Parent group if any
    - Immediate child groups if any
    - All descendant groups
    - Only descendant groups at the leaf level
    - Aggregate calculations on records for that group and its descendants
    - Path of group names from root to current group
    - Path of group dimension names from root to current group
  - Information about the groupings at any level
  - For a group at any level, the name of the dimension (attribute, column, property, etc.) grouped on
  - Any of these in a format D3 or some other tool expects
  
## Supergroup

  Works as an Underscore (or Lo-Dash) mixin: 
```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore.js"></script>
    <script src="https://rawgit.com/Sigfried/supergroup/master/supergroup.js"></script>
    <script>
        var sg = _.supergroup(data, dimension_name)  // single-level grouping
        var sg = _.supergroup(data, [dim1, dim2])  // multi-level grouping
    </script>
```

## Lists and Values

  ```_.supergroup``` returns an array of String or Number objects (Dates not yet
  implemented). Array elements represent the values grouped by. These Value 
  objects are loaded with lots of juicy properties and methods.

  In the example below we group by Physician and Unit. So ```_.supergroup```
  returns a list of physicians.  The first item in this list, ```sg[0]```,
  "Adams", is a String object. ```sg[0].records``` is an array containing the
  subset of original records where Physician="Adams".  ```sg[0].children```
  is another list of Strings. These are all the unique Units for records belonging
  to Adams. ```sg[0].children[0].records``` (not shown) would be the subset of
  records where Physician="Adams" and Unit="preop".

  <a id='sgphysunit'></a>
  <p><span class="iframe">Supergroup on physician and unit</span>
  <iframe width="100%" height="400px" src="/supergroup/examples_gist/examples.html?sgphysunit">
  </iframe></p>
  
