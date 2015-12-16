function plot_all(csv_file, olx, oly, bg_dS, dT, plotname, xrange, yrange) {
    Plotly.d3.csv(csv_file, function (rows) {
        // get number of columns in CSV file:
        var dummy_x = rows.map(function (row) {          
            return row;
        });
        var ncolumns = 0
        for (x in dummy_x[0]) {
                ncolumns++;
        }
        var data = [];                          // array for storing trace data        
        var trace = {                           // first trace with no fill
            type: 'scatter',                    // set the chart type
            mode: 'lines',                      // connect points with lines
            showlegend: false,                  // don't show legend
            hoverinfo: 'none',                  // no hover text
            x: rows.map(function (row) {        // set the x-data
                return row['x'];
            }),
            y: rows.map(function (row) {        // set the y-data
                return row['y1'];               // y1 is the first column with y data
            }),
            line: {                             // set line properties
            width: 0.5,
            color: 'rgb(0,0,0)'
            }
        };
        data.push(trace);                       // add trace to 'data' array
        for (i = 2; i < ncolumns; i++) {        // rest of the traces, with area fills
            var trace = {
                type: 'scatter',                    // set the chart type
                mode: 'lines',                      // connect points with lines
                showlegend: false,
                hoverinfo: 'none',
                fill: 'tonexty',
                fillcolor: 'rgb(256,256,182)',      // yellow color for layer fill
                x: rows.map(function (row) {          // set the x-data
                    return row['x'];
                }),
                y: rows.map(function (row) {          // set the y-data
                    return row['y' + i.toString()] -
                    bg_dS * dT;                         // top of sandy layer
                }),
                line: {                             
                    width: 0.5,
                    color: 'rgb(0,0,0)'
                }
            };
            data.push(trace);
            var trace = {
                type: 'scatter',                    // set the chart type
                mode: 'lines',                      // connect points with lines
                showlegend: false,
                hoverinfo: 'none',
                fill: 'tonexty',
                fillcolor: 'rgb(185,105,2)',        // brown color for layer fill
                x: rows.map(function (row) {          // set the x-data
                    return row['x'];
                }),
                y: rows.map(function (row) {          // set the y-data
                    return row['y' + i.toString()];     // top of muddy (background) layer
                }),
                line: {                             
                    width: 1,
                    color: 'rgb(0,0,0)'
                }
            };
            data.push(trace);
        }
        
        // plot onlap points:
        var olpoints = {                            // first trace with no fill
            type: 'scatter',                        // set the chart type
            mode: 'markers',                        // connect points with lines
            showlegend: false,
            hoverinfo: 'none',
            x: olx,
            y: oly,
            marker: {
                size: '12',                             
                color: 'rgb(80, 120, 187)',
                line: {
                    color: 'rgb(0,0,0)',
                    width: '0.5'
                }
            }
        };
        data.push(olpoints);
        var layout = {
                title: plotname,
                yaxis: {
                    title: 'depth (m)',
                    range: yrange
                },            // set the y axis title
                xaxis: {
                    title: 'distance (m)',
                    range: xrange,
                    showgrid: true                  
                },
                margin: {                               // update the left, bottom, right, top margin
                    l: 60, b: 60, r: 30, t: 40
                }
        };
        Plotly.plot(document.getElementById(plotname), data, layout, {showLink: false});
    });
}
        
// ONLAP
var bg_dS = 0.0002                      // background sedimentation rate
var dT = 25000.0                        // time step
// data for onlap points (onlap):
var olx = [3200, 6800, 2825, 7175, 2600, 7400, 2425, 7575, 2300, 7700, 2175,
            7825, 2075, 7925, 2000, 8000, 1925, 8075, 1875, 8125];
var oly = [-450.23260814, -450.23260814, -360.19366811, -360.19366811,
            -305.06419197, -305.06419197, -262.42043583, -262.42043583,
            -231.51603732, -231.51603732, -201.57860922, -201.57860922,
            -177.39711363, -177.39711363, -158.48935052, -158.48935052,
            -140.00937789, -140.00937789, -126.26699213, -126.26699213];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/onlap.csv',olx,oly,bg_dS,dT,
          'onlap',[0, 10000],[-800, 100]);

