var DEFAULT_CONFIG = {
		"vacancy_rate" : .07,
		"replacement_reserve_rate" : 300.0,
		"debt_service_coverage" : 1.15,
		"interest_rate" : 0.05,
		"capitalization_rate" : 0.0575,
		"loan_to_value" : 0.87,
		"50" : {
			"average_monthly_rent" : 487.60,
			// "percent_of_rent": .3,
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
				"deferred_developer_fee" : 372464.0,
				"tax_credit_equity" : 0

			}
		},
		"100" : {
			"average_monthly_rent" : 489.35,
			// "percent_of_rent": .3,
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
var TOP_THRESHOLD = 240;

function drawGap(units, config, transition){
	var scalar = (TABLET) ? 2.1: 1;
	var roof_height = 67;
	var max_dollars =  40400000;
	var max_pixels = (window.innerHeight-90-60)/scalar;
	var break_50_middle_windows = 194;
	var break_50_top_windows = 133;
	var break_50_roof = 61;
	var break_50_door = -3;
	var break_100_middle_windows = 275;
	var break_100_bottom_balcony = 180;
	var break_100_top_balcony = 135;

	var bg_break_50_rightHill = 0.4
	var bg_break_50_wheelbarrow = .35
	var bg_break_50_sidewalk = 0.3
	var bg_break_50_paths = 0.5
	var bg_break_50_shrubs = 0.8
	var bg_break_50_bike = 0.8
	var bg_break_50_dog = 0.95
	var bg_break_50_crane = .99999



	function scaleDollars(dollars){
		return (dollars/max_dollars) * max_pixels
	}
	var resp = update(units, config, transition)
	var total_development_cost = resp.total_development_cost
	var gap = resp.gap
	if(total_development_cost-gap <0){
		gap = total_development_cost;
	}else if(gap <= 0){
		gap = 0;
	}
	if(units==100){
		d3.select("#path100")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_paths){
				 d3.select("#sidewalk")
				 	.classed("locked",false)
				 	// .transition()
				 	// .duration(1000)
				 	// .style("opacity",0)
				 return 0;
				}
				else{
				 d3.select("#sidewalk")
				 	.classed("locked",true)
				 	.transition()
				 	.duration(1000)
				 	.style("opacity",1)
				 return 1;
				}
			})
			.style("right", function(){
				if(d3.select("#building_container_50").node().getBoundingClientRect().right > 0){
					return "125px";
				}else{
					return "-225px"
				}
			})
		d3.select("#shrubs100")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_shrubs){ return 0;}
				else{ return 1;}
			})
			.style("right", function(){
				if(d3.select("#building_container_50").node().getBoundingClientRect().right > 0){
					return "94px";
				}else{
					return "-225px"
				}
			})

		d3.selectAll(".person_100")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_crane){ return 0;}
				else{ return 1;}
			})
	}

	if(units==50){
		d3.select("#rightHill")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_rightHill){ return 0;}
				else{ return 1;}
			})
		d3.select("#wheelbarrow")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_wheelbarrow){ return 1;}
				else{ return 0;}
			})
		d3.select("#sidewalk")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_sidewalk){ return 0;}
				else{ return 1;}
			})
		d3.select("#sidewalk")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(d3.select(this).classed("locked")){ return 1}
				else if(1-(gap/total_development_cost) < bg_break_50_sidewalk){ return 0;}
				else{ return 1;}
			})
		d3.select("#bike")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_bike){ return 0;}
				else{ return 1;}
			})
		d3.select("#dog")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_dog){ return 0;}
				else{ return 1;}
			})
		d3.select("#path50")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_paths){ return 0;}
				else{ return 1;}
			})
			.style("right", function(){
				if(d3.select("#building_container_50").node().getBoundingClientRect().right > 0){
					return "354px";
				}else{
					return "125px"
				}
			})
		d3.select("#shrubs50")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_shrubs){ return 0;}
				else{ return 1;}
			})
			.style("right", function(){
				if(d3.select("#building_container_50").node().getBoundingClientRect().right > 0){
					return "321px";
				}else{
					return "94px"
				}
			})
		d3.selectAll(".person_50")
			.transition()
			.duration(1000)
			.style("opacity", function(){
				if(1-(gap/total_development_cost) < bg_break_50_crane){ return 0;}
				else{ return 1;}
			})
	}
		var r1 = update(50, config, transition)
		var r2 = update(100, config, transition)

		d3.select("#crane")
			.transition()
			.duration(1500)
			.style("right", function(){
				d3.select(this).style("display","block")

				if(r1.gap <= 0 && r2.gap <= 0){
					return -800;
				}
				else{
					return -130
				}
			})
			.each("end", function(){
				if(r1.gap <= 0 && r2.gap <= 0){
					d3.select(this).style("display","none")
				}
			})


	if(transition){
		d3.select("#total_building_"+units)
			.transition()
			.style("height", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return scaleDollars(total_development_cost)-2
				}else return scaleDollars(total_development_cost) - roof_height - 2 -5
			})
			.style("padding-top", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 6
			})
	}else{
		d3.select("#total_building_"+units)
			.style("height", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return scaleDollars(total_development_cost)-2
				}else return scaleDollars(total_development_cost) - roof_height - 2 -5
			})
			.style("padding-top", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 6
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
					// drawRoof(units, -scaleDollars(gap) + roof_height, transition)
					return(scaleDollars(total_development_cost) - roof_height)
				}else{
					// drawRoof(units, 0, transition)
					return scaleDollars(total_development_cost) - scaleDollars(gap)
				}
			})
	}
	if(transition){
		d3.select("#shadow_gap_"+units)
			.transition()
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height -6
			})
				// .style("height", function(){
				// 	return scaleDollars(total_development_cost) - scaleDollars(gap) - (scaleDollars(total_development_cost) - roof_height - 2 -5)-1
				// })
			.style("opacity", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1
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
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < TOP_THRESHOLD){
					return window.innerHeight-TOP_THRESHOLD
				}else{
					return scaleDollars(total_development_cost) + 20
				}
			})
			.style("background-color", function(){
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < TOP_THRESHOLD){
					return "rgba(38,31,32,.8)"
				}else{
					return "rgba(38,31,32,1)"
				}
			})
			if(resp.gap <= 0){
				d3.select("#gap_container_" + units + " .needed")
					.text("surplus")
					.style("color","#fdbf11")

				d3.select(".print_label.gap" + units)
					.text("Surplus")
					.style("color","#1696d2")
				d3.select("#print_gap_amount_" + units)
					.style("color","#1696d2")
				d3.select("#gap_amount_" + units)
					.style("color","#fdbf11")

				countup_val("gap_amount_"+units, resp.gap*-1)

			}else{
				d3.select("#gap_container_" + units + " .needed")
					.text("deficit")
					.style("color","#ffffff")
				d3.select(".print_label.gap" + units)
					.text("Deficit")
					.style("color","#000000")
				d3.select("#print_gap_amount_" + units)
					.style("color","#000000")
				d3.select("#gap_amount_" + units)
					.style("color","#ffffff")
				countup_val("gap_amount_"+units, resp.gap)
			}

			countup_val("print_gap_amount_"+units, resp.gap)
			countup_val("print_cost_amount_"+units, resp.total_development_cost)
			countup_val("print_sources_amount_"+units, resp.total_sources)

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
		d3.selectAll(".empty_windows_" + units)
			.transition()
			.duration(100)
			.style("bottom", function(){
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}

					var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return h}
					else if(diff < 0){ return 0}
					else{ return Math.max(0,diff)}
			})
			.style("height", function(){
					// 34, 61, 44
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}
					var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return 0}
					else if(diff < 0){ return h}
					else{ return h-diff}
			})
		d3.selectAll(".full_windows_" + units)
			.transition()
			.duration(100)
			.style("height", function(){
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}

				var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return h}
					else if(diff < 0){ return 0}
					else{ return diff}
			})
			.style("top", function(){
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}

					var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return 0}
					else if(diff < 0){ return h}
					else{ return Math.max(0,h-diff)}
			})
	}else{
		d3.select("#shadow_gap_"+units)
			.style("bottom", function(){
				return scaleDollars(total_development_cost) - roof_height -6
			})
			// .style("height", function(){
			// 	return scaleDollars(total_development_cost) - scaleDollars(gap) - (scaleDollars(total_development_cost) - roof_height - 2 -5)-1
			// })
			.transition()
			.duration(100)
			.style("opacity", function(){
				if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
					return 0;
				}else return 1

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
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < TOP_THRESHOLD){
					return window.innerHeight-TOP_THRESHOLD
				}else{
					return scaleDollars(total_development_cost) + 20
				}
			})
			.style("background-color", function(){
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < TOP_THRESHOLD){
					return "rgba(35,31,32,.8)"
				}else{
					return "rgba(35,31,32,1)"
				}
			})
			if(resp.gap <= 0){
				d3.select("#gap_container_" + units + " .needed")
					.text("surplus")
					.style("color","#fdbf11")

				d3.select(".print_label.gap" + units)
					.text("Surplus")
					.style("color","#1696d2")
				d3.select("#print_gap_amount_" + units)
					.style("color","#1696d2")
				d3.select("#gap_amount_" + units)
					.style("color","#fdbf11")

				countup_val("gap_amount_"+units, resp.gap*-1)

			}else{
				d3.select("#gap_container_" + units + " .needed")
					.text("deficit")
					.style("color","#ffffff")
				d3.select(".print_label.gap" + units)
					.text("Deficit")
					.style("color","#000000")
				d3.select("#print_gap_amount_" + units)
					.style("color","#000000")
				d3.select("#gap_amount_" + units)
					.style("color","#ffffff")
				countup_val("gap_amount_"+units, resp.gap)
			}
			countup_val("print_gap_amount_"+units, resp.gap)
			countup_val("print_cost_amount_"+units, resp.total_development_cost)
			countup_val("print_sources_amount_"+units, resp.total_sources)

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
		d3.selectAll(".empty_windows_" + units)
			.style("height", function(){
					// 34, 61, 44
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}
					var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return 0}
					else if(diff < 0){ return h}
					else{ return h-diff}
			})
			.style("bottom", function(){
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}

					var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return -h}
					else if(diff < 0){ return 0}
					else{ return Math.max(0,diff)}
			})
		d3.selectAll(".full_windows_" + units)
			.style("height", function(){
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}

				var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return h}
					else if(diff < 0){ return 0}
					else{ return diff}
			})
			.style("top", function(){
					var h;
					if(d3.select(this).classed("door")){ h = 64}
					else if(d3.select(this).classed("roof")){ h = 68}
					else {h = 44}

					var diff = this.parentNode.getBoundingClientRect().bottom - d3.select("#total_building_" + units).node().getBoundingClientRect().bottom + scaleDollars(total_development_cost) - scaleDollars(gap)
					if(diff > h){ return 0}
					else if(diff < 0){ return 0}
					else{ return Math.max(0,h-diff)}
			})
	}
}
function drawGaps(config, transition){
	drawGap("50", config, transition);
	drawGap("100", config, transition);
}
function countup_val(val_id, new_val){
	var prefix = (val_id == "ami_label_val" || val_id == "gap_container_50_ami" || val_id == "gap_container_100_ami" || val_id == "print_gap_container_50_ami" || val_id == "print_gap_container_100_ami" || val_id.search("vacancy_rate") != -1 || val_id.search("debt_service_coverage") != -1 || val_id.search("interest_rate") != -1 || val_id.search("capitalization_rate") != -1 || val_id.search("loan_to_value") != -1) ? "" : "$"
	var suffix = (val_id.search("vacancy_rate") != -1 || val_id.search("interest_rate") != -1 || val_id.search("capitalization_rate") != -1 || val_id.search("loan_to_value") != -1) ? "%" : ""
	var precision;
	if(val_id.search("vacancy_rate") != -1 || val_id.search("loan_to_value") != -1 || val_id.search("ami_label_val") != -1) { precision = 1}
	else if (val_id.search("debt_service_coverage") != -1 || val_id.search("interest_rate") != -1 || val_id.search("capitalization_rate") != -1) { precision = 2}
	else{ precision = 0}

	if(val_id.search("vacancy_rate") != -1 || val_id.search("interest_rate") != -1 || val_id.search("capitalization_rate") != -1 || val_id.search("loan_to_value") != -1){ new_val *= 100}
	var current_val = parseFloat(d3.select("#" + val_id).text().replace("$","").replace(/\,/g,""))
	var countup_options = {
		useEasing : true, 
		useGrouping : true,
		separator : ',', 
		decimal : '.', 
		prefix : prefix, 
		suffix : suffix
	};
	var amount_countup = new CountUp(val_id, current_val, new_val, precision, .5, countup_options);
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
	if(noi < 0){
		showWarning("noi_label")
	}else{
		hideWarning("noi_label")
	}
	countup_val("s" + units + "_noi", noi)

	var max_loan_income = getMaxLoanIncome(noi, config.debt_service_coverage, config.interest_rate)
	var max_loan_value = getMaxLoanValue(noi, config.capitalization_rate, config.loan_to_value)
	var max_loan = Math.min(max_loan_value, max_loan_income)

	countup_val("s" + units + "_debt_income", max_loan_income)
	countup_val("s" + units + "_debt_value", max_loan_value)

	if(max_loan_income < max_loan_value){
		d3.selectAll(".larger").classed("larger",false)
		d3.selectAll(".loan_value").classed("larger", true)
		d3.selectAll(".debt_marker")
			.transition()
			.style("top","21px")
	}else{
		d3.selectAll(".larger").classed("larger",false)
		d3.selectAll(".loan_income").classed("larger", true)
		d3.selectAll(".debt_marker")
			.transition()
			.style("top","42px")
	}
	
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
	return Math.max(0,max_loan_income);
}
function getMaxLoanValue(noi, capitalization_rate, loan_to_value){
	var calculated_property_value = noi/capitalization_rate;
	var max_loan_value = calculated_property_value * loan_to_value;
	return Math.max(0,max_loan_value);
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
	if(d3.select("#s1").classed("on")){
		config["50"]["sources"]["tax_credit_equity"] = 7550000
		original["50"]["sources"]["tax_credit_equity"] = 7550000
	}
	if(d3.select("#s2").classed("off")){
		config["100"]["sources"]["tax_credit_equity"] = 0
		original["100"]["sources"]["tax_credit_equity"] = 0
	}
	d3.selectAll("#debt_sizing .range.control")
		.each(function(){
			var control = this.id.split("range_")[1];
			var amt = parseFloat(this.value)*original[this.id.split("range_")[1]];
			config[this.id.split("range_")[1]] = amt;
			countup_val("s50" + "_" + control, amt)
			countup_val("s100" + "_" + control, amt)
		})
	d3.selectAll("#sources .range.control")
		.each(function(){
			var control = this.id.split("range_")[1];
			var sizes = ["50","100"]

			if(control == "deferred_developer_fee"){
				if(parseFloat(this.value) < .1){
					showWarning(control)
				}else{
				 	hideWarning(control)
				}
			}else{
				if(parseFloat(this.value) > 1){
					// if(d3.select("#s1").classed("off") && d3.select("#s2").classed("off")){
					// 	hideWarning("tax_credit_high")
					// }else{
						showWarning("tax_credit_high")
					// }
				}else{
					hideWarning("tax_credit_high")
				}

				if(d3.select("#range_average_monthly_rent").node().value < 2){
					if(d3.select("#s1").classed("off")){
						hideWarning("tax_credit_50")	
					}else if(parseFloat(this.value) <= 1){
						hideWarning("tax_credit_equity")
					}
				}
				
			}
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
			if(parseFloat(this.value) < 1 && control != "project_management" && control != "developers_fee" && control != "permanent_financing_fees"){
				showWarning(control)
			}else{
				hideWarning(control)
			}
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
			if(control == "replacement_reserve_rate" || control == "operating_expenses" || control == "maintenance_expenses" || control == "admin_expenses"){
				if (parseFloat(this.value) < 1){
					showWarning(control)
				}else{
					hideWarning(control)
				}
			}
			if(control == "vacancy_rate" || control == "replacement_reserve_rate"){
				var amt = parseFloat(this.value)*original[this.id.split("range_")[1]];
				config[this.id.split("range_")[1]] = amt;
				countup_val("s50" + "_" + control, amt)
				countup_val("s100" + "_" + control, amt)
			}
			var sizes = ["50","100"]
			for (var i = 0; i<sizes.length; i++){
				size = sizes[i]
				var amt = parseFloat(this.value)*original[size][control]
				if(control == "average_monthly_rent"){
					amt *= parseFloat(d3.select("#range_percent_of_rent").node().value)/.3
				}
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


function showWarning(control, disabled, invalid){
	hideCredits();
	var newClass = (typeof(disabled) == "undefined") ? "warning" : "disabled"
	var msgID;
	if(typeof(disabled) != "undefined"){ msgID = control + "_disabled"}
	else if(control == "rent_high"){ msgID = control}
	else if(typeof(invalid) != "undefined"){ msgID = control + "_invalid"}
	else{ msgID = control}
	var container;
	if(control == "rent_high"){
		container = d3.select("#renter_row_two")
	}
	else if(control == "tax_credit_50" || control == "tax_credit_high"){
		container = d3.select(".control_container.tax_credit_equity")
	}
	else if(control == "noi_label"){
		container = d3.select(".noi.explainer")
	}else{
		container = d3.select(d3.select("#range_"+control).node().parentNode)
	}

	d3.select("#mouth")
		.transition()
		.duration(100)
		.style("height","8px")
	container.classed(newClass,true)
	if(container.selectAll(".warning_icon")[0].length == 0 ||
		(container.classed("tax_credit_equity") && container.selectAll(".warning_icon." + control)[0].length == 0)
		){
		if(typeof(disabled) != "undefined"){ msgID = control + "_disabled"}
		else if(typeof(invalid) != "undefined"){ msgID = control + "_invalid"}
		else{ msgID = control}
		  var max=null;
		  $(".warning_icon img").each(function() {
		    var order = parseInt($(this).data("order"), 10);
		    if ((max===null) || (order > max)) { max = order; }
		  });
		var opacity = (SMALL_DESKTOP) ? 0 : 1;
		var icon = container
			.append("div")
			.attr("class","warning_icon " +  control)
			.append("img")
			.attr("src","images/error.png")
			.attr("data-order",max+1)
			.on("mouseover",function(){
				d3.select(this).attr("src","images/error_hover.png")
				var hoverID = msgID
				d3.select("#warning_sign")
					.style("opacity",1)
					.style("pointer-events","visible")
				d3.select("#warning_text")
					.text(error_msgs[hoverID])
			})
			.on("mouseout", function(){
				d3.select(this).attr("src","images/error.png")
			})
		
		d3.select("#warning_sign")
				.style("pointer-events","visible")
				.transition()
				.style("opacity",1)
				// .each("start", function(){
				// 	d3.select(this).classed("done", false)
				// })
				// .each("end", function(){
				// 	d3.select("body").classed("small_desktop", SMALL_DESKTOP)
				// })
				// .transition()
				// .delay(2000)
				// .duration(1400)
				// .style("opacity",opacity)

		// if(SMALL_DESKTOP){

		// }
		d3.select("#warning_text").text(error_msgs[msgID])

	}
}
function hideSign(){
	// if(d3.select("body").classed("small_desktop")){
	// d3.select("#warning_sign").transition().style("opacity",0)
	// }

}
// d3.select("body")
// 	.on("click",hideSign)

function hideWarning(control){
	if(control == "noi_label"){
		container = d3.select(".noi.explainer")
	}
	else if(control == "rent_high"){
		container = d3.select("#renter_row_two")
	}
	else if(control == "tax_credit_50" || control == "tax_credit_high"){
		container = d3.select(".control_container.tax_credit_equity")
	}
	else{
		container = d3.select(d3.select("#range_"+control).node().parentNode)
	}
	if(!container.classed("tax_credit_equity")){
		container.classed("warning",false)
		container.classed("disabled",false)
		container.selectAll(".warning_icon").remove()
	}else{
		if(container.selectAll(".warning_icon")[0].length == 1 && control == "tax_credit_50" && parseFloat(d3.select("#range_tax_credit_equity").node().value) <= 1){
			container.classed("warning",false)
		}
		if(parseFloat(d3.select("#range_tax_credit_equity").node().value) <= 1 && d3.select("#s1").classed("off")){
			container.classed("warning",false)	
		}
		if(container.selectAll(".warning_icon")[0].length >= 1 && control == "tax_credit_equity"){
			container.classed("disabled",false)
		}
		d3.selectAll(".warning_icon." + control).remove()
	}
	var max=null;
	$(".warning_icon img").each(function() {
		var order = parseInt($(this).data("order"), 10);
		if ((max===null) || (order > max)) { max = order; }
	});
	if(max == null){
		if(mouthShouldClose()){
			d3.select("#mouth")
				.transition()
				.duration(100)
				.style("height","0px")
			d3.select("#warning_sign")
				.transition()
				.style("opacity",0)
				.each("end", function(){
					d3.select(this)
						.style("ponter-events","none")
				})
		}
		return false
	}
	var msgID;
	var helpID = $(".warning_icon img[data-order=" + max + "]").parent()[0].className.replace("warning_icon","").replace(/\s/g,"")
	if(helpID == "noi_label"){ msgID = "noi_label"}
	else if(helpID == "rent_high"){ msgID = "rent_high"}
	else if(helpID == "tax_credit_50"){ msgID = "tax_credit_50"}
	else if(helpID == "tax_credit_high"){ msgID = "tax_credit_high"}
	else if(helpID == "tax_credit_equity" && d3.select(".control_container.tax_credit_equity").classed("disabled")){ msgID = "tax_credit_equity_disabled"}
	else if(d3.select(d3.select("#help_" + helpID).node().parentNode).classed("invalid")){ msgID = helpID+ "_invalid"}
  	else if(d3.select(d3.select("#help_" + helpID).node().parentNode).classed("disabled")){ msgID = helpID+ "_disabled"}
  	// else if(helpID == "noi") { msgID = "noi_label"}
	else{ msgID = helpID}
	d3.select("#warning_text").text(error_msgs[msgID])

	if(mouthShouldClose()){
		d3.select("#mouth")
			.transition()
			.duration(100)
			.style("height","0px")
		d3.select("#warning_sign")
				.transition()
				.style("opacity",0)
				.each("end", function(){
					d3.select(this)
						.style("ponter-events","none")
				})
	}
}
function mouthShouldClose(){
	return (d3.selectAll(".warning_icon")[0].length == 0 && d3.selectAll(".disabled")[0].length == 0 && !d3.select("#credits").classed("visible"))
}
var scrollVis = function() {
  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];
  var lastIndex = -1;
  var activeIndex = 0;
  /**
   * chart
   *
   * @param selection - the current d3 selection(s)
   *  to draw the visualization in. For this
   *  example, we will be drawing it in #vis
   */
  var chart = function() {

      setupSections();

  };


  setupSections = function() {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = dummy1;
    activateFunctions[1] = dummy2;
    activateFunctions[2] = dummy2;
    activateFunctions[3] = dummy2;
    activateFunctions[4] = dummy2;
    activateFunctions[5] = dummy3;
    activateFunctions[6] = dummy4;
    activateFunctions[7] = dummy4;
    activateFunctions[8] = dummy5;
    // activateFunctions[10] = dummy4;
    // activateFunctions[11] = dummy4;
    // activateFunctions[12] = dummy4;
    // activateFunctions[13] = dummy4;

    // activateFunctions[5] = showHistPart;
    // activateFunctions[6] = showHistAll;
    // activateFunctions[7] = showCough;
    // activateFunctions[8] = showHistAll;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for(var i = 0; i < 9; i++) {
      updateFunctions[i] = function() {};
    }
    updateFunctions[2] = update1;
  };

function dummy1(){
	reset();
	highlightSection(0)
	// var config = jQuery.extend(true, {}, DEFAULT_CONFIG);
	// drawGap("50", config, true)
	// drawGap("100", config, true)

	// hide100();
}
function dummy2(){
	reset();
	highlightSection(1)
}
function dummy3(){
	reset();
	highlightSection(2)
	// d3.select("#range_average_monthly_rent").node().value = 200
	// d3.select("#range_average_monthly_rent").attr("value",200)
	// d3.select("#text_average_monthly_rent").node().value = "200%"
	// d3.select("#text_average_monthly_rent").attr("value","200%")
	// // $("#text_average_monthly_rent").trigger("change")
	// var config = updateDefaultsFromDashboard()
	// drawGaps(config, true)
	hide100()
}
function dummy4(){
	show100();
	d3.select("#reset-button")
		.transition()
		.style("bottom","-100px")
}
function dummy5(){
	reset();
	d3.select("#reset-button")
		.transition()
		.style("bottom","20px")
	highlightSection(3)
}


function show100(){


	d3.select("#building_container_50")
		.transition()
		.style("right",function(){ return (MOBILE) ? 116 : 260 })

	d3.select("#building_container_100")
		.style("display","block")
		.transition()
		.style("right",function(){ return (MOBILE) ? -40 : 30 })
		.each("start", function(){
			reset();
		})
	d3.select("#path100")
		.style("display","block")
		.transition()
		.style("right","125px")
	d3.select("#path50")
		.transition()
		.style("right","354px")

	d3.select("#shrubs100")
		.style("display","block")
		.transition()
		.style("right","94px")
	d3.select("#shrubs50")
		.transition()
		.style("right","321px")
}
function hide100(){
	d3.select("#building_container_50")
		.transition()
		.style("right",30)
	d3.select("#building_container_100")
		.transition()
		.style("right",-350)
		.each("end", function(){
			d3.select(this).style("display","none")
		})

	d3.select("#path100")
		.transition()
		.style("right","-225px")
		.each("end", function(){
			d3.select(this).style("display","none")
		})
	d3.select("#path50")
		.style("display","block")
		.transition()
		.style("right","125px")

	d3.select("#shrubs100")
		.transition()
		.style("right","-225px")
		.each("end", function(){
			d3.select(this).style("display","none")
		})
	d3.select("#shrubs50")
		.style("display","block")
		.transition()
		.style("right","94px")
}

function update1(progress){
}
  /**
   * activate -
   *
   * @param index - index of the activated section
   */
  chart.activate = function(index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function(i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
   * update
   *
   * @param index
   * @param progress
   */
  chart.update = function(index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};

function init(){
	W = window.innerWidth;
	w = W/5
	x = w/2 - 25
	d3.select("#nav_arrow")
		.style("left",x)
  drawGaps(DEFAULT_CONFIG, false)
  var plot = scrollVis();
  plot.call()

  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function(index) {

    // highlight current step text
    // d3.selectAll('.step')
    //   .style('opacity',  function(d,i) { return i == index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function(index, progress){
    plot.update(index, progress);
  });
}


d3.selectAll(".page-scroll")
    .on("click", function(){
    	var scrollTo = $(this).data("scroll")
    	var offset = (d3.select(".navTab.mobile").style("display") == "block") ? 65 : 205;
        $("html, body").animate({ scrollTop: $("#" + scrollTo).offset().top-offset }, 1000);    
    })

d3.selectAll(".control")
	.on("input",function(){
			// hideSign();

			if(d3.select(this).classed("tax_credit_equity")){
				if(this.value != 0 && this.value != "0.0%"){
					d3.select(this).attr("data-oldval",parseFloat(this.value.replace("%","")))
				}

			}
			if(d3.select(this).classed("percent_of_rent")){
				d3.select("#percent_of_rent_label i").text(PERCENT_SMALL(this.value))
				if(this.value > .3){
					showWarning("rent_high")
				}else{ hideWarning("rent_high")}
			}
			if(d3.select(this).classed("average_monthly_rent")){
				if(d3.select(this).classed("range")){
					countup_val("ami_label_val",this.value*30)
					countup_val("gap_container_50_ami",this.value*30)
					countup_val("gap_container_100_ami",this.value*30)
					countup_val("print_gap_container_50_ami",this.value*30)
					countup_val("print_gap_container_100_ami",this.value*30)

				}else{
					countup_val("ami_label_val",parseFloat(this.value.replace("%",""))*.3)
					countup_val("gap_container_50_ami",parseFloat(this.value.replace("%",""))*.3)
					countup_val("gap_container_100_ami",parseFloat(this.value.replace("%",""))*.3)
					countup_val("print_gap_container_50_ami",parseFloat(this.value.replace("%",""))*.3)
					countup_val("print_gap_container_100_ami",parseFloat(this.value.replace("%",""))*.3)

				}
				if((this.value>2 && d3.select(this).classed("range")) || (parseFloat(this.value.replace("%",""))>200 && d3.select(this).classed("text"))){

					if(d3.select(".tax_credit_equity.range").node().value != 0){
						d3.select(".tax_credit_equity.range").attr("data-oldval",d3.select(".tax_credit_equity.range").node().value)
					}
					d3.select(".tax_credit_equity.text").node().value = "0.0%"
					d3.select(".tax_credit_equity.text").attr("value", "0.0%")
					d3.select(".tax_credit_equity.range").node().value = 0
					d3.select(".tax_credit_equity.range").attr("value", 0)
					d3.select("#gap_container_50_credit").text("No")
					d3.select("#gap_container_100_credit").text("No")
					d3.select("#print_gap_container_50_credit i").text("No")
					d3.select("#print_gap_container_100_credit i").text("No")

					// d3.select(".control_container.tax_credit_equity").classed("disabled", true)
					showWarning("tax_credit_equity", true)
				}else{
					oldval = d3.select(".tax_credit_equity.range").attr("data-oldval")
					d3.select(".tax_credit_equity.text").node().value = oldval * 100 + "%"
					d3.select(".tax_credit_equity.text").attr("value", oldval * 100 + "%")
					d3.select(".tax_credit_equity.range").node().value = oldval
					d3.select(".tax_credit_equity.range").attr("value", oldval)
					d3.select("#gap_container_50_credit").text(function(){
						return (d3.select("#s1").classed("off")) ? "No" : "With"
					})
					d3.select("#gap_container_100_credit").text(function(){
						return (d3.select("#s2").classed("off")) ? "No" : "With"
					})
					d3.select("#print_gap_container_50_credit i").text(function(){
						return (d3.select("#s1").classed("off")) ? "No" : "With"
					})
					d3.select("#print_gap_container_100_credit i").text(function(){
						return (d3.select("#s2").classed("off")) ? "No" : "With"
					})
					// d3.select(".control_container.tax_credit_equity").classed("disabled", false)
					hideWarning("tax_credit_equity", true)

				}
			}


		if(this.type == "text"){
			// return false
			if(d3.select(this).classed("new_source_label")){
				return false;
			}
			var val;
			if(d3.select(this).classed("percent") || d3.select(this).classed("percent_small")){
				val = parseFloat(this.value)/100
			}else val = parseFloat(this.value)
			var range = d3.select("." + this.id.split("text_")[1] + ".range")
			if(val >= parseFloat(range.attr("min")) && val <= parseFloat(range.attr("max"))){
				d3.select(this).classed("invalid",false)
				d3.select(d3.select(this).node().parentNode).classed("invalid",false)
				range.attr("value", val)
				range.node().value = val
				var config = updateDefaultsFromDashboard(true)
				drawGaps(config, true)

			}else{
				d3.select(this).classed("invalid",true)
				d3.select(d3.select(this).node().parentNode).classed("invalid",true)
				hideWarning(this.id.replace("text_",""))

				showWarning(this.id.replace("text_",""), undefined, true)
			}
			d3.select("." + this.id.split("text_")[1] + ".range")
				.attr("value", val)

		}else{

			var config = updateDefaultsFromDashboard(false)
			var val;
			if(d3.select(this).classed("percent")) val = PERCENT(this.value);
			else if(d3.select(this).classed("percent_small")) val = PERCENT_SMALL(this.value);
			else if(d3.select(this).classed("dollar")) val = DOLLARS(this.value);
			else val = this.value;

			d3.select("." + this.id.split("range_")[1] + ".text")
				.attr("value", val)
				.classed("invalid",false)
			d3.select("." + this.id.split("range_")[1] + ".text")
				.node().value = val
			
			drawGaps(config, false)
		}
	})

d3.select("#sources")
			.datum({"count":0})

d3.select(".control_container.new_source_button")
	.on("click", function(){
		var new_source = d3.select("#sources")
			.append("div")
			.attr("class", "control_container new_source")
		new_source.append("input")
			.attr("type","text")
			.attr("value","Other Source")
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
				// hideSign();
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
				// hideSign()
				var config = updateDefaultsFromDashboard(true);
				// config["50"]["sources"]["other_source_" + d.count] = this.value
				drawGap("100",config, true)
			})

	})


d3.selectAll(".navTab.navTab4")
	.on("click", function(){
		if(d3.select("#contractor").style("display") == "block"){
			var small = d3.select("#contractor").style("display") == "none"


			if(d3.select("#credits").classed("visible")){ return false}

			d3.select("#mouth")
				.transition()
				.duration(100)
				.style("height","8px")

			highlightSection(4)
			var bottom = 3*(window.innerHeight - 553)/4
			var right = window.innerHeight - bottom - 553
			var r = parseFloat(d3.select("#ground_container").node().getBoundingClientRect().width)*.36 + 37

			d3.select("#credits")
				.classed("visible", true)
				.transition()
				.ease("back")
				.duration(1200)
				.style("bottom",bottom)
				.style("right",right)
				.style("width","473px")
				.style("height","553px")
				.style("transform","rotate(360deg")
				.each("end", function(){
					d3.select("#hand")
						.style("z-index","99999")
				})

			var spinLock = {},
			    fadeLock = {};
			d3.select("#text_credits")
			    .call(spin, 1200)
			    .call(fade, 1200);

			function spin(path, duration) {
			  d3.select(spinLock).transition()
			      .duration(duration)
			      .ease("back")
			      .tween("style:bottom", function() {
			        var i = d3.interpolateString("56px", bottom + "px");
			        return function(t) { path.style("bottom", i(t)); };
			      })
			      .tween("style:right", function() {
			        var i = d3.interpolateString(r + "px", right + "px");
			        return function(t) { path.style("right", i(t)); };
			      })
			      .tween("style:width", function() {
			        var i = d3.interpolateString("72px", "473px");
			        return function(t) { path.style("width", i(t)); };
			      })
			      .tween("style:height", function() {
			        var i = d3.interpolateString("53px", "553px");
			        return function(t) { path.style("height", i(t)); };
			      })
			      .tween("style:transform", function() {
			        var i = d3.interpolateString("rotate(77deg)", "rotate(360deg)");
			        return function(t) { path.style("transform", i(t)); };
			      })
			}

			function fade(path, duration) {
			  d3.select(fadeLock).transition()
			      .duration(duration)
			      .delay(700)
			      .tween("style:opacity", function() {
			        var i = d3.interpolateNumber(0, 1);
			        return function(t) { path.style("opacity", i(t)); };
			      })
			      .tween("style:box-shadow", function() {
			        var i = d3.interpolateString("0px 0px 0px #888888", "4px 4px 16px #888888");
			        return function(t) { path.style("box-shadow", i(t)); };
			      })
			}
		}else{
			d3.select("#mobile_credits")
				.style("opacity",1)
				.style("pointer-events","visible")
		}
		
});


d3.select(".close_button.credits")
	.on("click", hideCredits)
d3.select(".close_button.mobile_credits")
	.on("click", function(){
		d3.select("#mobile_credits")
			.style("opacity",0)
			.style("pointer-events","none")
	})
d3.select(".close_button.rollover_button")
	.on("click", function(){
		d3.select("#mobile_rollover_text")
			.style("opacity",0)
			.style("pointer-events","none")
	})
d3.select(".close_button.warning")
	.on("click", function(){
		d3.select("#warning_sign")
			.style("pointer-events","none")
			.transition()
			.style("opacity",0)
	})
$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
     	if(d3.select("#credits").classed("visible")) { hideCredits() }
    }
});

