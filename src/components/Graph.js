import { useState, useEffect } from "react"
import * as d3 from "d3";


export default function Graph(props) {
    const [rngNumber, setRngNumber] = useState(0);
    const [rngArray, setRngArray] = useState([]);
    const maxItems = 50;
    const timeOut = 100;
    const maxValue = 0.7; // Pretending to be gain so its normally between 0 and 1

    // Everytime the D3 data is changed reset the number.
    useEffect(() => {
            setRngNumber(props.value);
    }, [props.value]);

    // Is this the "proper" way to do it?
    const LogToNum = (input) => {
        let number = 0;
        if (!input || input.length === 0) { return 0 };
        var stringArray = input.split(/(\s+)/);
        for (const item of stringArray) {
            if (item.startsWith('room:')) {
                let val = item.substring(5);
                number = Number(val);
            }
        }
        return number;
    };

    useEffect(() => {
        let tempArray = [...rngArray, rngNumber]
        if (tempArray.length > maxItems) { tempArray.shift() }
        setRngArray(tempArray)
    }, [rngNumber]);

    useEffect(() => {
        // 1. Select SVG element
        const svg = d3.select('svg');
        svg.selectAll("*").remove()

        // 2. Set the size of the SVG element
        let w = svg.node().getBoundingClientRect().width;
        w = w - 40
        let h = svg.node().getBoundingClientRect().height;
        h = h - 25

        // Calculating graph bar dimentions
        // const barMargin = 10;
        const barWidth = w / rngArray.length;

        // Calculate yScale
        let yScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        // Create chartGroup element
        let chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', `translate(30,4)`);


        // Set gradient
        // Code from https://d3-graph-gallery.com/graph/line_color_gradient_svg.html and week 12 practical.
        chartGroup
            .append('linearGradient')
            .attr("id", "line-gradient")
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(maxValue))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "green" },
                { offset: "100%", color: "red" }
            ])
            .enter().append("stop")
            .attr("offset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });

        // console.log("rngArray: ", rngArray)
        // Draw lines
        chartGroup
            .append('path')
            .datum(rngArray.map((d) => LogToNum(d) ))
            .attr('fill', 'none')
            .attr('stroke', "url(#line-gradient)")
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x((data, index) => index * barWidth)
                .y((data) => yScale(data))
            )

        // create the axis and add it to the svg
        // append the y-axis to the chartgroup
        let yAxis = d3.axisLeft(yScale); // declare the axis generator
        chartGroup.append('g')
            .classed('axis y', true)
            .call(yAxis);

    }, [rngArray]);

    return (
        <svg width="100%" height="100%" class="rounded success-blue p-2"></svg>
    )
}