// CONVERGENCE
var bg_dS = 0.0002                      // background sedimentation rate
var dT = 25000.0                        // time step
// data for onlap points (convergence):
var olx = [1275, 8725, 1275, 8725, 1275, 8725, 1275, 8725, 1275, 8725, 1275,
          8725, 1275, 8725, 1275, 8725, 1275, 8725, 1275, 8725, 1275, 8725,
          1275, 8725, 1275, 8725, 1275, 8725, 1275, 8725, 1275, 8725, 1275,
          8725, 1275, 8725, 1275, 8725];
var oly = [-127.37252165, -127.37252165, -122.37252165, -122.37252165,
          -117.37252165, -117.37252165, -112.37252165, -112.37252165,
          -107.37252165, -107.37252165, -102.37252165, -102.37252165,
          -97.37252165,  -97.37252165,  -92.37252165,  -92.37252165,
          -87.37252165,  -87.37252165,  -82.37252165,  -82.37252165,
          -77.37252165,  -77.37252165,  -72.37252165,  -72.37252165,
          -67.37252165,  -67.37252165,  -62.37252165,  -62.37252165,
          -57.37252165,  -57.37252165,  -52.37252165,  -52.37252165,
          -47.37252165,  -47.37252165,  -42.37252165,  -42.37252165,
          -37.37252165,  -37.37252165];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/convergence.csv',olx,oly,bg_dS,dT,
          'convergence',[0, 10000],[-800, 100]);

// VARIABLE SEDIMENT INPUT, CONSTANT SUBSIDENCE
var bg_dS = 0.0002                      // background sedimentation rate
var dT = 10000.0                        // time step
// data for onlap points (convergence):
var olx = [3700, 6300, 3225, 6775, 2825, 7175, 2450, 7550, 2125, 7875, 1825,
          8175, 1550, 8450, 1325, 8675, 1150, 8850, 1025, 8975,  950, 9050,
          950, 9050, 1600, 8400, 2250, 7750, 2925, 7075, 3750, 6250, 4125,
          5875, 3550, 6450, 3150, 6850, 2800, 7200, 2500, 7500, 2200, 7800,
          1975, 8025, 1750, 8250, 1550, 8450, 1425, 8575, 1325, 8675, 1275,
          8725, 1275, 8725, 1825, 8175, 2475, 7525, 3175, 6825, 4125, 5875,
          3900, 6100, 3400, 6600, 3025, 6975, 2700, 7300, 2400, 7600, 2125,
          7875, 1900, 8100, 1675, 8325, 1525, 8475, 1375, 8625, 1300, 8700,
          1275, 8725, 1375, 8625, 2025, 7975, 2700, 7300, 3450, 6550];
var oly = [-605.1787365 , -605.1787365 , -501.8524781 , -501.8524781 ,
          -409.19366811, -409.19366811, -324.70649553, -324.70649553,
          -256.89893911, -256.89893911, -200.72390017, -200.72390017,
          -155.39964838, -155.39964838, -122.63853543, -122.63853543,
          -99.59666856,  -99.59666856,  -84.06285395,  -84.06285395,
          -74.52101016,  -74.52101016,  -72.52101016,  -72.52101016,
          -130.29543127, -130.29543127, -210.84874996, -210.84874996,
          -311.40990264, -311.40990264, -431.26990899, -431.26990899,
          -471.96067866, -471.96067866, -399.88723763, -399.88723763,
          -338.24150903, -338.24150903, -281.6059089 , -281.6059089 ,
          -233.27934984, -233.27934984, -187.69535448, -187.69535448,
          -155.06977082, -155.06977082, -125.23535213, -125.23535213,
          -100.81209858, -100.81209858,  -85.78063246,  -85.78063246,
          -74.048875  ,  -74.048875  ,  -67.4120248 ,  -67.4120248 ,
          -65.4120248 ,  -65.4120248 ,  -95.6640046 ,  -95.6640046 ,
          -141.29656291, -141.29656291, -195.71887799, -195.71887799,
          -257.35191793, -257.35191793, -242.83116477, -242.83116477,
          -206.79281451, -206.79281451, -175.47385107, -175.47385107,
          -147.03917089, -147.03917089, -121.27088119, -121.27088119,
          -98.26863096,  -98.26863096,  -80.58015109,  -80.58015109,
          -63.900745  ,  -63.900745  ,  -52.88369088,  -52.88369088,
          -42.61861902,  -42.61861902,  -36.76640002,  -36.76640002,
          -33.4120248 ,  -33.4120248 ,  -32.57405531,  -32.57405531,
          -36.79133554,  -36.79133554,  -40.4377226 ,  -40.4377226 ,
          -41.85415522,  -41.85415522];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/var_sediment_const_subsid.csv',olx,oly,bg_dS,dT,
          'variable sediment input, constant subsidence'),[0, 10000],[-800, 100];