function hideCredits(){

	if(!d3.select("#credits").classed("visible")){ return false}
	if(d3.selectAll(".warning")[0].length == 0 && d3.selectAll(".disabled")[0].length == 0){
		d3.select("#mouth")
			.transition()
			.duration(100)
			.style("height","0px")
	}
	d3.select("#hand")
		.style("z-index","10000000")	
    // right: calc(36% + 34px);
	var bottom = 3*(window.innerHeight - 553)/4
	var right = window.innerHeight - bottom - 553
	var r = parseFloat(d3.select("#ground_container").node().getBoundingClientRect().width)*.36 + 37

	d3.select("#credits")
		.classed("visible", false)	
		.transition()
		.ease("linear")
		.duration(600)
		.style("bottom","69px")
		.style("right",r)
		.style("width","72px")
		.style("height","53px")
		.style("transform","rotate(77deg")



	var spinLock = {},
	    fadeLock = {};
	d3.select("#text_credits")
	    .call(despin, 600)
	    .call(defade, 200);

	function despin(path, duration) {
	  d3.select(spinLock).transition()
	      .duration(duration)
	      .ease("linear")
	      .tween("style:bottom", function() {
	        var i = d3.interpolateString(bottom + "px","56px");
	        return function(t) { path.style("bottom", i(t)); };
	      })
	      .tween("style:right", function() {
	        var i = d3.interpolateString(right+50 + "px",r + "px");
	        return function(t) { path.style("right", i(t)); };
	      })
	      .tween("style:width", function() {
	        var i = d3.interpolateString("422px","72px");
	        return function(t) { path.style("width", i(t)); };
	      })
	      .tween("style:height", function() {
	        var i = d3.interpolateString("273px","53px");
	        return function(t) { path.style("height", i(t)); };
	      })
	      .tween("style:transform", function() {
	        var i = d3.interpolateString("rotate(0deg)","rotate(77deg)");
	        return function(t) { path.style("transform", i(t)); };
	      })
	}

	function defade(path, duration) {
	  d3.select(fadeLock).transition()
	      .duration(duration)
	      // .delay(400)
	      .tween("style:opacity", function() {
	        var i = d3.interpolateNumber(1, 0);
	        return function(t) { path.style("opacity", i(t)); };
	      })
	      .tween("style:box-shadow", function() {
	        var i = d3.interpolateString("4px 4px 16px #888888","0px 0px 0px #888888");
	        return function(t) { path.style("box-shadow", i(t)); };
	      })
	}
}

