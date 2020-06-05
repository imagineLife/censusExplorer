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

const stateAbbr = (stateStr) => {
  switch (stateStr){
    case "Alabama": return "AL";
    case "Alaska": return "AK";
    case 'Arizona': return "AZ";
    case 'Arkansas': return "AR";
    case 'California': return "CA";
    case 'Colorado': return "CO";
    case 'Connecticut': return "CT";
    case 'Delaware': return "DE";
    case "District of Columbia": return "DC";
    case "Florida": return "FL";
    case "Georgia": return "GA";
    case 'Hawaii': return "HI";
    case 'Idaho': return "ID";
    case 'Illinois': return "IL";
    case 'Indiana': return "IN";
    case 'Iowa': return "IA";
    case 'Kansas': return "KS";
    case "Kentucky": return "KY";
    case "Louisiana": return "LA";
    case "Maine": return "ME";
    case "Maryland": return "MD";
    case 'Massachusetts': return "MA";
    case 'Michigan': return "MI";
    case 'Minnesota': return "MN";
    case 'Mississippi': return "MS";
    case 'Missouri': return "MO";
    case 'Montana': return "MT";
    case "Nebraska": return "NE";
    case "Nevada": return "NV";
    case "New Hampshire": return "NH";
    case "New Jersey": return "NJ";
    case 'New Mexico': return "NM";
    case 'New York': return "NY";
    case 'North Carolina': return "NC";
    case 'North Dakota': return "ND";
    case 'Ohio': return "OH";
    case 'Oklahoma': return "OK";
    case "Oregon": return "OR";
    case "Pennsylvania": return "PA";
    case "Rhode Island": return "RI";
    case 'South Carolina': return "SC";
    case 'South Dakota': return "SD";
    case 'Tennessee': return "TN";
    case 'Texas': return "TX";
    case 'Utah': return "UT";
    case 'Vermont': return "VT";
    case "Virginia": return "VA";
    case "Washington": return "WA";
    case 'West Virginia': return "WV";
    case 'Wisconsin': return "WI";
    case 'Wyoming': return "WY";
    default: return "VA";
  }
}

export {
	fetcher,
	wrap,
  stateAbbr
}