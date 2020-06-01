import { select as d3Select } from 'd3-selection'

const fetcher = async (url, opts) => {
	let fetchOpts = opts || {}
	let fetchRes = await fetch(url, fetchOpts)
	if(fetchRes.status == 200){
		let jsonRes = await fetchRes.json();
			return jsonRes
	}else{
		fetchRes.json().then(jsonRes => {
			return {"Error": "non-200"}	
		})
	}
}

function wrap(text, width) {
  text.each(function() {
    var text = d3Select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

export {
	fetcher,
	wrap
}