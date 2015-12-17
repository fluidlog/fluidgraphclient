//Carto focus + Context with autonome functions

function getMockData(dataIndex) {
  var d3data;
  //Appelle main.php de manière synchrone. C'est à dire, attend la réponse avant de continuer
  $.ajax({
    type: 'GET',
    url: '/data/d3data',
    dataType: 'json',
    success: function(t_data) {
      d3data = t_data[dataIndex];
      return false;
    },
    error: function(t_data) {
      console.log("Erreur Ajax : Message=" + t_data + " (Fonction getD3Data()) !");
    },
    async: false
  });
  return d3data;
}

function menuInitialisation(myGraph) {

  if (myGraph.config.debug) console.log("checkboxInitialisation start");

  $('#focusContextNodeOff').hide();

  if (myGraph.config.curvesLinks == 'On')
    $('#curvesLinksCheckbox').checkbox('check');
  else
    $('#curvesLinksCheckbox').checkbox('uncheck');

  if (myGraph.config.openNodeOnHover == 'On')
    $('#openNodeOnHoverCheckbox').checkbox('check');
  else
    $('#openNodeOnHoverCheckbox').checkbox('uncheck');

  if (myGraph.config.force == 'On')
    $('#activeForceCheckbox').checkbox('check');
  else
    $('#activeForceCheckbox').checkbox('uncheck');

  if (myGraph.config.elastic == 'On')
    $('#activeElasticCheckbox').checkbox('check');
  else
    $('#activeElasticCheckbox').checkbox('uncheck');

  if (myGraph.config.displayId == 'On')
    $('#displayIdCheckbox').checkbox('check');
  else
    $('#displayIdCheckbox').checkbox('uncheck');

  if (myGraph.typeLdpServer == 'external')
    $('#typeLdpServerCheckbox').checkbox('check');
  else
    $('#typeLdpServerCheckbox').checkbox('uncheck');

  if (myGraph.config.makeLinkSelectingNode == 'On')
    $('#LinkCreationModeCheckbox').checkbox('check');
  else
    $('#LinkCreationModeCheckbox').checkbox('uncheck');

  if (myGraph.config.debug) console.log("checkboxInitialisation end");
}

$(document).ready()
{
  //  console.log(JSON.stringify(d3data));
  var myGraph = new FluidGraph();

  myGraph.initSvgContainer("#chart");

  var store = new MyStore({ container : myGraph.externalStore.uri,
                            context : myGraph.externalStore.context,
                            template : "",
                            partials : ""})

  var openedGraph = myGraph.getOpenedGraph();
  if (openedGraph)
  {
    myGraph.loadGraph(thisGraph.typeLdpServer, openedGraph);
  }
  else {
    //Load default graph (Démo, explaination...)
    myGraph.d3Data = getMockData(3);
  }

  var checkboxIsInitialized = false;
  menuInitialisation(myGraph);

  if (myGraph.config.force == "On") {
    myGraph.activateForce();
  } else {
    $('#activeElasticCheckbox').addClass('disabled');
  }

  checkboxIsInitialized = true;

  if (myGraph.d3Data.nodes.length > 0)
    myGraph.drawGraph();
}
