import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useEmployee from "../hooks/useEmployee";

const BarChartNames: React.FC = () => {
  const { employees, error, isLoading } = useEmployee();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // console.log(employees);
    if (!employees) return;
    // console.log(employees);

    const data = employees.map((employee) => ({
      name: employee.employee_name,
      age: parseInt(employee.employee_age),
      salary: parseInt(employee.employee_salary),
    }));

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.salary)!])
      .range([height - margin.bottom, margin.top]);

    const svg = d3.select(svgRef.current);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name)!)
      .attr("y", (d) => yScale(d.salary))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d.salary))
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        const containerElement = document.getElementById("chart-container");
        if (containerElement) {
          const containerPosition = containerElement.getBoundingClientRect();
          const left = event.pageX - containerPosition.left;
          const top = event.pageY - containerPosition.top - 28;
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`${d.name}<br/>Age: ${d.age}<br/>Salary: ${d.salary}`)
            .style("left", left + "px")
            .style("top", top + "px");
        }
      })
      .on("mouseout", () => {
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-45)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    svg.append("text").style("text-anchor", "middle").text("Employee Name");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Salary (in dollars)");
  }, [employees]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <div id="tooltip" style={{ opacity: 0, position: "absolute" }}></div>

      <svg ref={svgRef} width={600} height={400}></svg>
    </div>
  );
};

export default BarChartNames;