// VARIABLE SEDIMENT INPUT, CONSTANT SUBSIDENCE, BYPASS
var bg_dS = 0.0002                      // background sedimentation rate
var dT = 10000.0                        // time step
// data for onlap points (convergence):
var olx = [3450, 6550, 2825, 7175, 2275, 7725, 1725, 8275, 1175, 8825,  525,
          9475, 1400, 8600, 2425, 7575, 3500, 6500, 3950, 6050, 3250, 6750,
          2725, 7275, 2250, 7750, 1800, 8200, 1325, 8675,  850, 9150,  325,
          9675,  500, 9500, 1750, 8250, 2775, 7225, 3950, 6050, 3675, 6325,
          3050, 6950, 2550, 7450, 2100, 7900, 1625, 8375, 1175, 8825,  675,
          9325,  125, 9875,  975, 9025, 2100, 7900, 3100, 6900];
var oly = [-553.44006337, -553.44006337, -411.19366811, -411.19366811,
          -290.44748356, -290.44748356, -188.24621729, -188.24621729,
          -110.45124696, -110.45124696,  -49.36686807,  -49.36686807,
          -88.09205357,  -88.09205357, -211.39791452, -211.39791452,
          -371.80176301, -371.80176301, -427.44532157, -427.44532157,
          -330.6233491 , -330.6233491 , -247.88935942, -247.88935942,
          -176.19662639, -176.19662639, -116.17319218, -116.17319218,
          -65.04650157,  -65.04650157,  -25.95153949,  -25.95153949,
          3.62354636,    3.62354636,   16.36052725,   16.36052725,
          -35.09363796,  -35.09363796, -106.46856265, -106.46856265,
          -189.3162092 , -189.3162092 , -169.89862733, -169.89862733,
          -121.67553017, -121.67553017,  -80.55237529,  -80.55237529,
          -45.4184178 ,  -45.4184178 ,  -13.60915009,  -13.60915009,
          11.24466123,   11.24466123,   31.51338355,   31.51338355,
          46.84820476,   46.84820476,   57.08520287,   57.08520287,
          52.51491885,   52.51491885,   50.16427429,   50.16427429];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/var_sediment_const_subsid_bypass.csv',olx,oly,bg_dS,dT,
          'variable sediment input, constant subsidence, bypass',[0, 10000],[-800, 100]);

// BRAZOS-TRINITY BASIN 4
var bg_dS = 0.0001                      // background sedimentation rate
var dT = 1500.0                        // time step
// data for onlap points (convergence):
var olx = [ 4900, 10100,  4450, 10550,  4150, 10850,  3950, 11050,  3800,
          11200,  3650, 11350,  3550, 11450,  3450, 11550,  3350, 11650,
          3300, 11700,  3200, 11800,  3150, 11850,  3100, 11900,  3050,
          11950,  3000, 12000,  2950, 12050,  2950, 12050,  2900, 12100,
          2850, 12150,  2850, 12150,  2750, 12250,  2250, 12750,  1850,
          13150,  1500, 13500,  1250, 13750];
var oly = [-260.94666667, -260.94666667, -247.23666667, -247.23666667,
          -236.84666667, -236.84666667, -229.33666667, -229.33666667,
          -223.38666667, -223.38666667, -217.19666667, -217.19666667,
          -212.88666667, -212.88666667, -208.47      , -208.47      ,
          -203.94666667, -203.94666667, -201.57      , -201.57      ,
          -196.88666667, -196.88666667, -194.43      , -194.43      ,
          -191.94666667, -191.94666667, -189.43666667, -189.43666667,
          -186.9       , -186.9       , -184.33666667, -184.33666667,
          -184.18666667, -184.18666667, -181.59666667, -181.59666667,
          -178.98      , -178.98      , -178.83      , -178.83      ,
          -167.06666667, -167.06666667, -140.25      , -140.25      ,
          -116.84666667, -116.84666667,  -94.95      ,  -94.95      ,
          -78.46666667,  -78.46666667];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/magellan.csv',olx,oly,bg_dS,dT,
          'Brazos-Trinity Basin 4',[0, 15000],[-320, 20]);

