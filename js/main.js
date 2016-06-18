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
				"deferred_developer_fee" : 372464.0,
				"tax_credit_equity" : 0

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
	var max_dollars =  40400000;
	var max_pixels = (window.innerHeight-90-60);
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
	}else if(gap < 0){
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
		d3.select("#crane")
			.transition()
			.duration(1500)
			.style("right", function(){
				d3.select(this).style("display","block")
				if(1-(gap/total_development_cost) < bg_break_50_crane){
					return -130;
				}
				else{
					return -800
				}
			})
			.each("end", function(){
				if(1-(gap/total_development_cost) >= bg_break_50_crane){
					d3.select(this).style("display","none")
				}
			})
			
		// d3.select("#road")
		// 	.transition()
		// 	.style("opacity", function(){
		// 		if(1-(gap/total_development_cost) > bg_break_50_road){ return 1;}
		// 		else{ return 0;}
		// 	})
		// d3.select("#sidewalk")
		// 	.transition()
		// 	.style("opacity", function(){
		// 		if(1-(gap/total_development_cost) > bg_break_50_sidewalk){ return 1;}
		// 		else{ return 0;}
		// 	})
		// d3.select("#grass")
		// 	.transition()
		// 	.style("opacity", function(){
		// 		if(1-(gap/total_development_cost) > bg_break_50_grass){ return 1;}
		// 		else{ return 0;}
		// 	})
	}

	// if(transition){
	// 	d3.select("#roof_img_" + units)
	// 		.transition()
	// 		.style("bottom", function(){
	// 			return (scaleDollars(total_development_cost) - roof_height) + "px"
	// 		})
	// 		.style("opacity",function(){
	// 			if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
	// 				return 0;
	// 			}else return 1
	// 		})
	// 	d3.select("#roof_" + units)
	// 		.style("opacity",function(){
	// 			if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
	// 				return 0;
	// 			}else return 1
	// 		})
	// 		.transition()
	// 		.style("height", Math.max(0,parseFloat(-scaleDollars(gap) + roof_height)) + "px")
	// 		.style("bottom", function(){
	// 			return (scaleDollars(total_development_cost) - roof_height) + "px"
	// 		})


	// }else{
	// 	d3.selectAll(".roofs_" + units)
	// 		.style("bottom", function(){
	// 			return (scaleDollars(total_development_cost) - roof_height) + "px"
	// 		})
	// 		.style("opacity",function(){
	// 			if(scaleDollars(total_development_cost) - roof_height < break_50_roof){
	// 				return 0;
	// 			}else return 1
	// 		})
	// }
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
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < 228){
					return window.innerHeight-228
				}else{
					return scaleDollars(total_development_cost) + 20
				}
			})
			.style("background-color", function(){
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < 228){
					return "rgba(38,31,32,.8)"
				}else{
					return "rgba(38,31,32,1)"
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
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < 228){
					return window.innerHeight-228
				}else{
					return scaleDollars(total_development_cost) + 20
				}
			})
			.style("background-color", function(){
				if(window.innerHeight - (scaleDollars(total_development_cost) + 20) < 228){
					return "rgba(38,31,32,.8)"
				}else{
					return "rgba(38,31,32,1)"
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
	var prefix = (val_id == "ami_label_val" || val_id.search("vacancy_rate") != -1 || val_id.search("debt_service_coverage") != -1 || val_id.search("interest_rate") != -1 || val_id.search("capitalization_rate") != -1 || val_id.search("loan_to_value") != -1) ? "" : "$"
	var suffix = (val_id.search("vacancy_rate") != -1 || val_id.search("interest_rate") != -1 || val_id.search("capitalization_rate") != -1 || val_id.search("loan_to_value") != -1) ? "%" : ""
	var precision;
	if(val_id.search("vacancy_rate") != -1 || val_id.search("loan_to_value") != -1) { precision = 1}
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
			.style("top","13px")
	}else{
		d3.selectAll(".larger").classed("larger",false)
		d3.selectAll(".loan_income").classed("larger", true)
		d3.selectAll(".debt_marker")
			.transition()
			.style("top","33px")
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
	if(d3.select(".switch").classed("on")){
		config["50"]["sources"]["tax_credit_equity"] = 7550000
		original["50"]["sources"]["tax_credit_equity"] = 7550000
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
			if(parseFloat(this.value) < 1){
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
	// console.log(control)
	hideCredits();
	var newClass = (typeof(disabled) == "undefined") ? "warning" : "disabled"
	var msgID;

	if(typeof(disabled) != "undefined"){ msgID = control + "_disabled"}
	else if(typeof(invalid) != "undefined"){ msgID = control + "_invalid"}
	else{ msgID = control}
	// console.log(msgID)
	var container;
	if(control == "noi_label"){
		container = d3.select(".noi.explainer")
	}else{
		container = d3.select(d3.select("#range_"+control).node().parentNode)
	}


	d3.select("#mouth")
		.transition()
		.duration(100)
		.style("height","8px")
	// var container = d3.select(d3.select("#range_"+control).node().parentNode)
	container.classed(newClass,true)
	if(container.selectAll(".warning_icon")[0].length == 0){
		if(typeof(disabled) != "undefined"){ msgID = control + "_disabled"}
		else if(typeof(invalid) != "undefined"){ msgID = control + "_invalid"}
		else{ msgID = control}
		  var max=null;
		  $(".warning_icon img").each(function() {
		    var order = parseInt($(this).data("order"), 10);
		    if ((max===null) || (order > max)) { max = order; }
		  });
		var opacity = (SMALL_DESKTOP) ? 0 : 1;
		// d3.select("body").classed("small_desktop", SMALL_DESKTOP)
		var icon = container
			.append("div")
			.attr("class","warning_icon")
			.append("img")
			.attr("src","images/error.png")
			.attr("data-order",max+1)
			.on("mouseover",function(){
				var hoverID = msgID
				d3.select("#warning_sign")
					.style("opacity",1)
					.text(error_msgs[hoverID])
			})
			.on("mouseout", function(){
				d3.select("#warning_sign")
					.transition()
					.style("opacity",opacity)
			})
		
		d3.select("#warning_sign")
				.transition()
				.style("opacity",1)
				// .each("start", function(){
				// 	d3.select(this).classed("done", false)
				// })
				// .each("end", function(){
				// 	d3.select("body").classed("small_desktop", SMALL_DESKTOP)
				// })
				.transition()
				.delay(2000)
				.duration(1400)
				.style("opacity",opacity)

		// if(SMALL_DESKTOP){

		// }
		console.log(msgID)
		d3.select("#warning_sign").text(error_msgs[msgID])

	}
}
function hideSign(){
	if(d3.select("body").classed("small_desktop")){
		d3.select("#warning_sign").transition().style("opacity",0)
	}
}
d3.select("body")
	.on("click",hideSign)

function hideWarning(control){
	if(control == "noi_label"){
		container = d3.select(".noi.explainer")
	}else{
		container = d3.select(d3.select("#range_"+control).node().parentNode)
	}
	container.classed("warning",false)
	container.classed("disabled",false)
	container.selectAll(".warning_icon").remove()
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
		}
		return false
	}
	var msgID;
	var helpID = $(".warning_icon img[data-order=" + max + "]").parent().siblings(".help-button")[0].id.replace("help_","")
	if(d3.select(d3.select("#help_" + helpID).node().parentNode).classed("invalid")){ msgID = helpID+ "_invalid"}
  	else if(d3.select(d3.select("#help_" + helpID).node().parentNode).classed("disabled")){ msgID = helpID+ "_disabled"}
  	else if(helpID == "noi") { msgID = "noi_label"}
	else{ msgID = helpID}
	// console.log(msgID)
	d3.select("#warning_sign").text(error_msgs[msgID])

	if(mouthShouldClose()){
		d3.select("#mouth")
			.transition()
			.duration(100)
			.style("height","0px")
		d3.select("#warning_sign")
				.transition()
				.style("opacity",0)
	}
}
function mouthShouldClose(){
	return (d3.selectAll(".warning")[0].length == 0 && d3.selectAll(".disabled")[0].length == 0 && !d3.select("#credits").classed("visible"))
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
    activateFunctions[1] = dummy1;
    activateFunctions[2] = dummy2;
    activateFunctions[3] = dummy2;
    activateFunctions[4] = dummy3;
    activateFunctions[5] = dummy4;
    activateFunctions[6] = dummy4;
    activateFunctions[7] = dummy4;
    activateFunctions[8] = dummy5;
    // activateFunctions[9] = dummy3;
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
	show100()
}
function dummy5(){
	reset();
	highlightSection(3)
}

function show100(){


	d3.select("#building_container_50")
		.transition()
		.style("right",260)

	d3.select("#building_container_100")
		.style("display","block")
		.transition()
		.style("right",30)
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
        $("html, body").animate({ scrollTop: $("#" + scrollTo).offset().top-205 }, 1000);    
    })

d3.selectAll(".control")
	.on("input",function(){
			hideSign();
			if(d3.select(this).classed("tax_credit_equity")){
				if(this.value != 0 && this.value != "0.0%"){
					d3.select(this).attr("data-oldval",parseFloat(this.value.replace("%","")))
				}

			}
			if(d3.select(this).classed("average_monthly_rent")){
				if(d3.select(this).classed("range")){
					countup_val("ami_label_val",this.value*30)
				}else{ countup_val("ami_label_val",parseFloat(this.value.replace("%",""))*.3) }
				if((this.value>2 && d3.select(this).classed("range")) || (parseFloat(this.value.replace("%",""))>200 && d3.select(this).classed("text"))){
					if(d3.select(".tax_credit_equity.range").node().value != 0){
						d3.select(".tax_credit_equity.range").attr("data-oldval",d3.select(".tax_credit_equity.range").node().value)
					}
					d3.select(".tax_credit_equity.text").node().value = "0.0%"
					d3.select(".tax_credit_equity.text").attr("value", "0.0%")
					d3.select(".tax_credit_equity.range").node().value = 0
					d3.select(".tax_credit_equity.range").attr("value", 0)
					// d3.select(".control_container.tax_credit_equity").classed("disabled", true)
					showWarning("tax_credit_equity", true)
				}else{
					oldval = d3.select(".tax_credit_equity.range").attr("data-oldval")
					d3.select(".tax_credit_equity.text").node().value = oldval * 100 + "%"
					d3.select(".tax_credit_equity.text").attr("value", oldval * 100 + "%")
					d3.select(".tax_credit_equity.range").node().value = oldval
					d3.select(".tax_credit_equity.range").attr("value", oldval)
					// d3.select(".control_container.tax_credit_equity").classed("disabled", false)
					hideWarning("tax_credit_equity", true)

				}
			}


		if(this.type == "text"){
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
			// d3.select("." + this.id.split("text_")[1] + ".range")
				// .attr("value", val)

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

d3.select(".control_container.new_source")
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
				hideSign();
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
				hideSign()
				var config = updateDefaultsFromDashboard(true);
				// config["50"]["sources"]["other_source_" + d.count] = this.value
				drawGap("100",config, true)
			})

	})


