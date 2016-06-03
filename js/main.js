var DEFAULT_CONFIG = {
		"vacancy_rate" : .07,
		"replacement_reserve_rate" : 300.0,
		"debt_service_coverage" : 1.15,
		"interest_rate" : 0.05,
		"capitalization_rate" : 0.0575,
		"loan_to_value" : 0.87,
		"50" : {
			"average_monthly_rent" : 487.60,
			"admin_expenses" :  118462.0,
			"operating_expenses" :  71818.0,
			"maintenance_expenses" :  60734.0,
			"uses" : {
				"acquisition_costs" : 1128000.0,
				"construction_costs" : 9102539.228,
				"design_fees" : 562039.296,
				"interim_costs" : 441837.5958,
				"permanent_financing_fees" : 318507.0608,
				"operating_and_debt_service_reserves" : 219620.0762,
				"developers_fee" : 1338421.047,
				"project_management" : 67130.63766
			},
			"sources" : {
				"deferred_developer_fee" : 372464.0
			}
		},
		"100" : {
			"average_monthly_rent" : 489.35,
			"admin_expenses" :  240083.0,
			"operating_expenses" :  131906.0,
			"maintenance_expenses" :  125421.0,
			"uses" : {
				"acquisition_costs" : 1296514.054,
				"construction_costs" : 14789636.52,
				"design_fees" : 539416.9495,
				"interim_costs" : 300124.8611,
				"permanent_financing_fees" : 489289.5056,
				"operating_and_debt_service_reserves" : 392553.8671,
				"developers_fee" : 2147811.111,
				"project_management" : 69289.79592
			},
			"sources" : {
				"deferred_developer_fee" : 665533.0,
				"tax_credit_equity" : 8300000.0
			}
		}
	}
var DOLLARS = d3.format("$,.0f")
var PERCENT = d3.format(".2%")
var PERCENT_SMALL = d3.format(".1%")