function highlightSection(i){
	d3.selectAll(".navTab")
		.classed("active",false)
	d3.select(".navTab" + String(i))
		.classed("active",true)
	var offset = (d3.select(".navTab.mobile").style("display") == "block") ? .19 : .2;
	W = window.innerWidth;
	w = W*offset
	x = i*w + w/2 - 18
	d3.select("#nav_arrow")
		.transition()
		.style("left",x)
}

var show1 = 0;
d3.select("#s1").on("click", function () {
    if (show1 == 1) {
        d3.select("#s1.switch")
            .attr("class", "switch small off")
            .transition()
            .style("background-color","#696969")

        d3.select("#gap_container_50_credit").text("No")
        d3.select("#print_gap_container_50_credit i").text("No")


        var config = updateDefaultsFromDashboard();
        config["50"]["sources"]["tax_credit_equity"] = 0
        drawGaps(config, true)
        show1 = 0;
    } else {
        d3.select("#s1.switch")
            .attr("class", "switch small on")
            .transition()
            .style("background-color","#1696d2")
        
        d3.select("#print_gap_container_50_credit i").text("With")
        d3.select("#gap_container_50_credit").text("With")
        showWarning("tax_credit_50")


        var config = updateDefaultsFromDashboard();
        var amt = 7550000 * parseFloat(d3.select("#text_tax_credit_equity").attr("value"))/100
        config["50"]["sources"]["tax_credit_equity"] = amt
        // d3.select("#s50_tax_credit_equity").text(amt)
        drawGaps(config, true)

        show1 = 1;
    }
});

