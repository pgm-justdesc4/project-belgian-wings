// Themes begin
am4core.useTheme(am4themes_animated);

// Themes end
const chart = am4core.create("chartdiv", am4maps.MapChart);
chart.logo.disabled = true;
chart.maxZoomLevel = 1;

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLongLat";
chart.deltaLatitude = -20;
chart.padding(20, 20, 20, 20);

// Create map polygon series for all countries
const allCountriesSeries = chart.series.push(new am4maps.MapPolygonSeries());

allCountriesSeries.useGeodata = true;

// Configure series
const allCountriesTemplate = allCountriesSeries.mapPolygons.template;
allCountriesTemplate.fill = am4core.color("#CCCCCC"); // Set a neutral color for all countries
allCountriesTemplate.stroke = am4core.color("#000033");
allCountriesTemplate.strokeWidth = 0.5;
allCountriesTemplate.interactive = false;

const clickableCountriesSeries = chart.series.push(
  new am4maps.MapPolygonSeries()
);

clickableCountriesSeries.useGeodata = true;

// Specify the countries to include
clickableCountriesSeries.include = ["US", "BR", "RU", "IN", "PL"];

// Map country ids to missions
// Map country ids to missions
const missions = {
  US: { name: "Minigame: Pilot", url: "/pilot" },
  BR: { name: "Minigame: Technicus", url: "/technicus" },
  RU: {
    name: "Minigame: Air Traffic Controller",
    url: "/airtrafficcontroller",
  },
  IN: { name: "Minigame: Survival Specialist", url: "/survivalspecialist" },
  PL: { name: "Minigame: Force Protection", url: "/forceprotection" },
};

// Configure series
const clickableCountriesTemplate =
  clickableCountriesSeries.mapPolygons.template;
clickableCountriesTemplate.tooltipText = "{id}";
clickableCountriesTemplate.adapter.add("tooltipText", function (text, target) {
  return missions[target.dataItem.dataContext.id].name; // Return the mission name for the country id
});
clickableCountriesTemplate.fill = am4core.color("#FF9E20"); // Set a different color for clickable countries
clickableCountriesTemplate.stroke = am4core.color("");
clickableCountriesTemplate.strokeWidth = 0.5;
clickableCountriesTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

/**
 * ========================================
 * MAKE THE CLICK MISSION HERE
 * ========================================
 */
// Add event listener for country click
clickableCountriesTemplate.events.on("hit", function (ev) {
  // Get country id
  const countryId = ev.target.dataItem.dataContext.id;

  // Get mission for country
  const mission = missions[countryId];

  // Navigate to URL
  window.location.href = `/minigames${mission.url}`;
});

const graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.line.stroke = am4core.color("#ffffff");
graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
graticuleSeries.fitExtent = false;

chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
chart.backgroundSeries.mapPolygons.template.polygon.fill =
  am4core.color("#ffffff");

const hs = clickableCountriesTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

let animation;
setTimeout(function () {
  animation = chart.animate(
    { property: "deltaLongitude", to: 100000 },
    20000000
  );
}, 3000);

chart.seriesContainer.events.on("down", function () {
  animation.stop();
});

function openOverlay() {
  document.getElementById("myOverlay").style.width = "100%";
}

function closeOverlay() {
  document.getElementById("myOverlay").style.width = "0%";
}
