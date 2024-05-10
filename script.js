$(document).ready(function() {
    $('#busqueda-form').submit(function(event) {
      event.preventDefault();
      var heroNumber = $('#numero-hero').val();
  
      var apiUrl = 'https://www.superheroapi.com/api.php/4905856019427443/' + heroNumber;
      $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(response) {
        
          $('#info-hero-section').show();
          $('#info-hero').html(`
            <div class="row"> "
              <div class="col-md-4">
                <img src="${response.image.url}" id="superheroe" alt="Imagen de ${response.name}">
              </div>
              <div class="col-md-4">
                <p><strong>Nombre:</strong> ${response.name}</p>
                <p><strong>Publicado por:</strong> ${response.biography.publisher}</p>
                <p><strong>Altura:</strong> ${response.appearance.height.join(', ')}</p>
                <p><strong>Peso:</strong> ${response.appearance.weight.join(', ')}</p>
                <p><strong>Alias:</strong> ${response.biography.aliases.join(', ')}</p>
              </div>
              <div class="col-md-4">
                <p><strong>Conexiones:</strong> ${response.connections['group-affiliation']}</p>
                <p><strong>Primera aparición:</strong> ${response.biography['first-appearance']}</p>
              </div>
            </div>
          `);
  
   
          var stats = response.powerstats;
          var dataPoints = [];
          for (var stat in stats) {
            dataPoints.push({ label: stat, y: parseInt(stats[stat]) || 0 });
          }
  
          
          var chart = new CanvasJS.Chart('chart-hero', {
            animationEnabled: true,
            title: {
              text: 'Estadísticas de Poder'
            },
            data: [{
              type: 'pie',
              startAngle: 240,
              yValueFormatString: '##0.00"%"',
              indexLabel: '{label} {y}',
              dataPoints: dataPoints
            }]
          });
          chart.render();
        },
      
      });
    });
  });
  