var show2 = 1;
d3.select("#s2").on("click", function () {
    if (show2 == 1) {
        d3.select("#s2.switch")
            .attr("class", "switch small off")
            .transition()
            .style("background-color","#696969")

		d3.select("#print_gap_container_100_credit i").text("No")
        d3.select("#gap_container_100_credit").text("No")

        var config = updateDefaultsFromDashboard();
        config["100"]["sources"]["tax_credit_equity"] = 0
        drawGaps(config, true)
        show2 = 0;
    } else {
        d3.select("#s2.switch")
            .attr("class", "switch small on")
            .transition()
            .style("background-color","#1696d2")

        d3.select("#print_gap_container_100_credit i").text("With")
        d3.select("#gap_container_100_credit").text("With")


        var config = updateDefaultsFromDashboard();
        var amt = 8300000 * parseFloat(d3.select("#text_tax_credit_equity").attr("value"))/100
        config["100"]["sources"]["tax_credit_equity"] = amt
        // d3.select("#s50_tax_credit_equity").text(amt)
        drawGaps(config, true)

        show2 = 1;
    }
});


d3.selectAll(".rollover")
	.on("mouseover", function(){
		if(TABLET){
			console.log("mobile")
			var msg = help_msgs[this.id.replace("rollover_","help_")]
			var right = this.getBoundingClientRect().right
			var top = this.getBoundingClientRect().top
			d3.select("#mobile_rollover_text")
				.style("opacity",1)
				.style("pointer-events","visible")	
				.select("span")
				.text(msg)
	
		}else{
			var msg = help_msgs[this.id.replace("rollover_","help_")]
			var right = this.getBoundingClientRect().right
			var top = this.getBoundingClientRect().top
			d3.select("#rollover_text")
				.text(msg)
				.style("display","block")
				.style("left",right + 15)
				.style("top",function(){
					return top + 10 - this.getBoundingClientRect().height/2
					
				})
		}
	})
	.on("mouseout", function(){
		d3.select("#rollover_text")
			.style("display","none")
	})
