import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useEmployee from "../hooks/useEmployee";
export interface Employee {
  id: string;
  employee_name: string;
  employee_salary: string;
  employee_age: string;
  profile_image: string;
}
const BarChartAge: React.FC = () => {
  const { employees, error, isLoading } = useEmployee();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!employees) return;

    const data = employees.map((employee) => ({
      name: employee.employee_name,
      age: employee.employee_age,
      salary: employee.employee_salary,
    }));

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);

    // const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const margin = { top: 20, right: 0, bottom: 30, left: 60 };

    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .range([60, width + 60])
      .padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(data.map((d) => d.age.toString()));
    yScale.domain([0, d3.max(data, (d) => Number(d.salary)) || 0]);

    const tooltip = d3.select("#tooltip");

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.age.toString()) || 0)
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(Number(d.salary)))
      .attr("height", (d) => height - yScale(Number(d.salary)))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `<strong>${d.name}</strong><br/>Age: ${d.age}<br/>Salary: ${d.salary}`
          )
          .style("left", event.pageX - margin.left + "px")
          .style("top", event.pageY - margin.top - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`) // Adjust the left margin
      .call(d3.axisLeft(yScale));

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
      {error && <p>Error (Too many requests): {error}</p>}
      {/* Tooltip */}
      <div id="tooltip" style={{ opacity: 0, position: "absolute" }}></div>

      <svg
        ref={svgRef}
        width={800}
        height={400}
        style={{ marginLeft: "50px" }}
      ></svg>
    </div>
  );
};

export default BarChartAge;