// AUGER BASIN
var bg_dS = 0.0001                      // background sedimentation rate
var dT = 12000.0                        // time step
// data for onlap points (convergence):
var olx = [ 9400, 15600,  8200, 16800,  7200, 17800,  6300, 18700,  5400,
          19600,  4600, 20400,  3800, 21200,  3100, 21900,  2300, 22700,
          1700, 23300,  1100, 23900,   600, 24400,   300, 24700,   200,
          24800,  1300, 23700,  3300, 21700,  5100, 19900,  6800, 18200,
          8600, 16400,  9300, 15700,  8200, 16800,  7200, 17800,  6400,
          18600,  5600, 19400,  4900, 20100,  4200, 20800,  3500, 21500,
          2900, 22100,  2300, 22700,  1700, 23300,  1300, 23700,  1000,
          24000,   800, 24200,   800, 24200,  2800, 22200,  4700, 20300,
          6500, 18500,  8500, 16500,  9200, 15800,  8000, 17000,  7100,
          17900,  6200, 18800,  5300, 19700,  4500, 20500,  3700, 21300,
          3000, 22000,  2200, 22800,  1500, 23500,   800, 24200,   600,
          24400,   400, 24600,   200, 24800,   200, 24800,  2100, 22900,
          4300, 20700,  6300, 18700,  8300, 16700,  9000, 16000,  7800,
          17200,  6800, 18200,  5900, 19100,  5000, 20000,  4100, 20900,
          3200, 21800,  2200, 22800,  1300, 23700,   300, 24700,  1000,
          24000,  3800, 21200,  6000, 19000,  8200, 16800,  8900, 16100,
          7600, 17400,  6500, 18500,  5500, 19500,  4500, 20500,  3500,
          21500,  2400, 22600,  1200, 23800,  3000, 22000,  5500, 19500,
          7900, 17100,  8700, 16300,  7400, 17600,  6200, 18800,  5000,
          20000,  3900, 21100,  2600, 22400,  1100, 23900,  1800, 23200,
          5000, 20000,  7600, 17400,  8500, 16500,  7000, 18000,  5700,
          19300,  4300, 20700,  2900, 22100,  1100, 23900,  4100, 20900,
          7200, 17800,  8100, 16900,  6500, 18500,  4900, 20100,  3200,
          21800,  1000, 24000,  2300, 22700,  6500, 18500,  7600, 17400,
          5600, 19400,  3400, 21600,   500, 24500,  4800, 20200,  6300,
          18700,  3200, 21800];
