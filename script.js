console.log('script1 toimii');
document.querySelector('#nappi1').addEventListener('click',e =>{
  e.preventDefault();
   console.log('klikkaus toimii');
   document.querySelector('#taulukko').innerHTML = 'taulukon sisältö toimii näin';
   document.querySelector('#lampotila').innerHTML = 'lämpötila-chart';
   document.querySelector('#ilmankosteus').innerHTML = 'ilmankosteus-chart';
});



// Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

  
  function drawChart() {

    getJSON('https://func-weather.azurewebsites.net/api/HttpTriggerCSharp2?code=03Hf14xSawGyeGtfxZTCLJ5mGLx0GGusap2f3zssPqg6n3KriqizHg==&deviceId=370030001847393035313137&amount=10', function(err, data)
    {
     let dataTaulukko = '<table border=1><tr><td>KLO</td><td>Lämpötila</td><td>Ilmankosteus</td></tr>';

    var dataTemp = new google.visualization.DataTable();
    dataTemp.addColumn('string', 'pvm');
    dataTemp.addColumn('number', 'asteet');
    

      const dataHistoria = data.map(function(mittaus){
        dataTaulukko = dataTaulukko + `<tr><td>${(mittaus.Timestamp).split('T')[1].split('.')[0]}</td><td>${mittaus.Temp}</td><td>${mittaus.Hum}</td></tr>`;

        dataTemp.addRows([
      [(mittaus.Timestamp).split('T')[1].split('.')[0], parseInt(mittaus.Temp)]
      ]);

  });

      dataTaulukko = dataTaulukko + '</table>';

      document.querySelector('#taulukko').innerHTML = dataTaulukko; 

      var options = {'title':'Lämpötila',
                    'width':1200,
                    'height':350};

    
    var chart = new google.visualization.LineChart (document.getElementById('lampotila'));
    chart.draw(dataTemp, options);
});

   

    
    

  
    var data_HUM = new google.visualization.DataTable();
    data_HUM.addColumn('string', 'pvm');
    data_HUM.addColumn('number', 'ilmankosteus');
    data_HUM.addRows([
      ['1.1.2020', 45],
      ['2.1.2020', 55],
      ['3.1.2020', 54],
      ['4.1.2020', 49],
      ['5.1.2020', 41],
      ['6.1.2020', 47],
      ['1.1.2020', 45],
      ['2.1.2020', 55],
      ['3.1.2020', 54],
      ['4.1.2020', 49],
      ['5.1.2020', 70],
      ['1.1.2020', 45],
      ['2.1.2020', 55],
      ['3.1.2020', 54],
      ['4.1.2020', 49],
      ['5.1.2020', 53]

    ]);

   
    var options_HUM = {'title':'ilmankosteus',
                    'width':1200,
                    'height':350};

  
    var chart_HUM = new google.visualization.ColumnChart (document.getElementById('ilmankosteus'));
    chart_HUM.draw(data_HUM, options_HUM);
  }