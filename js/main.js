var DEFAULT_CONFIG = {
		"vacancy_rate" : 0.07,
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
			"average_monthly_rent" : 489.35 ,
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

function drawGap(units, config){
	var max_dollars =  20024637;
	var max_pixels = 500;
	function scaleDollars(dollars){
		return (dollars/max_dollars) * max_pixels
	}
	var resp = update(units, config)
	// d3.select("#building_" + units)
	// 	.html(resp.total_development_cost + " - " + resp.total_sources + " = <strong>" + resp.gap + "</strong>")

	d3.select("#test_building_" + units)
		.style("height", function(){
			return scaleDollars(resp.total_development_cost) - scaleDollars(resp.gap)
		})
		.style("margin-top", function(){
			return max_pixels - scaleDollars(resp.total_development_cost) + scaleDollars(resp.gap)
		})
		.style("border-bottom-width", function(){
			return scaleDollars(resp.total_development_cost)-scaleDollars(resp.gap)
		})
	console.log(scaleDollars(resp.total_development_cost), scaleDollars(resp.gap))
}
function update(units, config){
	var effective_gross_income = getEffectiveGrossIncome(units, config.vacancy_rate, config[units]["average_monthly_rent"])
	var noi = getNOI(units, config[units]["admin_expenses"], config[units]["operating_expenses"], config[units]["maintenance_expenses"], config.replacement_reserve_rate, effective_gross_income)
	var max_loan_income = getMaxLoanIncome(noi, config.debt_service_coverage, config.interest_rate)
	var max_loan_value = getMaxLoanValue(noi, config.capitalization_rate, config.loan_to_value)
	var max_loan = Math.min(max_loan_value, max_loan_income)
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

function init(){
	drawGap("50", DEFAULT_CONFIG)
	drawGap("100", DEFAULT_CONFIG)
}