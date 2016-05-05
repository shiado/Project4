$(function () {
  'use strict'

  render()
  function render () {
    var country = $('#chartselector').find('option:selected').val();
    var category = $('#mapselector').find('option:selected').val();
    getMapData('/api/' + category);
    getIconData('/api/' + country + '/' + category)
  }

  $('#mapselector').on('change', function () {
    console.log('category selected');
    render()
  })

  $('#chartselector').on('change', function () {
    console.log('country selected');
    render()
  })

  function getIconData (url){
    $.ajax({
      url: url,
      type: 'GET',
      success: function(image){
        console.log('ajax successful: ', url, image);

        // var source   = $("#tabular-template").html();
        // var template = Handlebars.compile(source);
        // var html = template(image);
        // $('#table-location').html(html);
        $('#table-location').html("")
        $('#table-location').append("<div class='row'></div>")
        var ul = $("<ul>")
        image.forEach(function(e){
          console.log(e)

          var li = $("<li>")

          li.append('<img id="theImg" width="45px" height= "45px" src=' + e.icon +'>')
            li.append('<p id="icontitle">' + e.title + '</p>')
          ul.append(li)
        })

        ul.css("list-style-type", "none");
        $('.row').append(ul)


        // var template = Handlebars.compile($("#tabular-template").html());
        // $("#table-location").html(template(image));
      }
    })
  }

  function getMapData (url) {
    $.ajax({
      url: url,
      type: 'GET',
      success : function(data) {
        console.log('ajax successful: ', url, data);
        // var template = Handlebars.compile($("#tabular-template").html());
        // $("#table-location").html(template(data));

        var chartProperties = {
          "caption": "",
          "theme": "fint",
          "showLabels": "0",
          "formatNumberScale": "0"
        }

        var colorProperties = {
          "minvalue": "0",
          "startlabel": "Low",
          "endlabel": "High",
          "code": "#FF4411",
          "gradient": "1",

          "color": [
            {
              "maxvalue": "9",
              "code": "#FFDD44",
              // "displayValue": "Median"
            },
            {
              "maxvalue": "20",
              "code": "#6baa01"
            }
          ]
        }
        var appMap = new FusionCharts({
          type: 'maps/worldwithcountries',
          renderAt: 'chart-location',
          width: '100%',
          height: '100%',
          dataFormat: 'json',
          dataSource: {
            chart: chartProperties,
            colorrange: colorProperties,
            data : data
          }
        });
        appMap.render();
      }
    });
  }
});