var oly = [-2857.09127703, -2857.09127703, -2390.78230993, -2390.78230993,
          -1971.50979794, -1971.50979794, -1601.00307661, -1601.00307661,
          -1257.92756852, -1257.92756852,  -987.04063977,  -987.04063977,
          -753.92979941,  -753.92979941,  -582.08788211,  -582.08788211,
          -421.6121869 ,  -421.6121869 ,  -324.09009694,  -324.09009694,
          -244.28958423,  -244.28958423,  -189.57129429,  -189.57129429,
          -160.91030672,  -160.91030672,  -151.26978326,  -151.26978326,
          -247.4062083 ,  -247.4062083 ,  -547.01417607,  -547.01417607,
          -982.15701902,  -982.15701902, -1519.09993751, -1519.09993751,
          -2129.16179537, -2129.16179537, -2343.18483176, -2343.18483176,
          -1992.7396902 , -1992.7396902 , -1649.3084731 , -1649.3084731 ,
          -1377.04254477, -1377.04254477, -1120.02982467, -1120.02982467,
          -914.89381346,  -914.89381346,  -731.47015207,  -731.47015207,
          -573.05716706,  -573.05716706,  -456.11535709,  -456.11535709,
          -356.79808358,  -356.79808358,  -274.10669129,  -274.10669129,
          -227.0062083 ,  -227.0062083 ,  -195.11149019,  -195.11149019,
          -175.26796664,  -175.26796664,  -174.06796664,  -174.06796664,
          -377.6021828 ,  -377.6021828 ,  -707.0977278 ,  -707.0977278 ,
          -1138.74044114, -1138.74044114, -1674.55191066, -1674.55191066,
          -1845.27617643, -1845.27617643, -1538.28623328, -1538.28623328,
          -1293.00300181, -1293.00300181, -1052.93128713, -1052.93128713,
          -830.31975451,  -830.31975451,  -654.6094885 ,  -654.6094885 ,
          -502.79482264,  -502.79482264,  -391.21358555,  -391.21358555,
          -286.38706754,  -286.38706754,  -213.30799035,  -213.30799035,
          -154.86796664,  -154.86796664,  -136.39736491,  -136.39736491,
          -119.22874494,  -119.22874494,  -103.26978326,  -103.26978326,
          -102.06978326,  -102.06978326,  -221.72054187,  -221.72054187,
          -477.93843616,  -477.93843616,  -830.60190534,  -830.60190534,
          -1240.35692389, -1240.35692389, -1373.67711824, -1373.67711824,
          -1133.9481702 , -1133.9481702 ,  -925.3284842 ,  -925.3284842 ,
          -744.77512733,  -744.77512733,  -580.12338408,  -580.12338408,
          -437.55086903,  -437.55086903,  -318.76889662,  -318.76889662,
          -215.93980643,  -215.93980643,  -145.91806701,  -145.91806701,
          -90.21606549,   -90.21606549,   -96.92979664,   -96.92979664,
          -290.44856274,  -290.44856274,  -558.44383888,  -558.44383888,
          -887.48696389,  -887.48696389,  -985.51291361,  -985.51291361,
          -792.62792808,  -792.62792808,  -624.72986259,  -624.72986259,
          -481.5475252 ,  -481.5475252 ,  -355.36885856,  -355.36885856,
          -250.68897885,  -250.68897885,  -160.81342958,  -160.81342958,
          -91.41517772,   -91.41517772,  -146.01603146,  -146.01603146,
          -333.94930602,  -333.94930602,  -578.71811457,  -578.71811457,
          -657.64941878,  -657.64941878,  -521.89485601,  -521.89485601,
          -395.62445528,  -395.62445528,  -281.32693397,  -281.32693397,
          -193.30330548,  -193.30330548,  -113.59597045,  -113.59597045,
          -51.59146362,   -51.59146362,   -45.76933655,   -45.76933655,
          -173.73529531,  -173.73529531,  -338.35848849,  -338.35848849,
          -395.19600684,  -395.19600684,  -293.82129933,  -293.82129933,
          -208.32557885,  -208.32557885,  -129.50262757,  -129.50262757,
          -69.1747843 ,   -69.1747843 ,   -19.00300707,   -19.00300707,
          -52.4024897 ,   -52.4024897 ,  -155.16365534,  -155.16365534,
          -186.32314861,  -186.32314861,  -124.98727497,  -124.98727497,
          -69.07406768,   -69.07406768,   -23.30280391,   -23.30280391,
          12.89243033,    12.89243033,    25.278602  ,    25.278602  ,
          -25.19701532,   -25.19701532,   -40.73328802,   -40.73328802,
          -7.20033112,    -7.20033112,    21.83754984,    21.83754984,
          42.77431749,    42.77431749,    53.04102176,    53.04102176,
          50.18119015,    50.18119015,    61.32667884,    61.32667884];    
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/auger.csv',olx,oly,bg_dS,dT,
          'Auger Basin',[0, 25000],[-3600, 200]);

// CONSTANT SEDIMENT INPUT, VARIABLE SUBSIDENCE
var bg_dS = 0.0002
var dT = 20000.0
var olx = [1800, 8200, 1600, 8400, 1300, 8700,  800, 9200,  400, 9600,  300,
          9700, 1500, 8500, 1900, 8100, 1800, 8200, 1700, 8300, 1500, 8500,
          1200, 8800,  900, 9100,  700, 9300, 1300, 8700, 1800, 8200, 1900,
          8100, 1800, 8200, 1600, 8400, 1200, 8800,  900, 9100,  700, 9300,
          900, 9100, 1700, 8300];