d3.selectAll(".help-button")
	.on("mouseover", function(){
		if(TABLET){
			var msg = help_msgs[this.id]
			d3.select("#mobile_rollover_text")
				.style("opacity",1)
				.style("pointer-events","visible")	
				.select("span")
				.text(msg)
		}else{
			var msg = help_msgs[this.id]
			d3.select(this)
				.style("z-index",100)
				.append("div")
				.attr("class","help-text")
				.text(msg)
			d3.selectAll(".help-text")
				.style("top",function(){
					return 6-1*this.getBoundingClientRect().height/2
				})
		}
	})
	.on("mouseout", function(){
		d3.selectAll(".help-button")
			.style("z-index",99)
		d3.selectAll(".help-text").remove();
	})
d3.select("#reset-button").on("click", reset);
var RENT_SCALE = .5
d3.selectAll(".button_toggle")
	.on("click", function(){
		if(d3.select(this).classed("on")){
			d3.select(this).classed("on", false)
			d3.select(this).classed("off", true)
			var config = updateDefaultsFromDashboard();
			if(this.id == "vacancy"){
				if(d3.select("#interest").classed("on")){
					config["interest_rate"] = 0.03;
				}
				drawGaps(config, true)
			}
			else if(this.id == "interest"){
				if(d3.select("#vacancy").classed("on")){
					config["vacancy_rate"] = 0.03;
				}
				drawGaps(config, true)
			}
			else if(this.id == "sixty_ami"){
				if(d3.select("#fifty_rent").classed("on")){
					config["50"]["average_monthly_rent"] = 487.60 * (RENT_SCALE/.3);
					config["100"]["average_monthly_rent"] = 489.35 * (RENT_SCALE/.3);						
				}
				drawGaps(config, true)
			}
			else if(this.id == "fifty_rent"){

				hideWarning("rent_high")
				if(d3.select("#sixty_ami").classed("on")){
					config["50"]["average_monthly_rent"] = 487.60 * (.6/.3);
					config["100"]["average_monthly_rent"] = 489.35 * (.6/.3);						
				}
				drawGaps(config, true)
			}
			else if(this.id == "no_credit"){
					var config = updateDefaultsFromDashboard();
					d3.select("#gap_container_100_credit").text("No")
					d3.select("#print_gap_container_100_credit i").text("No")
					config["50"]["sources"]["tax_credit_equity"] = 0;
					config["100"]["sources"]["tax_credit_equity"] = 0;
					drawGaps(config, true)
			}
			else{
				reset()
			}
		}else{
			d3.select(this).classed("on", true)
			d3.select(this).classed("off", false)

			var id = this.id;
			var config = updateDefaultsFromDashboard();
			switch(id){
				case "public_land":
					config["50"]["uses"]["acquisition_costs"] = 0;
					config["50"]["uses"]["acquisition_costs"] = 0;
					break;
				case "vacancy":
					if(d3.select("#interest").classed("on")){
						config["interest_rate"] = 0.03;
					}
					config["vacancy_rate"] = 0.03;
					break;
				case "interest":
					if(d3.select("#vacancy").classed("on")){
						config["vacancy_rate"] = 0.03;
					}
					config["interest_rate"] = 0.03;
					break;
				case "sixty_ami":
					if(d3.select("#fifty_rent").classed("on")){
						config["50"]["average_monthly_rent"] = 487.60 * (.6/.3) * (RENT_SCALE/.3);
						config["100"]["average_monthly_rent"] = 489.35 * (.6/.3) * (RENT_SCALE/.3);
					}else{
						config["50"]["average_monthly_rent"] = 487.60 * (.6/.3);
						config["100"]["average_monthly_rent"] = 489.35 * (.6/.3);						
					}
					countup_val("gap_container_50_ami",60)
					countup_val("gap_container_100_ami",60)
					break;
				case "fifty_rent":
				// base: 50 unit 487.60, 100 unit: 489.35
					showWarning("rent_high")
					if(d3.select("#sixty_ami").classed("on")){
						config["50"]["average_monthly_rent"] = 487.60 * (.6/.3) * (RENT_SCALE/.3);
						config["100"]["average_monthly_rent"] = 489.35 * (.6/.3) * (RENT_SCALE/.3);
					}else{
						config["50"]["average_monthly_rent"] = 487.60 * (RENT_SCALE/.3);
						config["100"]["average_monthly_rent"] = 489.35 * (RENT_SCALE/.3);						
					}
					break;

				case "no_credit":
					d3.select("#print_gap_container_100_credit i").text("With")
					d3.select("#gap_container_100_credit").text("With")
					reset()
			}
			drawGaps(config, true)
		}
	})


