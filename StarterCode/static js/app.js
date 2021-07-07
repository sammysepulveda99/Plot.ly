// function for metadata selection
function buildMetadata(selection) {

    // reading the data from the JSON file
    d3.json("samples.json").then((sampledData) => {
        console.log(sampledData);

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
function buildCharts(selection) {

    // to read the data imported from json file
    d3.json("samples.json").then((sampledData) => {
        // console.log(sampleData);
        
        // identify the data 
        var parsedData = sampledData.samples;

        //filtering the data with item id
        var sample2 = parsedData.filter(item => item.id == selection)[0];
        //sample values for marker size
        var sampleValues = sample2.sample_values; 
        var barChartValues = sampleValues.slice(0, 10).reverse();
        //otu ids for color
        var idValues = sampleDict.otu_ids;
        var barChartLabels = idValues.slice(0, 10).reverse();
        
        var labels2 = [];
        barChartLabels.forEach((label) => {
                labels2.push("OTU " + label);
    
        });
        //otu labels for chart labels
        var hovertext = sampleDict.otu_labels;
        var barCharthovertext = hovertext.slice(0, 10).reverse();

        // creating our bar layout
        var barChartTrace = {
            type: "bar",
            y: labels2,
            x: barChartValues,
            text: barCharthovertext,
            orientation: 'h'
        };


        var barChartData = [barChartTrace];
        
        //plotly for chart type, layout and data
        Plotly.newPlot("bar", barChartData);


        //creating our bubbleChart
        var bubblechart1 = {
            x: idValues,
            y: sampleValues,
            text: hovertext,
            mode: "markers",
            marker: {
                color: idValues,
                size: sampleValues
            }
        };
        // bubble chart with all the layout
        var bubbleChartData = [bubblechart1];
        var bubblelayout = {
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: "OTU ID"
            }
        };
        //creating plotly, stating it is bubble and our layout
        Plotly.newPlot("bubble", bubbleChartData, bubblelayout);
    });

}

// running our page load with a function
function init() {
    // reading imported data
    d3.json("samples.json").then((sampledData) => {
        // console.log(sampleData);

        // identify and filter the data
        var parsedData = sampledData.names;
        //creating our drop down menu
        var dropdownMenu = d3.select("#selDataset");
        parsedData.forEach((name) => {
            dropdownMenu.append("option").property("value", name).text(name);
        })

        // to set the initial plots
        buildMetadata(parsedData[0]);
        buildCharts(parsedData[0]);

    });
}
// changing metadata with any new selection
function optionChanged(newSelection) {
    buildMetadata(newSelection); 
    buildCharts(newSelection);
}
// command to initialze dashboard
init();