d3.select("#about_project")
	.on("click", function(){


		if(d3.select("#credits").classed("visible")){ return false}

		d3.select("#mouth")
			.transition()
			.duration(100)
			.style("height","8px")

		highlightSection(4)
		d3.select("#credits")
			.classed("visible", true)
			.transition()
			.ease("back")
			.duration(1200)
			.style("bottom","359px")
			.style("right","253px")
			.style("width","422px")
			.style("height","273px")
			.style("transform","rotate(360deg")

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
		        var i = d3.interpolateString("56px", "359px");
		        return function(t) { path.style("bottom", i(t)); };
		      })
		      .tween("style:right", function() {
		        var i = d3.interpolateString("607px", "253px");
		        return function(t) { path.style("right", i(t)); };
		      })
		      .tween("style:width", function() {
		        var i = d3.interpolateString("72px", "422px");
		        return function(t) { path.style("width", i(t)); };
		      })
		      .tween("style:height", function() {
		        var i = d3.interpolateString("53px", "273px");
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
		
});


d3.select(".close_button")
	.on("click", hideCredits)
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

	d3.select("#credits")
		.classed("visible", false)	
		.transition()
		.ease("linear")
		.duration(600)
		.style("bottom","69px")
		.style("right","607px")
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
	        var i = d3.interpolateString("359px","56px");
	        return function(t) { path.style("bottom", i(t)); };
	      })
	      .tween("style:right", function() {
	        var i = d3.interpolateString("253px","607px");
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
	W = window.innerWidth;
	w = W/5
	x = i*w + w/2 - 25
	d3.select("#nav_arrow")
		.transition()
		.style("left",x)
}

var show1 = 0;
d3.select("#s1").on("click", function () {
    if (show1 == 1) {
        d3.select("#s1.switch")
            .attr("class", "switch off")
            .transition()
            .style("background-color","#ececec")

        var config = updateDefaultsFromDashboard();
        config["50"]["sources"]["tax_credit_equity"] = 0
        drawGaps(config, true)
        show1 = 0;
    } else {
        d3.select("#s1.switch")
            .attr("class", "switch on")
            .transition()
            .style("background-color","#ffffff")

        var config = updateDefaultsFromDashboard();
        var amt = 7550000 * parseFloat(d3.select("#text_tax_credit_equity").attr("value"))/100
        config["50"]["sources"]["tax_credit_equity"] = amt
        // d3.select("#s50_tax_credit_equity").text(amt)
        drawGaps(config, true)

        show1 = 1;
    }
});

d3.selectAll(".help-button")
	.on("mouseover", function(){
		var msg = help_msgs[this.id]
		d3.select(this)
			.append("div")
			.attr("class","help-text")
			.text(msg)
		d3.selectAll(".help-text")
			.style("top",function(){
				return 6-1*this.getBoundingClientRect().height/2
			})
	})
	.on("mouseout", function(){
		d3.selectAll(".help-text").remove();
	})
d3.selectAll(".button_text")
	.on("click", function(){
		var id = this.id;
		var config = updateDefaultsFromDashboard();
		switch(id){
			case "public_land":
				config["50"]["uses"]["acquisition_costs"] = 0;
				config["50"]["uses"]["acquisition_costs"] = 0;
				break;
			case "weak_market":
				config["capitalization_rate"] = 0.1;
				config["loan_to_value"] = .75;
				break;
			case "sixty_ami":
				config["50"]["average_monthly_rent"] = 975;
				config["100"]["average_monthly_rent"] = 979;
				break;
			case "no_credit":
				config["50"]["sources"]["tax_credit_equity"] = 0;
				config["100"]["sources"]["tax_credit_equity"] = 0;
		}
		drawGaps(config, true)
	})


function reset(){
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
	var config = updateDefaultsFromDashboard()
	drawGaps(config, true)
}
var SMALL_DESKTOP;
function resizeFeature(){
	SMALL_DESKTOP = d3.select("#small_desktop").style("display") == "block"
	console.log(SMALL_DESKTOP)
}
resizeFeature();
window.onresize = resizeFeature;

