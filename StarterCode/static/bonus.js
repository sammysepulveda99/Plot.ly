// function for metadata selection
function buildMetadata2(selection) {

    // reading the data from the JSON file
    d3.json("samples.json").then((sampledData) => {
       // console.log(sampledData);

        // identify data as metadata
        var parsedData = sampledData.metadata;
        //fo;tering out our data with item id
        var sample = parsedData.filter(item => item.id == selection);

        //Using the d3 select for our metadata for html and object entries
        var metadata = d3.select("#sample-metadata").html("");
        Object.entries(sample[0]).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });
    

    });


}


// function to create charts for the smaples
// function buildCharts2(selection) {

    // // to read the data imported from json file
    // d3.json("samples.json").then((sampledData) => {
    //     // console.log(sampledData);
        
    //     // identify the data 
    //     var parsedData = sampledData.samples;

    //     //filtering the data with item id
    //     var sample2 = parsedData.filter(item => item.id == selection)[0];
    //     //sample values for marker size
    //     var sampleValues = sample2.sample_values; 
    //     //var gaugeValues = sample2.wfreq;
    //     var barChartValues = sampleValues.slice(0, 10).reverse();
    //     //otu ids for color
    //     var idValues = sample2.otu_ids;
    //     var barChartLabels = idValues.slice(0, 10).reverse();
        
    //     var labels2 = [];
    //     barChartLabels.forEach((label) => {
    //             labels2.push("OTU " + label);
    
    //     });
    //     //otu labels for chart labels
    //     var hovertext = sample2.otu_labels;
    //     var barCharthovertext = hovertext.slice(0, 10).reverse();

        // // creating our bar layout
        // var barChartTrace = {
        //     type: "bar",
        //     y: labels2,
        //     x: barChartValues,
        //     text: barCharthovertext,
        //     orientation: 'h',
        // };
        // var barCHartLayout = {
        //     title: "Top 10 Bacteria Cultures Found",
        // }

        // var barChartData = [barChartTrace];
        
        // //plotly for chart type, layout and data
        // Plotly.newPlot("bar", barChartData,barCHartLayout);


        // //creating our bubbleChart
        // var bubblechart1 = {
        //     x: idValues,
        //     y: sampleValues,
        //     text: hovertext,
        //     mode: "markers",
        //     marker: {
        //         color: idValues,
        //         size: sampleValues
        //     }
        // };
        // // bubble chart with all the layout
        // var bubbleChartData = [bubblechart1];
        // var bubblelayout = {
        //     title: "Bacteria Cultures per Sample",
        //     showlegend: false,
        //     height: 600,
        //     width: 1000,
        //     xaxis: {
        //         title: "OTU ID"
        //     },
        
        // };
        // //creating plotly, stating it is bubble and our layout
        // Plotly.newPlot("bubble", bubbleChartData, bubblelayout);
//     });

// }
// function to create charts for the smaples
function buildCharts2(selection1) {
// to read the data imported from json file
d3.json("samples.json").then((sampledData) => {
    // console.log(sampledData);
    
    // identify the data 
    var parsedData = sampledData.samples;

    //filtering the data with item id
    var sample2 = parsedData.filter(item => item.id == selection1)[0];
var gaugeValues = sample2.wfreq;

//Gauge Chart
var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: gaugeValues,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 380 },
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "red" },
          {range: [1, 2], color: "orange" },
          {range: [2, 3], color: "yellow" },
          {range: [3, 4], color: "green" },
          {range: [4, 5], color: "blue" },
          {range: [5, 6], color: "purple" },
          {range: [6, 7], color: "cyan" },
          {range: [7, 8], color: "grey" },
          {range: [8, 9], color: "lightgray" }
        ],
        threshold: {
          line: { color: "white", width: 4 },
          thickness: 0.75,
          value: gaugeValues
        }
      }
    }
  ];
  
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
})}
// running our page load with a function
function init() {
    // reading imported data
    d3.json("samples.json").then((sampledData) => {
        // console.log(sampledData);

        // identify and filter the data
        var parsedData = sampledData.names;
        //creating the drop down menu
        var dropdownMenu = d3.select("#selDataset");
        parsedData.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

        // to set  initial plots
        buildMetadata2(parsedData[0]);
        buildCharts2(parsedData[0]);

    });
}
//console.log(sampledData)
// changing metadata with any new selection
function optionChanged(newSelection) {
    buildMetadata2(newSelection); 
    buildCharts2(newSelection);
}
// command to initialze dashboard
init();