function drawGap(units, config, transition){
	var roof_height = 67;
	var max_dollars =  20024637;
	var max_pixels = 400;
	var break_50_middle_windows = 166;
	var break_50_top_windows = 113;
	var break_50_roof = 61;
	var break_50_door = -7;
	var break_100_middle_windows = 250;
	var break_100_bottom_balcony = 160;
	var break_100_top_balcony = 100;

	var bg_break_50_dirt = 0.3
	var bg_break_50_road = 0.2
	var bg_break_50_sidewalk = 0.4
	var bg_break_50_grass = 0.3

	function scaleDollars(dollars){
		return (dollars/max_dollars) * max_pixels
	}
	var resp = update(units, config, transition)
	var total_development_cost = resp.total_development_cost
	var gap = resp.gap
	if(total_development_cost-gap <0){
		gap = total_development_cost;
	}else if(gap < 0){
		gap = 0;
	}
	if(units==50){
		d3.selectAll("#dirt")
			.transition()
			.style("opacity", function(){
				if(1-(gap/total_development_cost) > bg_break_50_dirt){ return 0;}
				else{ return 1;}
			})
		d3.select("#road")
			.transition()
			.style("opacity", function(){
				if(1-(gap/total_development_cost) > bg_break_50_road){ return 1;}
				else{ return 0;}
			})
		d3.select("#sidewalk")
			.transition()
			.style("opacity", function(){
				if(1-(gap/total_development_cost) > bg_break_50_sidewalk){ return 1;}
				else{ return 0;}
			})
		d3.select("#grass")
			.transition()
			.style("opacity", function(){
				if(1-(gap/total_development_cost) > bg_break_50_grass){ return 1;}
				else{ return 0;}
			})
	}

	if(transition){
		d3.select("#roof_img_" + units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height) + "px"
			})
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1
			})
		d3.select("#roof_" + units)
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1
			})
			.transition()
			.style("height", Math.max(0,parseFloat(-scaleDollars(gap) + roof_height)) + "px")
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height) + "px"
			})


	}else{
		d3.selectAll(".roofs_" + units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height) + "px"
			})
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1
			})
	}
	if(transition){
		d3.select("#total_building_"+units)
			.transition()
			.style("height", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return scaleDollars(total_development_cost)-2
				}else return scaleDollars(total_development_cost) - roof_height - 2 -5
			})
	}else{
		d3.select("#total_building_"+units)
			.style("height", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return scaleDollars(total_development_cost)-2
				}else return scaleDollars(total_development_cost) - roof_height - 2 -5
			})
	}
	if(transition){
		d3.select("#built_building_"+units)
			.transition()
			.style("height", function(){
				if(scaleDollars(total_development_cost) - scaleDollars(gap) > scaleDollars(total_development_cost) -roof_height && scaleDollars(total_development_cost) - roof_height > break_50_roof){
					// drawRoof(units, -scaleDollars(gap) + roof_height, transition)
					return(scaleDollars(total_development_cost) - roof_height)
				}else{
					// drawRoof(units, 0, transition)
					return Math.max(0,scaleDollars(total_development_cost) - scaleDollars(gap))
				}
			})
	}else{
		d3.select("#built_building_"+units)
			.style("height", function(){
				if(scaleDollars(total_development_cost) - scaleDollars(gap) > scaleDollars(total_development_cost) -roof_height && scaleDollars(total_development_cost) - roof_height > break_50_roof){
					drawRoof(units, -scaleDollars(gap) + roof_height, transition)
					return(scaleDollars(total_development_cost) - roof_height)
				}else{
					drawRoof(units, 0, transition)
					return scaleDollars(total_development_cost) - scaleDollars(gap)
				}
			})
	}
	if(transition){
		d3.select("#shadow_gap_"+units)
			.transition()
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height -5
			})
			.style("height", function(){
				return scaleDollars(total_development_cost) - scaleDollars(gap) - (scaleDollars(total_development_cost) - roof_height - 2 -5)-1
			})
			.style("opacity", function(){
				if(scaleDollars(total_development_cost) - scaleDollars(gap) > scaleDollars(total_development_cost) -roof_height-5 && scaleDollars(total_development_cost) - roof_height > break_50_roof){
					return 1
				}else return 0
			})
		d3.select("#i_bar_top_"+units)
			.transition()
			.style("bottom", function(){
				return scaleDollars(total_development_cost)
			})
		d3.select("#i_bar_bottom_"+units)
			.transition()
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - scaleDollars(gap)
			})
		d3.select("#i_bar_"+units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - scaleDollars(gap)) + "px"
			})
			.style("height", function(){
				return scaleDollars(gap)
			})
		d3.select("#gap_container_"+units)
			.transition()
			.style("bottom", function(){
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < 90){
					return window.innerHeight-90
				}else{
					return scaleDollars(total_development_cost) + 20
				}
			})
			countup_val("gap_amount_"+units, resp.gap)

		d3.select("#balcony_top_" + units)
			.transition()
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height - 45
			})
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_top_windows || units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_top_balcony){
					return 0;
				}else return 1
			})
		d3.select("#balcony_bottom_" + units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/2 - 25
			})
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_middle_windows || units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_bottom_balcony){
					return 0;
				}
				else return 1
			})
		d3.select("#windows_bottom_" + units)
			.transition()
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_door){
					return 0;
				}else return 1
			})
		d3.select("#windows_middle_" + units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/2 - 30
			})
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_middle_windows){
					return 0;
				}else return 1
			})
		d3.select("#windows_middle1_" + units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/2 - 30
			})
			.style("opacity",function(){
				if(units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_bottom_balcony){
					return 0;
				}else return 1
			})

		d3.select("#windows_middle2_" + units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/4 - 10
			})
			.style("opacity",function(){
				if(units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_middle_windows){
					return 0;
				}else return 1
			})
		d3.select("#windows_middle3_" + units)
			.transition()
			.style("bottom", function(){
				return 3*(scaleDollars(total_development_cost) - roof_height - 2)/4 - 50
			})
			.style("opacity",function(){
				if(units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_middle_windows){
					return 0;
				}else return 1
			})
		d3.select("#windows_top_" + units)
			.transition()
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height - 70
			})
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_top_windows || units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_top_balcony){
					return 0;
				}else return 1
			})
		d3.select("#windows_roof_" + units)
			.transition()
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height) + "px"
			})
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1
			})
	}else{
		d3.select("#shadow_gap_"+units)
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height -5
			})
			.style("height", function(){
				return scaleDollars(total_development_cost) - scaleDollars(gap) - (scaleDollars(total_development_cost) - roof_height - 2 -5)-1
			})
			.transition()
			.duration(100)
			.style("opacity", function(){
				if(scaleDollars(total_development_cost) - scaleDollars(gap) > scaleDollars(total_development_cost) -roof_height-5 && scaleDollars(total_development_cost) - roof_height > break_50_roof){
					return 1
				}else return 0
			})
		d3.select("#i_bar_top_"+units)
			.style("bottom", function(){
				return scaleDollars(total_development_cost)
			})
		d3.select("#i_bar_bottom_"+units)
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - scaleDollars(gap)
			})
		d3.select("#i_bar_"+units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - scaleDollars(gap)) + "px"
			})
			.style("height", function(){
				return scaleDollars(gap)
			})
		d3.select("#gap_container_"+units)
			.style("bottom", function(){
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < 90){
					return window.innerHeight-90
				}else{
					return scaleDollars(total_development_cost) + 20
				}
			})
		countup_val("gap_amount_"+units, resp.gap)

		d3.select("#balcony_top_" + units)
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height - 45
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_top_windows || units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_top_balcony){
					return 0;
				}else return 1
			})
		d3.select("#balcony_bottom_" + units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/2 - 25
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_middle_windows || units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_bottom_balcony){
					return 0;
				}
				else return 1
			})
		d3.select("#windows_bottom_" + units)
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_door){
					return 0;
				}else return 1
			})
		d3.select("#windows_middle_" + units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/2 - 30
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_middle_windows){
					return 0;
				}else return 1
			})
		d3.select("#windows_middle1_" + units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/2 - 30
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_bottom_balcony){
					return 0;
				}else return 1
			})

		d3.select("#windows_middle2_" + units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height - 2)/4 - 10
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_middle_windows){
					return 0;
				}else return 1
			})
		d3.select("#windows_middle3_" + units)
			.style("bottom", function(){
				return 3*(scaleDollars(total_development_cost) - roof_height - 2)/4 - 50
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_middle_windows){
					return 0;
				}else return 1
			})
		d3.select("#windows_top_" + units)
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height - 70
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(units == 50 && scaleDollars(total_development_cost) - roof_height < break_50_top_windows || units == 100 && scaleDollars(total_development_cost) - roof_height < break_100_top_balcony){
					return 0;
				}else return 1
			})
		d3.select("#windows_roof_" + units)
			.style("bottom", function(){
				return (scaleDollars(total_development_cost) - roof_height) + "px"
			})
			.transition()
			.duration(100)
			.style("opacity",function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1
			})
	}
}
function countup_val(val_id, new_val){
	var current_val = parseFloat(d3.select("#" + val_id).text().replace("$","").replace(/\,/g,""))
	var countup_options = {
		useEasing : true, 
		useGrouping : true,
		separator : ',', 
		decimal : '.', 
		prefix : '$', 
		suffix : '' 
	};
	var amount_countup = new CountUp(val_id, current_val, new_val, 0, .5, countup_options);
	amount_countup.start();
}
function drawRoof(units, pixels, transition){
	pixels = parseFloat(pixels)
	var roof = d3.select("#roof_" + units)
	roof.style("height",pixels)
}
function update(units, config, transition){
	var effective_gross_income = getEffectiveGrossIncome(units, config.vacancy_rate, config[units]["average_monthly_rent"])
	var noi = getNOI(units, config[units]["admin_expenses"], config[units]["operating_expenses"], config[units]["maintenance_expenses"], config.replacement_reserve_rate, effective_gross_income)

	countup_val("s" + units + "_noi", noi)

	var max_loan_income = getMaxLoanIncome(noi, config.debt_service_coverage, config.interest_rate)
	var max_loan_value = getMaxLoanValue(noi, config.capitalization_rate, config.loan_to_value)
	var max_loan = Math.min(max_loan_value, max_loan_income)

	countup_val("s" + units + "_debt", max_loan)
	var text = (max_loan_value > max_loan_income) ? "Income" : "Value";
	var text_indent = (max_loan_value > max_loan_income) ? 151 : 163;
	d3.select("#loan_label").text(text)
	d3.select("#debt_label").style("text-indent", text_indent)
	
	var total_development_cost = getTotalDevelopmentCost(config[units]["uses"])
	var total_sources = getTotalSources(config[units]["sources"], max_loan)
	var gap = total_development_cost - total_sources;
	resp = {
		"gap":gap,
		"total_development_cost": total_development_cost,
		"total_sources": total_sources
	}
	return resp;
}
function getEffectiveGrossIncome(units, vacancy_rate, average_monthly_rent){
	units = parseFloat(units)
	var total_rent_income = units * average_monthly_rent * 12.0;
	var effective_gross_income = total_rent_income - vacancy_rate*total_rent_income
	return effective_gross_income;
}
function getNOI(units, admin_expenses, operating_expenses, maintenance_expenses, replacement_reserve_rate, effective_gross_income){
	units = parseFloat(units)
	var replacement_reserve = units * replacement_reserve_rate;
	var total_annual_expenses = replacement_reserve + admin_expenses + operating_expenses + maintenance_expenses;
	var noi = effective_gross_income - total_annual_expenses;
	return noi;
}
function PV(rate, nper, pmt)
{
	return pmt / rate * (1 - Math.pow(1 + rate, - nper));
}
function getMaxLoanIncome(noi, debt_service_coverage, interest_rate){
	var noi_available = noi/debt_service_coverage
	var monthly_payment = noi_available/12.0
	var max_loan_income = PV(interest_rate/12.0, 30.0*12.0, monthly_payment)
	return max_loan_income;
}
function getMaxLoanValue(noi, capitalization_rate, loan_to_value){
	var calculated_property_value = noi/capitalization_rate;
	var max_loan_value = calculated_property_value * loan_to_value;
	return max_loan_value;
}
function getTotalDevelopmentCost(uses){
	var total_development_cost = 0;
	for (var use in uses) {
	  if( uses.hasOwnProperty( use ) ) {
	    total_development_cost += uses[use]
	  }
	}
	return total_development_cost;
}
function getTotalSources(sources, max_loan){
	var total_sources = max_loan;
	for (var source in sources) {
	  if( sources.hasOwnProperty( source ) ) {
	    total_sources += sources[source]
	  }
	}
	return total_sources;
}