var oly = [-204.52797534, -204.52797534, -168.80955742, -168.80955742,
          -123.47988871, -123.47988871,  -66.68789398,  -66.68789398,
          -33.2540153 ,  -33.2540153 ,  -23.40952731,  -23.40952731,
          -107.13963327, -107.13963327, -147.82031279, -147.82031279,
          -131.99828034, -131.99828034, -116.73853331, -116.73853331,
          -91.13963327,  -91.13963327,  -57.87656983,  -57.87656983,
          -30.04888458,  -30.04888458,  -12.95939418,  -12.95939418,
          -37.04562246,  -37.04562246,  -61.16176826,  -61.16176826,
          -63.15735122,  -63.15735122,  -53.16176826,  -53.16176826,
          -37.04972398,  -37.04972398,  -11.78109204,  -11.78109204,
          5.95259829,    5.95259829,   19.04060582,   19.04060582,
          17.24010527,   17.24010527,   14.21647551,   14.21647551];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/const_sediment_var_subsidence.csv',
          olx,oly,bg_dS,dT,'constant sediment input, variable subsidence',[0, 10000],[-800, 100]);

// VARIABLE SEDIMENT INPUT, VARIABLE SUBSIDENCE
var bg_dS = 0.0002
var dT = 10000.0
var olx = [3900, 6100, 3500, 6500, 3150, 6850, 2800, 7200, 2450, 7550, 2150,
          7850, 1750, 8250, 1400, 8600, 1000, 9000,  650, 9350,  450, 9550,
          450, 9550, 1800, 8200, 2600, 7400, 3250, 6750, 3950, 6050, 4250,
          5750, 3750, 6250, 3450, 6550, 3150, 6850, 2850, 7150, 2550, 7450,
          2300, 7700, 2000, 8000, 1750, 8250, 1550, 8450, 1350, 8650, 1250,
          8750, 1250, 8750, 2100, 7900, 2850, 7150, 3450, 6550, 4250, 5750,
          4050, 5950, 3650, 6350, 3350, 6650, 3050, 6950, 2750, 7250, 2500,
          7500, 2200, 7800, 1950, 8050, 1700, 8300, 1500, 8500, 1300, 8700,
          1250, 8750, 1450, 8550, 2350, 7650, 3050, 6950, 3700, 6300];
var oly = [-642.7245727 , -642.7245727 , -562.12970149, -562.12970149,
          -482.95023067, -482.95023067, -401.55581998, -401.55581998,
          -322.70649553, -322.70649553, -259.71689758, -259.71689758,
          -186.28887642, -186.28887642, -132.42402431, -132.42402431,
          -83.50146243,  -83.50146243,  -50.43995935,  -50.43995935,
          -34.38824453,  -34.38824453,  -32.38824453,  -32.38824453,
          -149.94865526, -149.94865526, -267.02948681, -267.02948681,
          -371.94316835, -371.94316835, -468.47794412, -468.47794412,
          -496.38206707, -496.38206707, -439.18431626, -439.18431626,
          -394.58664956, -394.58664956, -345.53896489, -345.53896489,
          -293.89566845, -293.89566845, -242.7496564 , -242.7496564 ,
          -200.75707012, -200.75707012, -154.67886802, -154.67886802,
          -119.49441612, -119.49441612,  -93.29681069,  -93.29681069,
          -69.71427153,  -69.71427153,  -57.89676945,  -57.89676945,
          -55.89676945,  -55.89676945, -113.97376824, -113.97376824,
          -178.30907523, -178.30907523, -228.00895099, -228.00895099,
          -276.05400076, -276.05400076, -263.97516935, -263.97516935,
          -236.7563353 , -236.7563353 , -211.64538962, -211.64538962,
          -183.76534339, -183.76534339, -154.92293473, -154.92293473,
          -130.0229073 , -130.0229073 , -102.22855479, -102.22855479,
          -79.71693683,  -79.71693683,  -59.02496128,  -59.02496128,
          -43.71166171,  -43.71166171,  -29.87658559,  -29.87658559,
          -23.89676945,  -23.89676945,  -27.3279105 ,  -27.3279105 ,
          -41.36128455,  -41.36128455,  -50.94084508,  -50.94084508,
          -54.47255544,  -54.47255544];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/var_sediment_var_subsidence.csv',olx,oly,bg_dS,dT,
          'variable sediment input, variable subsidence',[0, 10000],[-800, 100]);

// ON-OFF SEDIMENT INPUT
var bg_dS = 0.0002
var dT = 10000.0
var olx = [2825, 7175, 2400, 7600, 2100, 7900, 1875, 8125, 1675, 8325, 1525,
       8475, 1375, 8625, 2900, 7100, 2475, 7525, 2175, 7825, 1950, 8050,
       1775, 8225, 1625, 8375, 1475, 8525, 2900, 7100, 2475, 7525, 2175,
       7825, 1950, 8050, 1775, 8225, 1625, 8375, 1475, 8525];