function reset(){
	d3.selectAll(".button_toggle").classed("on",false)
	d3.selectAll(".button_toggle").classed("off",true)
	d3.select("#no_credit").classed("on",true)
	d3.selectAll(".disabled").classed("disabled", false)
	d3.selectAll(".control_container.warning").classed("warning", false)
	d3.select("#renter_row_two.warning").classed("warning",false)
	d3.select("#percent_of_rent_label i").text("30%")
	d3.select("#ami_label_val").text("30")
	d3.selectAll(".warning_icon").remove()


	d3.select("#gap_container_100_credit").text("With")
	d3.select("#gap_container_50_credit").text("No")
	d3.select("#print_gap_container_100_credit i").text("With")
	d3.select("#print_gap_container_50_credit i").text("No")
    d3.select("#s1.switch")
        .attr("class", "switch small off")
        .transition()
        .style("background-color","#696969")

    d3.select("#s2.switch")
        .attr("class", "switch small on s100")
        .transition()
        .style("background-color","#1696d2")

    var config = updateDefaultsFromDashboard();
    config["50"]["sources"]["tax_credit_equity"] = 0
    drawGaps(config, true)
    show1 = 0;
    show2 = 1;

	d3.selectAll(".control.other_source").attr("value","$0")
	d3.selectAll(".control.other_source")
		.each(function(){
			this.value = "0%";
		});
	d3.selectAll(".control_container.new_source")
		.transition()
		.style("height","0px")
		.each("end", function(){
			d3.select(this).remove();
		})
	d3.selectAll(".control.text.percent_small").attr("value","100%")
	d3.selectAll(".control.text.percent_small")
		.each(function(){
			this.value = "100%"
		});
	d3.selectAll(".control.range.percent_small").attr("value","1")
	d3.selectAll(".control.range.percent_small")
		.each(function(){
			this.value = "1"
		});

	d3.select("#text_percent_of_rent").attr("value","30%")
	d3.selectAll("#text_percent_of_rent")
		.each(function(){
			this.value = "30%"
		});
	d3.select("#range_percent_of_rent").attr("value",".3")
	d3.select("#range_percent_of_rent")
		.each(function(){
			this.value = ".3"
		});
	var config = updateDefaultsFromDashboard()
	countup_val("gap_container_50_ami",30)
	countup_val("gap_container_100_ami",30)
	countup_val("print_gap_container_50_ami",30)
	countup_val("print_gap_container_100_ami",30)
	drawGaps(config, true)
}
var SMALL_DESKTOP,
	MOBILE,
	TABLET;