function restoreDefaults(config){
	return config;
}

function updateDefaultsFromDashboard(transition){
	var config = jQuery.extend(true, {}, DEFAULT_CONFIG);
	var original = jQuery.extend(true, {}, DEFAULT_CONFIG);
	d3.selectAll("#debt_sizing .range.control")
		.each(function(){
			config[this.id.split("range_")[1]] = parseFloat(this.value)
		})
	d3.selectAll("#sources .range.control")
		.each(function(){
			var control = this.id.split("range_")[1];
			var sizes = ["50","100"]
			for (var i = 0; i<sizes.length; i++){
				size = sizes[i]
				var amt = parseFloat(this.value)*original[size]["sources"][control]
				if(!isNaN(amt)){
					config[size]["sources"][control] = amt
					countup_val("s" + size + "_" + control, amt)
				}

			}
		})
	d3.selectAll("#uses .range.control")
		.each(function(){
			var control = this.id.split("range_")[1];
			var sizes = ["50","100"]
			for (var i = 0; i<sizes.length; i++){
				size = sizes[i]
				var amt = parseFloat(this.value)*original[size]["uses"][control]
				if(!isNaN(amt)){
					config[size]["uses"][control] = amt
					countup_val("s" + size +"_" + control, amt)
				}

			}
		})
	d3.selectAll("#noi .range.control")
		.each(function(){
			var control = this.id.split("range_")[1];
			if(control == "vacancy_rate" || control == "replacement_reserve_rate"){
				config[this.id.split("range_")[1]] = parseFloat(this.value)	
			}
			var sizes = ["50","100"]
			for (var i = 0; i<sizes.length; i++){
				size = sizes[i]
				var amt = parseFloat(this.value)*original[size][control]
				if(!isNaN(amt)){
					config[size][control] = amt
					countup_val("s" + size +"_" + control, amt)
				}

			}
		})
	d3.selectAll("#sources .other_source.other")
		.each(function(){
			var components = this.id.split("_")
			var size = components[1].replace("s","")
			var ind = components[4]

			var amt = parseFloat(this.value.replace("$","").replace(/,/g,""))
			if(!isNaN(amt)){
				config[size]["sources"]["other_source_" + ind] = amt
			}
		})
	return config
}

