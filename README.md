# Citations for bicyclists and drivers in bike paths

TICKET: https://tribune.unfuddle.com/a#/projects/60/tickets/by_number/198
Analysis of bike citation records that transportation reporter Mary Wisniewski acquired through a FOIA. 

Data came from 2 sources:  
**Citations for riding a bike on a sidewalk** came from a PDF called FOIA-P056024-ANOVsBicycleData.pdf. Jen Smith-Richards converted this to pdf for me using Acrobat Pro's convert-to-excel feature. I tried this on my machine and it continuously crashed.   The addresses in the file were reduced to the block level, with X's in the address in place of exact locations. 82 entries had a street address of 'unknown.'  
**Citations for parking in a bike lane** came from a txt file called A50676 - FOIA - Tribune - Park.txt. I converted this to csv using excel. Included in the file was also citations for missing head lamps, which I deleted.  Exact addresses were included on all records.  

RECORD COUNT
--------------------
Bikes on a sidewalk:  16,593 total records  
Parking on a bike path: 6,918 total records  

GEOCODING
----------------
I geocoded these files using a geocoder that Cecilia Reyes provided, included in the files on this ticket. The geocoder placed addresses that failed at the city centroid. After running the geocoder once, I pulled these locations out and manually fixed the address. The vast majority of the time the address was entered wrong, such as "MLK Dr" for King Dr, or Cottage for Cottage Grove Drive. If I was unable to confidently ascertain the correct address, I left it as-is. After running through the failed addresses, I fed them back into the geocoder. I then replaced the centroid location with the updated, second location. If the location again came back with a centroid location, I deleted the coordinates from the spreadsheet.  

**Geocoding error counts for both datasets**  
Citations for riding a bike on a sidewalk:   
16,339 geocoded correctly  
579 either was entered as 'unknown street', failed to geocode, or geocoded to a point outside the city  

Parking on a bike path:  
6,841 geocoded correctly  
22 failed to geocode  
55 geocoded outside the city  

Here is the centroid of the city, indicating a failed address: [41.8842506409, -87.6324462891]


ANALYSIS
-----------
**Initial mapping**  
On Jan 24 I sent Mary maps showing the locations of each dataset, along with choropleths with the citation totals by Chicago community area.  I did this in ArcGIS.

**Neighborhood counts**  
On Jan 31 I sent Mary spreadsheets showing citations by Chicago community area, ranking the areas from highest to lowest. I did this by exporting the shapefiles I used to roll up the citations in a spatial join.  

**Neighborhoods over time**  
On Feb. 14 Mary requested I analyze the community areas again, showing 





A [Tarbell](http://tarbell.io) project that publishes to a P2P HTML Story.

Assumptions
-----------

* Python 2.7
* Tarbell 1.0.\*
* Node.js
* grunt-cli (See http://gruntjs.com/getting-started#installing-the-cli)

Custom configuration
--------------------

You should define the following keys in either the `values` worksheet of the Tarbell spreadsheet or the `DEFAULT_CONTEXT` setting in your `tarbell_config.py`:

* p2p\_slug
* headline 
* seotitle
* seodescription
* keywords
* byline

Note that these will clobber any values set in P2P each time the project is republished.  

Building front-end assets
-------------------------

This blueprint creates configuration to use [Grunt](http://gruntjs.com/) to build front-end assets.

When you create a new Tarbell project using this blueprint with `tarbell newproject`, you will be prompted about whether you want to use [Sass](http://sass-lang.com/) to generate CSS and whether you want to use  [Browserify](http://browserify.org/) to bundle JavaScript from multiple files.  Based on your input, the blueprint will generate a `package.json` and `Gruntfile.js` with the appropriate configuration.

After creating the project, run:

    npm install

to install the build dependencies for our front-end assets.

When you run:

    grunt

Grunt will compile `sass/styles.scss` into `css/styles.css` and bundle/minify `js/src/app.js` into `js/app.min.js`.

If you want to recompile as you develop, run:

    grunt && grunt watch

This blueprint simply sets up the the build tools to generate `styles.css` and `js/app.min.js`, you'll have to explicitly update your templates to point to these generated files.  The reason for this is to make you think about whether you're actually going to use an external CSS or JavaScript file and avoid a request for an empty file if you don't end up putting anything in your custom stylesheet or JavaScript file.

To add `app.min.js` to your template file:

    
    <script src="js/app.min.js"></script>
    