function resizeFeature(){
	SMALL_DESKTOP = d3.select("#small_desktop").style("display") == "block"
	MOBILE = d3.select("#mobile").style("display") == "block"
	TABLET = d3.select("#tablet").style("display") == "block"
	d3.selectAll("#mobile_fader").remove();
	var W = window.innerWidth;
	var H = window.innerHeight;
	var msvg = d3.select("body")
		.append("svg")
		.attr("id","mobile_fader")
		.attr("height", H/2)
		.attr("width",W)
	var grad = msvg.append("defs")
		.append("linearGradient")
		.attr("id","mobile_gradient")
		.attr("x1","0")
		.attr("x2","0")
		.attr("y1","0")
		.attr("y2","1")
	grad.append("stop")
		.attr("offset","0%")
		.attr("stop-color","#cbeaf5")
		.attr("stop-opacity","0")

	grad.append("stop")
		.attr("offset","10%")
		.attr("stop-color","#cbeaf5")
		.attr("stop-opacity",".9")

	grad.append("stop")
		.attr("offset","100%")
		.attr("stop-color","#cbeaf5")
		.attr("stop-opacity","1")

	msvg.append("rect")
		.attr("x","0")
		.attr("y","0")
		.attr("width",W)
		.attr("height",H/2)
		.attr("fill","url(#mobile_gradient)")
  // <defs>
  //     <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
  //       <stop offset="0%" stop-color="red"/>
  //       <stop offset="50%" stop-color="black" stop-opacity="0"/>
  //       <stop offset="100%" stop-color="blue"/>
  //     </linearGradient>
  // </defs>
		// msvg.append
		  // <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>

	

}
resizeFeature();
window.onresize = resizeFeature;



window.onload = addListeners;

function addListeners(){
    document.getElementById('warning_sign').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
  var div = document.getElementById('warning_sign');
  // div.style.position = 'fixed';
  div.style.bottom = window.innerHeight-div.getBoundingClientRect().height*.5-e.clientY + 'px';
  div.style.right = window.innerWidth-div.getBoundingClientRect().width*.5-e.clientX + 'px';
}