function init(){
	drawGap("50", DEFAULT_CONFIG, true)
	drawGap("100", DEFAULT_CONFIG, true)
}

d3.selectAll(".control")
	.on("input",function(){
		if(this.type == "text"){
			var val;
			if(d3.select(this).classed("percent") || d3.select(this).classed("percent_small")){
				val = parseFloat(this.value)/100
			}else val = parseFloat(this.value)
			var range = d3.select("." + this.id.split("text_")[1] + ".range")
			if(val >= parseFloat(range.attr("min")) && val <= parseFloat(range.attr("max"))){
				d3.select(this).classed("invalid",false)
				range.attr("value", val)
				range.node().value = val
				var config = updateDefaultsFromDashboard(true)
				drawGap("50", config, true)
				drawGap("100", config, true)

			}else{
				d3.select(this).classed("invalid",true)
			}
			// d3.select("." + this.id.split("text_")[1] + ".range")
				// .attr("value", val)

		}else{
			var config = updateDefaultsFromDashboard(false)
			var val;
			if(d3.select(this).classed("percent")) val = PERCENT(this.value);
			else if(d3.select(this).classed("percent_small")) val = PERCENT_SMALL(this.value);
			else val = this.value;

			d3.select("." + this.id.split("range_")[1] + ".text")
				.attr("value", val)
				.classed("invalid",false)
			d3.select("." + this.id.split("range_")[1] + ".text")
				.node().value = val
			
			drawGap("50", config, false)
			drawGap("100", config, false)
		}
	})

d3.select("#sources")
			.datum({"count":0})

d3.select(".control_container.new_source")
	.on("click", function(){
		var new_source = d3.select("#sources")
			.append("div")
			.attr("class", "control_container new_source")
		new_source.append("div")
			.attr("class", "new_source_label")
			.text("Other Source")
		new_source.append("input")
			.attr("type","text")
			.attr("class","control sources other_source other")
			.attr("id",function(d){
				var c = d.count
				d.count += 1
				return "text_s50_other_source_" + (c+1)
			})
			.attr("value","$0")
			.on("input", function(d){
				var config = updateDefaultsFromDashboard(true);
				// config["50"]["sources"]["other_source_" + d.count] = this.value
				drawGap("50",config, true)
			})
		new_source.append("input")
			.attr("type","text")
			.attr("class","control sources other_source other")
			.attr("id",function(d){
				var c = d.count
				return "text_s100_other_source_" + (c+1)
			})
			.attr("value","$0")
			.on("input", function(d){
				var config = updateDefaultsFromDashboard(true);
				// config["50"]["sources"]["other_source_" + d.count] = this.value
				drawGap("100",config, true)
			})

	})









