//Canvas kapitalo lentelei


if ( $("#savings-chart").length ) {
  var canvas = $("#savings-chart");
  
  var data = {
      //Metai
      labels: [0,1,2,3,4,5,6,7,8,9,10],
      // su palukanom
      datasets: [
          {
              label: "Kapitalas su palūkanomis",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(0, 100, 0)",
              borderColor: "rgb(0, 100, 0)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgb(0, 100, 0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0, 100, 0)",
              pointHoverBorderColor: "rgb(0, 100, 0)",
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              pointHitRadius: 10,
              data: [1000, 2279, 3623, 5036, 6522, 8083, 9725, 11450, 13264, 15171, 17175 ],
          },
          //Principal
          {
              label: "Kapitalas",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgb(255, 0, 0)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgb(255, 0, 0)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(255, 0, 0)",
              pointHoverBorderColor: "rgb(255, 0, 0)",
              pointHoverBorderWidth: 2,
              pointRadius: 5,
              pointHitRadius: 10,
              data: [1000, 2200, 3400, 4600, 5800, 7000, 8200, 9400, 10600, 11800, 13000],
          },
      ]
  };
  
  var option = {
  	showLines: true
  };
  var savingsLineChart = Chart.Line(canvas,{
  	data:data,
    	options:option
  });
  
  
  //Add this on Page Load
  $("#savings-results").append("Įveskite informaciją į laukus, kad apskaičiuotumėt prognozuojamą kapitalą.");
  //teorija
  
 // Compound Interest For Principal
  /* P(1 + r/n) ^ nt
  Future Value of a Series
  PMT * (((1 + r/n)^nt - 1) / (r/n)) * (1+r/n) 
  
  A = [Compound Interest for Principal] + [Future Value of a Series]
  
  A = the future value of the investment/loan, including interest
  P = the principal investment amount (the initial deposit or loan amount)
  PMT = the monthly payment
  r = the annual interest rate (decimal)
  n = the number of times that interest is compounded per year AND additional payment frequency
  t = the number of years the money is invested or borrowed for 
  */
  
  //vartotojo ivedimui
  $(".savings-form").change(function() {
  	console.log("Input changed!");
      $("#savings-results").append().empty();
      //Remove from DOM on each change
      $("#savings-chart").html("").html('<canvas id="savings-chart" style="height: 400px; width: 500px"></canvas>');
      //Empty Interest Value Arrays To Recalculate
      data.datasets[0].data = [];
      data.datasets[1].data = [];
      //Empty labels
      data.labels = [];
  
      console.log(data.labels);
  
      var P = $("#start-amount").val().replace(/[^\d\.]/g, '');
      console.log("Starting amount is $" + P);
  
      var t = $("#years").val();
      console.log("Number of years of investment is " + t);
  
      var PMT = $("#contributions-amount").val().replace(/[^\d\.]/g, '');
      console.log("The contribution amount will be " + PMT);
  
      var n = $("#contribution-rate").val();
      // jei pasirenki menesini tampa lygus 12 jei metini lygus 1
      console.log("The number of times contributed anually will be " + n);
  
      // convertuoti palukanas
      var r_percentage = $("#interest-rate-amount").val().replace(/[^\d\.]/g, '');
      var r = parseFloat(r_percentage) / 100.0;
      console.log("The interest rate will be " + r + "%");
  
      // pushinti metus i label array kartu su data array
      for (i = 0; i <= t; i++) {
          data.labels.push(i);
      }
  
      console.log("Here is the first year");
      console.log(data.labels[0]);
  
  
      /*Values for Calculations
      Compound Interest For Principal
      P(1 + r/n) ^ nt
      Future Value of a Series
      PMT * (((1 + r/n)^nt - 1) / (r/n)) * (1+r/n) 
  
      A = [Compound Interest for Principal] + [Future Value of a Series]
  
      A = the future value of the investment/loan, including interest
      P = the principal investment amount (the initial deposit or loan amount)
      PMT = the monthly payment
      r = the annual interest rate (decimal)
      n = the number of times that interest is compounded per year AND additional payment frequency
      t = the number of years the money is invested or borrowed for 
      */
  
      //su palukanom

      for (j = 0; j < data.labels.length; j++) {
          var compound_interest_for_principal = P * (Math.pow(1 + r / n, n * j));
          var a = Math.round(compound_interest_for_principal * 100) / 100;
          var future_value_of_series = ((PMT * n) / r) * (Math.pow(1 + r / n, n * j) - 1)
          var b = Math.round(future_value_of_series * 100) / 100;
          var A = a + b
          var A = A.toFixed(2);
          var A = parseInt(A);
          if (data.datasets[0].data[j] === undefined) {
              data.datasets[0].data[j] = A;
          }
      }
  
      //suma paskutiniu metu su palukanom
      var last_year_sum_interest = data.datasets[0].data[data.datasets[0].data.length - 1];
  
      console.log("Final amount without monthly contributions at 5% annual interest after 10 years");
      console.log(compound_interest_for_principal.toFixed(2) + ". It should be " + "$1,628.89");
      console.log("Total Monthly contributions at 5% annual interest after 10 years");
      console.log(future_value_of_series.toFixed(2));
      console.log("Here are the amounts with interest");
      console.log(data.datasets[0].data);
      console.log("Here is the amount for the last year with interest.")
      console.log(last_year_sum_interest);
  
      //be palukanu 
      for (k = 0; k < data.labels.length; k++) {
          var r = 0;
          var principal_no_interest = P;
          var a = Math.round(principal_no_interest * 100) / 100;
          var monthly_no_interest = PMT * n * k;
          var b = Math.round(monthly_no_interest * 100) / 100;
          var A = a + b;
          var A = A.toFixed(2);
          var A = parseInt(A);
          if (data.datasets[1].data[k] === undefined) {
              data.datasets[1].data[k] = A;
          }
      }
      //animuoti pokyti kai visos reiksmes yra atnaujintos
      savingsLineChart.update();
  
      //suma paskutiniu metu be palukanu
      var last_year_sum_no_interest = data.datasets[1].data[data.datasets[1].data.length -1];
  
      console.log("Here are the amounts without interest");
      console.log(data.datasets[1].data);
      console.log("Here is the amount for the last year without interest.");
      console.log(last_year_sum_no_interest);
  
      //appendinti kapitala i DOM

     //zinute menesiniams inasams
     if (n == 12) {
      $("#savings-results").append("Šauniai padirbėta! Po " + t + " metų su  " + r_percentage + "%  metinėm palūkanom  ir " + PMT + " $ įmokomis, jūs sukaupėte " + "<strong style='color: green'>$" + last_year_sum_interest + "</strong>" + ". Be palūkanų jūs būtumėt sutaupęs tik " + "<strong style='color:red'>$" + last_year_sum_no_interest+ "</strong>" + ".");
     //zinute metinems inasams
     } else if (n = 1) {
       $("#savings-results").append("Šauniai padirbėta! Po " + t + " metų su " + r_percentage + "% metinėm palūkanom  ir " + PMT + " $ įmokomis, jūs sukaupėte " + "<strong style='color: green'>$" + last_year_sum_interest + "</strong>" + ". Be palūkanų jūs būtumėt sutaupęs tik  " + "<strong style='color:red'>$" + last_year_sum_no_interest+ "</strong>" + ".");

     };
  })
}