var oly = [-399.19366811, -399.19366811, -304.16801866, -304.16801866,
       -242.12545015, -242.12545015, -199.26699213, -199.26699213,
       -164.31575118, -164.31575118, -139.77311586, -139.77311586,
       -117.11043621, -117.11043621, -298.87918827, -298.87918827,
       -230.97647766, -230.97647766, -185.96395104, -185.96395104,
       -154.47693793, -154.47693793, -131.42693831, -131.42693831,
       -112.77392358, -112.77392358,  -95.43275706,  -95.43275706,
       -180.47850035, -180.47850035, -142.70274316, -142.70274316,
       -117.35308586, -117.35308586,  -99.34585017,  -99.34585017,
        -85.91870751,  -85.91870751,  -74.87849952,  -74.87849952,
        -63.43275706,  -63.43275706];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/on_off_sediment_input.csv',olx,oly,bg_dS,dT,
          'on-off sediment input',[0, 10000],[-800, 100]);

// STATIC FILL AND SPILL
var bg_dS = 0.00015
var dT = 10000.0
var olx = [ 3200,  6800,  2775,  7225,  2475,  7525,  2225,  7775,  1975,
          8025,  1775,  8225,  1550,  8450,  1325,  8675,  1125,  8875,
          875,  9125,   650,  9350,   375,  9625,    50,  9950,    75,
          9925, 17300, 20700, 16850, 21150, 16525, 21475, 16275, 21725,
          16025, 21975, 15800, 22200, 15600, 22400, 15375, 22625];
var oly = [-488.23260814, -488.23260814, -390.43140807, -390.43140807,
          -323.02507581, -323.02507581, -269.93025874, -269.93025874,
          -220.94779128, -220.94779128, -184.88287674, -184.88287674,
          -148.39964838, -148.39964838, -102.63853543, -102.63853543,
          -77.2918033 ,  -77.2918033 ,  -50.3999463 ,  -50.3999463 ,
          -29.93995935,  -29.93995935,   -9.74071944,   -9.74071944,
          8.43299336,    8.43299336,   12.04729978,   12.04729978,
          -527.60358162, -527.60358162, -410.84336362, -410.84336362,
          -337.25514354, -337.25514354, -283.44748356, -283.44748356,
          -233.57846358, -233.57846358, -192.52797534, -192.52797534,
          -159.30955742, -159.30955742, -126.11043621, -126.11043621];
plot_all('https://raw.githubusercontent.com/zsylvester/minibasin-plot-data/master/data/static_fill_and_spill.csv',olx,oly,bg_dS,dT,
          'static fill and spill',[0, 24000],[-800, 100]);

// DYNAMIC FILL AND SPILL
var bg_dS = 0.00015
var dT = 10000.0
var olx = [ 1875,  8125,   900,  9100,  1975,  8025,  1100,  8900,   225,
          9775,  1975,  8025,  1100,  8900,   225,  9775, 17550, 20450,
          16350, 21650, 15750, 22250, 15275, 22725, 14850, 23150, 16725,
          21275, 16075, 21925, 15600, 22400, 15175, 22825, 16725, 21275,
          16075, 21925, 15600, 22400, 15175, 22825];
var oly = [-209.26699213, -209.26699213,  -78.22759001,  -78.22759001,
          -141.14926396, -141.14926396,  -50.81124207,  -50.81124207,
          -1.2517061 ,   -1.2517061 ,  -51.23083482,  -51.23083482,
          -1.50448008,   -1.50448008,   26.08498231,   26.08498231,
          -611.66453745, -611.66453745, -345.26843182, -345.26843182,
          -232.28887642, -232.28887642, -162.87252165, -162.87252165,
          -116.11775476, -116.11775476, -310.99341633, -310.99341633,
          -214.76102029, -214.76102029, -156.84973094, -156.84973094,
          -115.89891362, -115.89891362, -200.76040815, -200.76040815,
          -147.8342503 , -147.8342503 , -115.71097894, -115.71097894,
          -91.89891362,  -91.89891362];
plot_all('https://cdn.rawgit.com/zsylvester/minibasin-plot-data/master/data/dynamic_fill_and_spill.csv',olx,oly,bg_dS,dT,
          'dynamic fill and spill',[0, 24000],[-800, 100]);
